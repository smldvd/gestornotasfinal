require('dotenv').config();
const express=require('express');
const cors=require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.userPath='/api/users';
        this.notasPath='/api/notas';
        this.clientPath='/api/clients';
        // Conectar a base datos
        this.conectarDB()
        //Middlwares
        this.middlewares();
        this.routers();
    }

    middlewares(){
       //CORS
       this.app.use(cors());

       //Lectura y parseo del body
       this.app.use(express.json());

       this.app.use(express.static('web/clientweb'));  

    }

    async conectarDB(){
       await dbConnection();
    }
    
    routers(){
        this.app.use(this.userPath,require('../routers/user'))
        this.app.use(this.notasPath,require ('../routers/notas'))
        this.app.use(this.clientPath,require('../routers/client'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("El servidor está corriendo el el puerto: ",this.port);
        })
    }

}

module.exports=Server;



