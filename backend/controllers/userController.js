const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

//@desc Register new USer
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	//check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("USer already exists");
	}
	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400).json("Invalid user Data");
	}
	// res.json({ message: "Registered user" });
});

//@desc Login// Authenticate a user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id),
		});
	} else {
		res.status(400).json("Invalid Credentials");
	}
});

//@desc Get new USer
//@route GET /api/users
//@access Private

const getMe = asyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id);
	// res.send(const { _id, name, email })
	res.status(200).json({
		_id,
		name,
		email,
	});
});

//Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
