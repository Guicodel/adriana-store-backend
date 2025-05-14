const mongoose = require ('mongoose');

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION,{
            dbName:'adrianaStore'
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a al base de datos')
        
    }
}

module.exports = {dbConnection};