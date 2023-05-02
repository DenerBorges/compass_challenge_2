import { Request, Response } from "express";
import cors from "cors";
import users from "./dataUsers.json";
import posts from "./dataPosts.json";

const express = require('express');
const app = express();

app.use(cors());

app.get("/api/v1/user", (req: Request, res: Response) => {
    res.send(users);
});

app.get("/api/v1/user/post", (req: Request, res: Response) => {
    res.send(posts);
});

app.listen(5000, () => {console.log("Server started on port 5000.")})
