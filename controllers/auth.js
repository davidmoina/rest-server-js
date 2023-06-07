const { request, response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		//verificar si el email existe
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				msg: 'El usuario o contraseña no son correctos - email',
			});
		}
		// verificar si el usuario esta activo en la DB
		if (!user.status) {
			return res.status(400).json({
				msg: 'El usuario o contraseña no son correctos - status: false',
			});
		}
		// verificar la contraseña
		const validatePass = bcrypt.compareSync(password, user.password);
		if (!validatePass) {
			return res.status(400).json({
				msg: 'El usuario o contraseña no son correctos - password',
			});
		}

		// generar el JWT
		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		return res.status(500).json({
			msg: 'Algo salió mal',
		});
	}
};

module.exports = {
	login,
};
