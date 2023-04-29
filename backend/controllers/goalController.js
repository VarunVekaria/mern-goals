const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
//@desc Get Goals
//@route GET /api/goals
//@access Private
const User = require("../model/userModel");
const userModel = require("../model/userModel");
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
	res.status(200).json(goals);
});

//@desc set Goals
//@route POST /api/goals
//@access Private

const setGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		// console.log(res)
		res.status(400);
		throw new Error("Please add a text field");
	}
	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(goal);
});

//@desc UPDATE Goals
//@route PUT /api/goals/:id
//@access Private

const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("goal not found");
	}

	const user = await User.findById(req.user.id);
	//check for user
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}
	//logged in user matches goal user
	if (goal.user.toString() !== user.id) {
		throw new Error("User not authorized");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedGoal);
});

//@desc delete Goals
//@route DELETE /api/goals
//@access Private

const deleteGoals = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error("goal not found");
	}

	const user = await User.findById(req.user.id);
	//check for user
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}
	//logged in user matches goal user
	if (goal.user.toString() !== user.id) {
		throw new Error("User not authorized");
	}

	const deletedGoal = await Goal.findByIdAndDelete(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(deletedGoal);
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoals,
};
