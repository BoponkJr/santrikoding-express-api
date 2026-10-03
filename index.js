// import express
import express from 'express';

// import CORS
import cors from 'cors';

// import bodyParser
import bodyParser from 'body-parser';

// init app
const app = express();

// use cors
app.use(cors());

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// define port
const port = 3000;

// default route
app.get('/', (req, res) => {
  res.send('Hello World! RESTful API Express SantriKoding');
});

// start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
