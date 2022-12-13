const { Schema, model }=require('mongoose');

const NotasSchema= Schema({
    materia:{
        type: String,
        required:[true,'Se necesita nombre de materia obligatorio']
    },
    acumulado:{
        type: String,
        required:[false]
    },


    
});

NotasSchema.methods.toJSON = function(){
    const {__v,acumuladoDeNota, ...notas} = this.toObject();
    return notas
}

module.exports=model('Notas',NotasSchema);