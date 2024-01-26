"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const secret_1 = require("./secret/secret");
const app = (0, express_1.default)();
exports.server = http_1.default.createServer(app);
// socket connection
app.use((0, cors_1.default)({
    origin: [secret_1.frontendUrl],
    credentials: true
}));
const io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: secret_1.frontendUrl,
        methods: ["GET", "POST"],
    }
});
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, morgan_1.default)("dev"));
app.get("/test", (req, res) => {
    res.status(201).json({
        success: true,
        message: "Socket.io is ready"
    });
});
io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    socket.on("join_room", (data) => {
        socket.join(data);
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        console.log('User disconnected:', socket.id);
    });
});
