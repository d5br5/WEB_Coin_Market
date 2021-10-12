import mongoose from "mongoose";
const schema = mongoose.Schema({
	user: {ref: "User", type: mongoose.Schema.Types.ObjectId},
	coin: {ref: "Coin", type: mongoose.Schema.Types.ObjectId},
	quantity: Number,
});

const Asset = mongoose.model("Asset", schema);
export default Asset;
