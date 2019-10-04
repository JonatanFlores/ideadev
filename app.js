const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

// Services
const IdeaService = require('./app/services/IdeaService');

// Configurations
const PORT = process.env.PORT || 3030;

// Setup express to use feathers
const app = express(feathers());

// Parse JSON
app.use(express.json());
// Configure Socket.io realtime APIs
app.configure(socketio());
// Enable REST services
app.configure(express.rest());
// Register services
app.use('/ideas', new IdeaService);
// Setup static files
app.use(express.static('public'))

// New connections connect to stream channel
app.on('connection', conn => app.channel('stream').join(conn));
// Publish events to stream
app.publish(data => app.channel('stream'));

// Listen express (REST) and (Socket)
app.listen(PORT).on('listening', () => console.log(`Realtime server running on port ${PORT}`));