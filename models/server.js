// //import express from 'express'
const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user.routes');
const {dbConnection} = require('../data-base/config');
const fileUpload = require('express-fileupload');
class Server {
    
    constructor(){
        
        this.app = express();
        this.userRoutes = userRoutes;
        this.paths = {
            auth:       '/api/auth',
            searching:  '/api/searching',
            categories: '/api/categories',
            users:      '/api/users',
            products:   '/api/products',
            uploads:    '/api/uploads'

        }
        
        
        this.port = process.env.PORT;

        //conexion a la base de datos
        this.databaseConnection();

        this.middlewares();
        
        this.routes();
    }
    async databaseConnection(){
        await dbConnection();
    }
    middlewares(){

        this.app.use((cors()));
        //lectura y parseo del request del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));

        //carga de archivos
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }
    routes(){
        // igual funciona asi
        //this.app.use('/api/user',require('../routes/user.routes'));
        this.app.use(this.paths.auth,require('../routes/auth.routes'));
        this.app.use(this.paths.searching,require('../routes/searching.routes'));
        this.app.use(this.paths.users,require('../routes/user.routes'));
        this.app.use(this.paths.categories,require('../routes/categories.routes'));
        this.app.use(this.paths.products,require('../routes/products.routes'));
        this.app.use(this.paths.uploads,require('../routes/uploads.routes'));

         
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

