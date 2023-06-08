const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { login, googleSingIn } = require('../controllers/auth');

const router = Router();

router.post(
	'/login',
	[
		check('email', 'El correo es requerido').isEmail(),
		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		validateFields,
	],
	login
);

router.post(
	'/google',
	[
		check('id_token', 'El id_token es requerido').not().isEmpty(),
		validateFields,
	],
	googleSingIn
);

module.exports = router;
