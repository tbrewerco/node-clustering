# Node.js Clustering Example with Express API

This repository demonstrates how to scale a Node.js Express API application using the built-in Cluster module. The Cluster module allows you to create multiple worker processes, each running on a different CPU core, to distribute incoming requests and maximize the server's throughput.

## Features

- Utilizes all available CPU cores
- Improves server performance and throughput
- Simple Express API server with endpoints for adding and deleting items
- Automatic worker process management (e.g., restarts, load balancing)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

1. Clone the repository.
2. Change to the project directory.
3. Install the required dependencies: `npm install`.
4. Start the application with clustering: `node app.js`.
   - This command will start the server and create worker processes equal to the number of CPU cores available.
5. Test the server by sending requests to GET, POST, or DELETE items.

## Customizing the Configuration

You can customize the application and clustering settings in the app.js file.

- To modify the application's endpoints or logic, update the Express routes.
- To change the number of worker processes, set the `numCPUs` variable to the desired value.