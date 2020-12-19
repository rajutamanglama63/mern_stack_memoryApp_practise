const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Postmessage = require("../models/postMessage.js");

router.get("/", async (req, res) => {
    try {
        const Postmessages = await Postmessage.find();
        res.status(200).json(Postmessages);

    } catch (error) {
        res.status(401).json({ message:error.message });

    }
});

router.post("/", async (req, res) => {
    const post = req.body;
    const newPost = new Postmessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message:error.message });

    }
})

router.patch("/:id", async (req, res) => {
    const { id: _id} = req.params;
    const post = res.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true});

    res.json(updatedPost);
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    await postMessage.findByIdAndDelete(id);

    console.log("DELETE!")

    res.json({message: "post deleted sucessfully"});
})

module.exports = router;

