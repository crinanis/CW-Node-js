const express = require('express')
const router = express.Router()
const Summary = require('../models/summaryModel')
const Dish = require("../models/dishModel");
const nodemailer = require("nodemailer");


//get records
router.get("/summary", async (req, res) => {
    try {
        const result = await Summary.find()
            .populate('order')
            .populate('reservation')
            .populate('user');

        if (!result) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            });
        } else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            });
        }
    } catch (e) {
        console.log(e);
        res.json({
            status: "FAILED",
            message: "An error occurred"
        });
    }
});


// Получение информации о конкретном блюде
router.get('/summary/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Summary.findById(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record not found on this ID"
            })
        } else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            })
        }
    } catch (e) {
        res.send(e)
    }
});

router.post('/summary', async (req, res) => {
    try {
        const data = new Summary(req.body)
        const result = await data.save()
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record not found on this ID"
            })
        } else {
            res.json({
                status: "SUCCESS",
                data: result
            })
        }
    } catch (e) {
        res.send(e)
    }
});

// PUT
// Подтверждение заказа
router.put('/summary/:id', async (req, res) => {
    try {
        const _id = req.params.id;

        const result = await Summary.findByIdAndUpdate(_id, { isConfirmed: req.body.isConfirmed }, { new: true }).populate('reservation');
        if (result && result.reservation) {
            const { email, date, time } = result.reservation;

            console.log('Email:', email);
            console.log('Date:', date);
            console.log('Time:', time);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'kusssyd@gmail.com',
                    pass: 'xstazobvvvvpnznm',
                },
            });

            const mailOptions = {
                from: 'kusssyd@gmail.com',
                to: email,
                subject: 'Order Confirmation',
                text: `Your order has been confirmed.\n\n Thank you! We are waiting for you ${date} at ${time.substring(0, 10)}!\n`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'ERROR', message: 'Failed to send confirmation email' });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json({
                        status: 'SUCCESS',
                        message: 'Order confirmed and email sent',
                        data: result
                    });
                }
            });
        } else {
            res.json({
                status: "FAILED",
                message: "Records haven't been updated.",
                data: result
            })
        };
    } catch (e) {
        res.send(e)
    }
});

// PUT
// Удаление заказа
router.delete('/summary/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Summary.findByIdAndDelete(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record haven't been deleted."
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record was deleted."
            })
        }
    }
    catch (e) {
        res.send(e)
    }
});


module.exports = router