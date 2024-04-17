const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Dummy data for initial testing
// Can fetch data from mysql or mongoDB
let data = [
    { id: 1, name: 'Bhanu', email: 
'bhanu@gmail.com'
 },
    { id: 2, name: 'Aman Arya', email: 
'aman@gmail.com'
 },
    { id: 3, name: 'Aman Singh', email: 
'amans@gmail.com'
 }
];

// Route to get all items
app.get('/api/items', (req, res) => {
    res.json(data);
});

// Route to get a single item by ID
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ message: 
'Item not found'
 });
    }
    res.json(item);
});

// Route to create a new item
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    res.status(201).json(newItem);
});

// Route to update an existing item
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    data[index] = { ...data[index], ...updatedItem };
    res.json(data[index]);
});

// Route to delete an item
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    const deletedItem = data.splice(index, 1);
    res.json(deletedItem[0]);
});

// Start the server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
