import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import chalk from "chalk";

const app = express();
app.use(cors());

const server = app.listen(3006, () => {
  console.log("Server is running on port 3006");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", ({ message }) => {
    console.log({ message });
    io.emit("message", { message: message });
  });
  socket.on("disconnect", () => {
    console.log(chalk.red("User disconnected:"), chalk.yellow(socket.id));
  });
});