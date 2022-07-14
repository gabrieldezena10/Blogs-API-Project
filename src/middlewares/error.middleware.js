const httpstatusCode = require('../helpers/httpstatusCode');

module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(httpstatusCode.BAD_REQUEST).json({ message: err.details[0].message });
  }

  res.status(err.status || httpstatusCode.INTERNAL_SERVER)
  .json({ message: err.message || 'Erro inesperado. Por favor, tente mais tarde' });
};
