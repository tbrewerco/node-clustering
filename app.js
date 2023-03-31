import express from 'express';
import bodyParser from 'body-parser';
import os from 'os';
import cluster from 'cluster';

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

// check if current prcosess is the primaryc process
if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Master process (${process.pid}) is running`);

    // fork worker processes for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    };

    // handle worker process exit events
    cluster.on('exit', (worker) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    // start the express server on worker processes
    app.listen(port, () => {
        console.log(`API server listening on port ${port} (Worker process ${process.pid})`);
    });
};

