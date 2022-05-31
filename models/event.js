const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const event = new Schema({
    date: Date,
    dateString: String,
    title: String,
    description: String,
    startTime: String,
    endTime: String,
    type: String,
    priority: String,
})

const Event = model("Event", event);
module.exports = Event;
