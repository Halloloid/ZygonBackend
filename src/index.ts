import express, { Request, Response } from "express"
import cors from "cors";
import { connectDB,disconnectDB } from "./config/db";
import apiRoute from "./api/api.route";


connectDB();
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Enable CORS using the `cors` package (allows all origins)
app.use(cors());

app.use("/api",apiRoute)

app.get("/hello",async(req:Request,res:Response)=>{
    res.status(200).json({message:"Server is Live"})
})

const server = app.listen(3000,()=>{
    console.log("Zygon Server is Running")
})

//Handle unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.error("Unhadled Rejction",err);
    server.close(async () =>{
        await disconnectDB();
        process.exit(1);
    });
});

// handle uncaught exception
process.on("uncaughtException",async(err)=>{
    console.error("unCaught Exception",err);
     await disconnectDB();
     process.exit(1);
})

//Graceful Shutdown
process.on("SIGTERM",async()=>{
    console.log("SIGTERM recevied ,shutting down gracefully");
    server.close(async () =>{
        await disconnectDB();
        process.exit(0);
    });
})