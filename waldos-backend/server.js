import express from 'express'
import cors from "cors";
import { getUserByEmail } from "./database.js"
import { getAllPosts, createPost, createComment, getPostWithComments } from './database.js'


const app = express();
app.use(cors());
app.use(express.json());

app.get("/user/:email", async (req, res) => {
    const email = req.params.email
    const user = await getUserByEmail(email)
    res.send(user)
})

// post's http
app.get("/posts", async (req,res) => {
    const posts = await getAllPosts()
    res.send(posts)
})

app.post("/posts", async (req,res) => {
    const { user_id, channel_id, title, content } = req.body
    const post = await createPost(user_id, channel_id, title, content)
    res.status(201).send(post)
})

// comment's http
app.post("/posts/:post_id/comments", async (req,res) => {
    const { post_id } = req.params;
    const { user_id, content, parent_id } = req.body
    const comment = await createComment(post_id, user_id, content, parent_id)
    res.status(201).send(comment)
})

app.get("/posts/:post_id/comments", async (req,res) => {
    const { post_id } = req.params;
    const result  = await getPostWithComments(post_id);
    res.status(201).send(result)
})


app.listen(8080, () => {console.log("Server started on port 8080")})