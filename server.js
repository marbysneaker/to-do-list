const path = require('path');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();
app.use(express.json());




const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://marby123:marby123@cluster0-itdny.mongodb.net/";