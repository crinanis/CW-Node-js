const express = require('express')
const router = express.Router()
const Dish = require('../models/dishModel.js')

//get records
router.get("/dishes", async (req, res) => {
    try {
        const result = await Dish.find()
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        } else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            })
        }
    } catch (e) {
        console.log(e)
    }
})


// Получение информации о конкретном блюде
router.get('/dishes/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Dish.findById(_id);
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


router.get('/dishes-by-category', async (req, res) => {
    try {
        const dishes = await Dish.aggregate([
            {$match: {}},
            {
                $group: {
                    _id: '$dishCategory',
                    dishes: {$push: '$$ROOT'}
                }
            },
            {$project: {name: '$_id', dishes: 1, _id: 0}}
        ])
        res.status(200).send({data: dishes})
    } catch (err) {
        res.status(400).send({error: err})
    }
});

//POST
// Создание нового блюда
router.post("/dishes", async (req, res) => {
    try {
        console.log(req.body)
        const data = new Dish(req.body)
        const result = await data.save()
        console.log(result)
        res.json({
            data: result,
            status: "SUCCESS",
            message: "Dish added successfully.",
        })
    } catch (error) {
        if (error.code === 11000) {
            // Обработка ошибки с дубликатом индекса
            res.json({
                status: "FAILED",
                message: "Dish already exists with this name."
            })
        } else {
            // Обработка других ошибок
            res.json({
                status: "FAILED",
                message: "Failed to add dish."
            })
        }
    }
})


// PUT
// Обновление информации о блюде
router.put('/dishes/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Dish.findByIdAndUpdate(_id, req.body, {new: true});
        console.log(result)
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Records haven't been updated.",
                data: result
            })
        } else {
            res.json({
                status: "SUCCESS",
                message: "Record was updated.",
                data: result
            })
        }
    } catch (e) {
        res.send(e)
    }
});

// DELETE
// Удаление блюда
router.delete('/dishes/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Dish.findByIdAndDelete(_id);
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