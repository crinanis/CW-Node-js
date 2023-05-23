const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
require('socket.io');
require('dotenv').config()

const db = require('./db/index.js');
const dishRouter = require('./routes/dishRouter.js');
const bookingRouter = require('./routes/bookingRouter.js');
const summaryRouter = require('./routes/summaryRouter.js');

const app = express();
const corsOptions = {
    origin: "https://localhost:3000"
};

// Создаём HTTPS-сервер с помощью сертификатов SSL
const options = {
    key: fs.readFileSync('./cert/localhost-key.pem'),
    cert: fs.readFileSync('./cert/localhost.pem')
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let httpsServer = https.createServer(options, app);
const io = require("socket.io")(httpsServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

// Настройка маршрута для загрузки статических файлов
app.use('/static', express.static('D:\\1POIT\\3\\CW\\SpiceZen restaurant\\server\\static'));

db.on("error", console.error.bind(console, 'MongoDB connection error'));
db.once("open", () => {
    console.log('Connected to DB!');
})

//console.log( io.engine.port);
// Обработчик подключения нового клиента
io.on('connection', (socket) => {
    console.log(`Пользователь подключился`);
    // Обработчик получения нового комментария от клиента
    socket.on('newComment', (comment) => {
        // Сохранение комментария в базе данных или выполнение другой логики
        console.log('Новый комментарий:', comment);
        // Отправка нового комментария всем клиентам, подключенным к сокету
        io.emit('newComment', `${comment}`);
        let comm = {
            comment: comment,
        }
        db.collection('comments').insertOne(comm)

    });
});

app.get('/', (req, res) => {
    res.json({message: 'Welcome'});
});

// ROUTERS
app.use('/api/', bookingRouter);
app.use('/api/', dishRouter);
app.use('/api/', summaryRouter);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// })

httpsServer.listen(PORT, () => {
    const {address, port} = httpsServer.address();
    console.log(`Socket is listening on ${address}:${port}`);

})