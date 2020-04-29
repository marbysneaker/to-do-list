// const express = require('express');
const path = require('path');

// const app = express();
// const mongo = 'mongodb+srv://admin:<password>@cluster0-xrdqx.mongodb.net/test?retryWrites=true&w=majority'
// mongo db
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

const MONGODB_URL = "mongodb+srv://admin:marby123@cluster0-xrdqx.mongodb.net/todo_list";;
const MONGODB_DATABASE = 'todo_list';


app.get('/api/mongodb/:collectionName/', (request, response) => {
  const collectionName = request.params.collectionName;
  console.log("method app.GET is invoked, collectionName:", collectionName);


  const query = request.query || {};
  db.collection(collectionName)
    .find(query)
    .toArray((err, results) => {
      if (err) throw err;
      response.json(results);
    });
});

app.post('/api/mongodb/:collectionName/', (request, response) => {
  const collectionName = request.params.collectionName;
  const data = request.body;
  console.log("method app.POST is invoked, data:", data);


  db.collection(collectionName)
    .insertOne(data, (err, results) => {
      if (err) throw err;

      response.json({
        'success': true,
        'results': results,
      });
    });
});

app.delete('/api/mongodb/:collectionName/', (request, response) => {
  
  const collectionName = request.params.collectionName;
  const query = request.query;
  console.log("method app.DELETE is invoked, query:", query)

  // Due to a requirement of MongoDB, whenever we query based on _id field, we
  // have to do it like this using ObjectId
  if (query._id) {
    query._id = ObjectId(query._id);
  }

  db.collection(collectionName)
    .deleteOne(query, (err, results) => {
      if (err) throw err;

      // If we deleted exactly 1, then success, otherwise failure
      if (results.result.n === 1) {
        response.json({
          success: true,
        });
      } else {
        response.json({
          success: false,
        });
      }
    })
});



function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}
app.use(logger);

let db;

MongoClient.connect(MONGODB_URL, (err, client) => {
  if (err) throw err;
  console.log("--MongoDB connection successful");
  db = client.db(MONGODB_DATABASE);

  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    console.log(`Mongo Url ${MONGODB_URL}`)
  })
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// const port = process.env.PORT || 5000;
// app.listen(port);

// console.log('App is listening on port ' + port);


