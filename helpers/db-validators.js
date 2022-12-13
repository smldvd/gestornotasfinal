const Role = require('../models/role');
const User = require('../models/users');
const Notas = require('../models/notas');
const Client = require('../models/client');

const esRoleValido=async(rol='')=>{
    const exiteRol=await Role.findOne({ rol })
        if(!exiteRol){
            throw new Error(`El error ${rol} no está registrado en la base`);
        }
};

const emailExiste= async( correo='' )=>{
    //Verificar si el correo existe
    const existeEmail= await User.findOne({correo});
        if(existeEmail){
            throw new Error(`El correo ${correo} ya existe`);            
        }
}

const existeUsuarioPorId = async( id )=>{
   
    const existeUsuario = await User.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }

}

const existeNotasPorId = async( id )=>{
   
    const existeNotas = await Notas.findById(id);
    if(!existeNotas){
        throw new Error(`El id no existe ${id}`);
    }

}

const existeClientePorId = async( id )=>{
   
    const existeCliente = await Client.findById(id);
    if(!existeCliente){
        throw new Error(`El id no existe ${id}`);
    }

}

module.exports={
    existeNotasPorId,
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeClientePorId
}