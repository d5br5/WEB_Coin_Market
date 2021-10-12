import mongoose from "mongoose";
const schema = mongoose.Schema({
	user: {ref: "User", type: mongoose.Schema.Types.ObjectId},
	publicKey: String,
	secretKey: String,
});

const Key = mongoose.model("Key", schema);

export default Key;
