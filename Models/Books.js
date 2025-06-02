const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
    },
    Author: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Book",bookSchema);