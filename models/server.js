// //import express from 'express'
const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user.routes');
class Server {
    
    constructor(){
        
        this.app = express();
        this.userRoutes = userRoutes;

        this.usersApiPath ='/api/user';
        
        this.port = process.env.PORT;

        this.middlewares();
        
        this.routes();
    }
    middlewares(){

        this.app.use((cors()));
        //lectura y parseo del request del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }
    routes(){
        // igual funciona asi
        //this.app.use('/api/user',require('../routes/user.routes'));
        this.app.use(this.usersApiPath,require('../routes/user.routes'));
         
    }
    listen(){
        // this.app.listen(this.port,()=>{
        //     console.log('Server running on port',this.port);
        // });
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;

