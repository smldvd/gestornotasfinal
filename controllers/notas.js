const { response }=require('express');

const bcryptjs =require('bcryptjs');

const Notas=require('../models/notas');

const { validationResult } = require('express-validator');

const notasGet=async(req, res=response)=>{
    
    const { limite=20, desde= 0} = req.query;
    const query={ estado: true};

    const [ total, notas ] = await Promise.all([
          Notas.countDocuments(query),
          Notas.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        notas
    });
}

const notasPost=async(req,res=response)=>{
     
      const { materia,acumulado}=req.body; 
      const notas=new Notas({materia,acumulado})

    await notas.save(); 
    res.json({
        msg:'post API -Controller',
        notas

    });
}

const notasPut=async(req,res=response)=>{
    
    const { id } =req.params;
    const { _id, materia, acumuladoDeNota } = req.body

    const notas= await Notas.findByIdAndUpdate(id,materia);

    res.json(notas);
}

const notasPatch=(req, res=response)=>{
    res.json({
        msg:'patch API -Controller'
    });
}

const notasDelete=async(req, res=response)=>{

    const { id } = req.params;

    const notas= await Notas.findByIdAndUpdate(id,{estado:false});

    res.json(notas);
}

module.exports={
    notasGet,
    notasPost,
    notasPut,
    notasPatch,
    notasDelete
}