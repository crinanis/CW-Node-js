const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/SpiceZen', {useNewUrlParser: true})
    .catch((e)=>{
        console.log(e);
    })

const db = mongoose.connection

module.exports = db