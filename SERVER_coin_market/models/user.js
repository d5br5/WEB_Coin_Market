import mongoose from "mongoose";
const schema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	key: String,
	active: {type: Boolean, default: true},
});

const User = mongoose.model("User", schema);

export default User;
