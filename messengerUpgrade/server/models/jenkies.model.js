const mongoose = require("mongoose");

//title, price, and description
const MessengerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        min: [2, "Title must be at least 4 characters long!"]
    },
    price: {
        type: Number,
        required: [true, "Price is needed"],
        minlength: [2, "Price must be at least 3 characters long!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        minlength: [2, "Description must be atleast 10 characters long!"]
    }

}, {timestamps: true})


const Messenger = mongoose.model('Messenger', MessengerSchema);

module.exports = Messenger;