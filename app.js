import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const items = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'baz' }
];

// get an item by id
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(item => item.id === Number(id));

    if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
    };

    res.status(200).json(item);
});

// create a new item
app.post('/items', (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
    };

    const item = {
        id: items.length + 1,
        name
    };

    items.push(item);
    res.status(201).json(item);
})

// delete an item by id
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(item => item.id === Number(id));

    if (index === -1) {
        res.status(404).json({ error: 'Item not found' });
        return;
    };

    items.splice(index, 1);
    res.status(204).end();
})

const port = 3000;
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});