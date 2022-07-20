const erroHandler = (err, _req, res, _next) => {
  const { code } = err;
  if (!code) return res.status(500).json({ message: 'Internal server error' });
  return res.status(code).json({ message: err.message });
};

module.exports = erroHandler;