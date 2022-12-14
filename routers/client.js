const { Router } = require('express');
const { clientsGet,clientsPost,clientsPut,clientsPatch,clientsDelete,clientsGetById } =require('../controllers/client')

const { validarCampos } = require('../Middlewares/validar-campos');

const { check } = require('express-validator');

const { esRoleValido, existeClientePorId } = require('../helpers/db-validators');

const router=Router();

router.get('/',[], clientsGet);
router.get('/:id',clientsGetById)
router.post('/',
    [
     check('correo','El correo no es valido').isEmail(),   
     check('nombre','El nombre es obligatorio').not().isEmpty()
    ],
    validarCampos     
, clientsPost)
router.put('/:id',
[   check('id','No es un Id válido').isMongoId(),
    check('id').custom(existeClientePorId)
],
validarCampos
, clientsPut )
router.patch('/', clientsPatch)
router.delete('/:id',
[  check('id','No es un Id válido').isMongoId(),
   check('id').custom(existeClientePorId)   
],
validarCampos,clientsDelete)

module.exports=router;