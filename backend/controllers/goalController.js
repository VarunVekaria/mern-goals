const asyncHandler = require("express-async-handler");

//@desc Get Goals
//@route GET /api/goals
//@access Private

const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "get goals" });
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
	res.status(200).json({ message: "set goals" });
});

//@desc UPDATE Goals
//@route PUT /api/goals/:id
//@access Private

const updateGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "update goals" });
});

//@desc delete Goals
//@route DELETE /api/goals
//@access Private

const deleteGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "delete goals" });
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoals,
};
