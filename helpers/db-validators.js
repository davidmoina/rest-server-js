const { Category, Role, User, Product } = require('../models');

const isValidRole = async (role = '') => {
	const roleExists = await Role.findOne({ role });

	if (!roleExists) {
		throw new Error(`El rol ${role} no está registrado en la BD`);
	}
};

const emailExists = async (email = '') => {
	const isEmailInDB = await User.findOne({ email });

	if (isEmailInDB) {
		throw new Error(`El correo: ${email}, ya esta registrado en la BD`);
	}
};

const userIdExists = async (id = '') => {
	const userExists = await User.findById(id);

	if (!userExists) {
		throw new Error(`El id: ${id}, no existe en la BD`);
	}
};

const categoryExists = async (id = '') => {
	const category = await Category.findById(id);

	if (!category) {
		throw new Error(`El id: ${id}, no existe en la BD`);
	}
};

const productExists = async (id = '') => {
	const product = await Product.findById(id);

	if (!product) {
		throw new Error(`El id: ${id}, no existe en la BD`);
	}
};

module.exports = {
	isValidRole,
	emailExists,
	userIdExists,
	categoryExists,
	productExists,
};
