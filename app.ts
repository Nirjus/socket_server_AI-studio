import express from "express";
import { Request,Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";
import { frontendUrl } from "./secret/secret";
const app = express();
export const server = http.createServer(app);
// socket connection

app.use(cors({
    origin: [frontendUrl],
    credentials:true
}))

const io = new Server(server,{
    cors:{
        origin: frontendUrl,
        methods: ["GET", "POST"],
    }    
})

app.use(express.json({limit: "50mb"}));
app.use(morgan("dev"));

app.get("/",(req:Request, res: Response)=> {
    res.status(201).json({
        success: true,
        message: "Socket.io is ready"
    })
})

io.on("connection", (socket) => {

    console.log("user connected", socket.id);

   socket.on("join_room", (data) => {
    socket.join(data);
   })

    socket.on("send_message",(data) => {
     socket.to(data.room).emit("receive_message", data);

    })
    socket.on("disconnect", () => {
        console.log('User disconnected:', socket.id);
      });
 })

