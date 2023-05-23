const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    dishName: {type: String, required: true},
    dishCategory: {type: String, required: true}, // Ссылка на категорию
    dishType: {type: String, required: true}, // Ссылка на тип
    dishPrice: {type: Number, required: true},
    dishWeight: {type: Number, required: true},
    dishDescription: {type: String, required: true},
    dishImage: {type: String, required: true}
}, {
    versionKey: false
});

const dishModel = mongoose.model('Dish', dishSchema);
module.exports = dishModel;
