const express = require('express')
const router = express.Router()

const Order = require('../models/orderModel.js')
const Reservation = require('../models/reservationModel')

const MongoClient = require("mongodb").MongoClient;


router.post('/create-booking', async (req, res) => {
    try {
        const uri = "mongodb://127.0.0.1://27017";
        const client = new MongoClient(uri);
        const orderCollection = client.db("SpiceZen").collection("orders");
        const reservationCollection = client.db("SpiceZen").collection("reservations");
        const summaryCollection = client.db("SpiceZen").collection("summaries");

        const {chosenDishes, info, userId} = req.body

        console.log(chosenDishes);
        console.log(info);

        const order = new Order({
            chosenDishes: chosenDishes.map(dish => ({
                name: dish.dishName,
                amount: dish.amount,
                price: dish.dishPrice * dish.amount,
                weight: dish.dishWeight * dish.amount,
                imageUrl: dish.dishImage,
                dish: dish._id
            }))
        });
        let result = await orderCollection.insertOne(order);
        const insertedOrderId = result.insertedId;
        console.log(result);

        const reservation = new Reservation({
            name: info.name,
            email: info.email,
            date: info.date,
            time: info.time
        })
        result = await reservationCollection.insertOne(reservation);
        const insertedReservationId = result.insertedId;
        console.log(result);


        result = await summaryCollection.insertOne({
            order: insertedOrderId,
            reservation: insertedReservationId,
            user: "userId",
            isConfirmed:false
        })

        res.send(result);
    } catch (err) {
        res.status(400).json({
            error: {
                message: err.message
            }
        })
        console.log(err.message);
    }
})

module.exports = router