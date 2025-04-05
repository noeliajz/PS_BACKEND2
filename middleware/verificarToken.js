const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({ mensaje: "No se proporcionó el token" });
  }

  const parts = header.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(403).json({ mensaje: "Formato de token inválido" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ aquí se guarda el usuario (_id y usuario)
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    return res.status(403).json({ mensaje: "Token inválido" });
  }
};

module.exports = verificarToken;
