const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 3001, DATABASE_URL } = process.env;
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const Event = require("./models/event");
const res = require("express/lib/response");
const { where } = require("./models/event");


// Database Connection
mongoose.connect(DATABASE_URL)
mongoose.connection
    .on("open", () => console.log("Connected"))
    .on("close", () => console.log("Disconnected"))
    .on("error", (error) => console.log(error))

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json());


// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Calendar App");
})

// Index
app.get("/event", async (req, res) => {
    try {
        res.json(await Event.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Create
app.post("/event", async (req, res) => {
    try {
        let response = await Event.create(req.body)
        res.json(response)
    } catch (error) {
        res.status(400).json(error)
    }
})


// Show
app.get("/event/:id", async (req, res) => {
    try {
        res.json(await Event.findById(req.params.id))
    } catch (error) {
        res.status(400).json(error);
    }
})

// Delete
app.delete("/event/:id", async (req, res) => {
    try {
        res.json(await Event.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error);
    }
})

// Update
app.put("/event/:id", async (req, res) => {
    try {
        res.json(
            await Event.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
        )
    } catch (error) {
        res.status(400).json(error);
    }
})


app.get("/getEventByDate/:selectedDate", async (req, res) => {
    try {
        res.json(await Event.find({})
            .where('dateString').equals(req.params.selectedDate))
    } catch (error) {
        res.status(400).json(error)
    }
})


// Listener
app.listen(PORT, () => {
    console.log(`You are listening to ${PORT}`)
})