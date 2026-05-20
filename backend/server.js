const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { grid } = require("./grid");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'https://grid-game-frontend-zoau.onrender.com'
    },
});

io.on("connection", (socket) => {
    console.log("user connected: ", socket.id);

    // send current grid's state to user
    socket.emit("initial_grid", grid);

    // tile click
    socket.on("claim_tile", (tileId) => {
        const tile = grid.find((t) => t.id  == tileId);

        // do nothing if tile not exists
        if(!tile) return

        // do nothing if tile is already owned
        if(tile.owner) return

        const getRandomHexColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor.padStart(6, '0')}`;
        };

        // tile.owner = "#ef4444"
        tile.owner = socket.id;
        tile.color = getRandomHexColor();

        // update all the users
        io.emit("tile_claimed", {
            tileId,
            owner: tile.owner,
            color: tile.color
        })
    });

    socket.on("unclaim_tile", (tileId) => {
        const tile = grid.find((t) => t.id == tileId);

        if(!tile) return;

        if (tile.owner !== socket.id) return;

        console.log(tile)
        console.log(socket.id)

        tile.owner = null;
        tile.color = null;

        io.emit("tile_unclaimed", {
            tileId,
            owner: null,
            color: null
        })
    });

    socket.on("disconnect", () => {
        console.log("user disconnected : ", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});