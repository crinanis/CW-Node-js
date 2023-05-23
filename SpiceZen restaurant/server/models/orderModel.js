const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        chosenDishes: [
            {
                name: {type: String, required: true},
                amount: {type: Number, required: true},
                price: {type: Number, required: true},
                weight: {type: Number, required: true},
                imageUrl: {type: String, required: true},
                dish: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Dish",
                },
            },
        ],
    }, {
        versionKey: false
    })

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;

