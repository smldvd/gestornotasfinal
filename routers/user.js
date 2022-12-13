const { Router } = require('express');
const { usersGet,usersPost,usersPut,usersPatch,usersDelete } =require('../controllers/user')

const { validarCampos } = require('../Middlewares/validar-campos');

const { check } = require('express-validator');

const  Role  = require('../models/role')

const { esRoleValido, emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');

const router=Router();

router.get('/', usersGet);
router.post('/',
    [
     check('correo','El correo no es valido').isEmail(),   
     check('password','El password debe ser más de 6 letras').isLength({ min:6 }),
     check('nombre','El nombre es obligatorio').not().isEmpty(),     
     check('rol').custom(esRoleValido),
     check('correo').custom(emailExiste)
    ],
    validarCampos     
, usersPost)
router.put('/:id',
[
   check('id','No es un Id válido').isMongoId(),
   check('id').custom(existeUsuarioPorId),
   check('rol').custom(esRoleValido) 
],
validarCampos
, usersPut )
router.patch('/', usersPatch)
router.delete('/:id',
[  check('id','No es un Id válido').isMongoId(),
   check('id').custom(existeUsuarioPorId)   
],
validarCampos,usersDelete)


module.exports=router;