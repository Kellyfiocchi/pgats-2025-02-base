require("dotenv").config();

exports.requireApiKey = (req, res, next) => {
  const expected = process.env.API_KEY || "";
  const provided = req.headers["x-api-key"];
  if (!expected || provided !== expected) {
    return res.status(401).json({ error: "unauthorized" });
  }
  // Disponibiliza a apiKey no request para o model usar como “owner”
  req.apiKey = provided;
  next();
};
