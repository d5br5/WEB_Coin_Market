import mongoose from "mongoose";
const schema = mongoose.Schema({
	code: String,
	active: {type: Boolean, default: true},
});

const Coin = mongoose.model("Coin", schema);
export default Coin;
