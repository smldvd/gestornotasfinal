const { response }=require('express');

const Client=require('../models/client');

const { validationResult } = require('express-validator');

const clientsGet=async(req, res=response)=>{
    
    const { limite=20, desde= 0} = req.query;
    const query={ estado: true};

    const [ total, clients ] = await Promise.all([
          Client.countDocuments(query),
          Client.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        clients
    });
}

const clientsGetById=async(req, res=response)=>{
    
    const { id } =req.params;

    const client= await Client.findById(id);

    const {_id,nombre,apellido,correo,creatAt,estado } = client; 

    res.json({
        _id,nombre,apellido,correo,creatAt,estado
    });
}

const clientsPost=async(req,res=response)=>{
     
      const { nombre,apellido,correo  }=req.body; 
      const client=new Client({nombre,apellido,correo})     
      //Guardar en la base de datos
      await client.save(); 
    res.json({
        client

    });
}

const clientsPut=async(req,res=response)=>{
    
    const { id } =req.params;
    const { _id,  ...resto } = req.body
    
    const client= await Client.findByIdAndUpdate(id,resto);

   

    res.json(client);
}

const clientsPatch=(req, res=response)=>{
    res.json({
        msg:'patch API -Controller'
    });
}

const clientsDelete=async(req, res=response)=>{

    const { id } = req.params;

    //const usuario = await Client.findByIdAndDelete(id);

    const client= await Client.findByIdAndUpdate(id,{estado:false});

    res.json(client);
}

module.exports={
    clientsGet,
    clientsPost,
    clientsPut,
    clientsPatch,
    clientsDelete,
    clientsGetById
}