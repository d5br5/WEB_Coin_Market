const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Key = mongoose.model("Key", {
   user: { ref: "User", type: Schema.Types.ObjectId },
   publicKey: String,
   secretKey: String,
});

module.exports = {
  Key
};