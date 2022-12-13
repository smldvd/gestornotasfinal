const { response }=require('express');

const bcryptjs =require('bcryptjs');

const User=require('../models/users');

const { validationResult } = require('express-validator');

const usersGet=async(req, res=response)=>{
    
    const { limite=5, desde= 0} = req.query;
    const query={ estado: true};

    const [ total, usuarios ] = await Promise.all([
          User.countDocuments(query),
          User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usersPost=async(req,res=response)=>{
     
      const { nombre,correo,password,rol  }=req.body; 
      const usuario=new User({nombre,correo,password,rol})

      //Encriptar la contraseña
      const salt=bcryptjs.genSaltSync();
      usuario.password=bcryptjs.hashSync(password,salt);

      //Guardar en la base de datos
      await usuario.save(); 


    res.json({
        msg:'post API -Controller',
        usuario

    });
}

const usersPut=async(req,res=response)=>{
    
    const { id } =req.params;
    const { _id, google, correo, ...resto } = req.body

    if(resto.password){
        //Encriptar la contraseña
       const salt=bcryptjs.genSaltSync();
       resto.password=bcryptjs.hashSync(resto.password,salt);
    }

    const usuario= await User.findByIdAndUpdate(id,resto);

    res.json(usuario);
}

const usersPatch=(req, res=response)=>{
    res.json({
        msg:'patch API -Controller'
    });
}

const usersDelete=async(req, res=response)=>{

    const { id } = req.params;

    //const usuario = await User.findByIdAndDelete(id);

    const usuario= await User.findByIdAndUpdate(id,{estado:false});

    res.json(usuario);
}

module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}