const { Schema, model }=require('mongoose');

const ClientsSchema= Schema({
    nombre:{
        type: String,
        required:[true,'El nombre es obligatorio']
    },
    apellido:{
        type: String,
        required:[true,'El correo es obligatorio']        
    },
    correo:{
        type: String,
        required:[true,'El correo es obligatorio']
    },  
    creatAt:{
        type: String
    }, 
    estado:{
        type: Boolean,
        default: true
    },  
});


module.exports=model('Client',ClientsSchema);