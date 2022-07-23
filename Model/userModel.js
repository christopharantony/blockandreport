const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    userId: String,
    blockedBy: {
        type: Array
    },
    reports: {
        type: Array
    }
});

module.exports = mongoose.model("User", userSchema);