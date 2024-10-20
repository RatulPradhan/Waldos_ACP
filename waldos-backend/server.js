import express from 'express'
import cors from "cors";
import { getUserByEmail } from "./database.js"

const app = express();
app.use(cors());

app.get("/user/:email", async (req, res) => {
    const email = req.params.email
    const user = await getUserByEmail(email)
    res.send(user)
})

app.listen(8080, () => {console.log("Server started on port 8080")})