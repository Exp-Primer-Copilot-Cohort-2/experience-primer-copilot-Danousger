// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const util = require('util');

// Read the comments.json file
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
let comments = [];

// Read comments from comments.json
const readComments = async () => {
    try {
        const data = await readFile(path.join(__dirname, 'comments.json'), 'utf8');
        comments = JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

readComments();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Add a comment
app.post('/comments', (req, res) => {
    const newComment = {
        id: comments.length + 1,