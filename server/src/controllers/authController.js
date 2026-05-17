const {
  findUserByEmail,
  findUserByEmailAndPassword,
  createUser,
} = require("../models/userModel");
const { normalizeRow } = require("../utils/normalize");

function determineRole(name = "", email = "") {
  if (
    name.toLowerCase() === "manish" ||
    email.toLowerCase() === "manish@gmail.com"
  ) {
    return "admin";
  }
  return "user";
}

async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const existing = await findUserByEmail(email);
    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const role = determineRole(name, email);
    const result = await createUser(name, email, password, role);
    return res.json({ success: true, user: normalizeRow(result.rows[0]) });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error during signup" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await findUserByEmailAndPassword(email, password);
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const user = normalizeRow(result.rows[0]);
    return res.json({
      success: true,
      message: "Login successful",
      role: user.role || "user",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
}

module.exports = {
  signup,
  login,
};


