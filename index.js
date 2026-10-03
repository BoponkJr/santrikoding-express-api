// import express
import express from 'express';

// import CORS
import cors from 'cors';

// import bodyParser
import bodyParser from 'body-parser';

// import routes
import router from './routes/index.js';

// init app
const app = express();

// use cors
app.use(cors());

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static file uploads
app.use('/uploads', express.static('public/uploads'));

// define port
const port = 3000;

// default route
app.get('/', (req, res) => {
    res.send('Hello World! RESTful API Express SantriKoding');
});

// define routes
app.use('/api', router);

// start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
