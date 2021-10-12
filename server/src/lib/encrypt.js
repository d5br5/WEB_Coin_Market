import crypto from "crypto";

export const encryptPassword = (password) =>
	crypto.createHash("sha512").update(password).digest("base64");
