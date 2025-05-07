require ('dotenv').config();
//import Server from './models/server';
const Server = require('./models/server')
const server = new Server();



server.listen();


