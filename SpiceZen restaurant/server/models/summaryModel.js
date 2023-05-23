const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summarySchema = new Schema({
    order: {type: Schema.Types.ObjectId, ref: "Order", default: null}, // Ссылка на категорию
    reservation: {type: Schema.Types.ObjectId, ref: "Reservation", required: true},
    user: {type: String, required: true},
    isConfirmed:{type: Boolean, default: false},
}, {
    versionKey: false
})

const summaryModel = mongoose.model('Summary', summarySchema);
module.exports = summaryModel;
