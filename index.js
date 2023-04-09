const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/comments", async (req, res) => {
    const id = uuid();
    const content = req.body.content;

    if(!content) {
        res.sendStatus(400)
    }

    await fs.mkdir("data/comments", { recursive: true });
    await fs.writeFile(`data/comments/${id}.txt`, content);
    
    res.sendStatus(201).json({
        id: id
    });

})

app.get("/comments/:id", async (req, res) => {
    
    const id = req.params.id;
    let content;

    try {
        content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
    } catch (err) {
        return res.sendStatus(404);
    }
    res.json({
        content
    });
});

app.listen(3000, () => console.log("API Server is running...") );
