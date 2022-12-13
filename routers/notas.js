const { Router } = require('express');
const { notasGet,notasPost,notasPut,notasPatch,notasDelete } =require('../controllers/notas')

const { validarCampos } = require('../Middlewares/validar-campos');

const { check } = require('express-validator');

const  Role  = require('../models/role')

const { esRoleValido, emailExiste,existeNotasPorId } = require('../helpers/db-validators');

const router=Router();

router.get('/', notasGet);
router.post('/',
    [
     check('materia','Se necesita nombre de materia obligatorio').not().isEmpty(),
     check('acumulado','Se necesita aaa de materia obligatorio').not().isEmpty(),
    ],
    validarCampos     
, notasPost)

router.put('/:id',
[
   check('id','No es un Id válido').isMongoId(),
   check('id').custom(existeNotasPorId),
],
validarCampos
, notasPut )
router.patch('/', notasPatch)
router.delete('/:id',
[  check('id','No es un Id válido').isMongoId(),
   check('id').custom(existeNotasPorId)   
],
validarCampos,notasDelete)


module.exports=router;