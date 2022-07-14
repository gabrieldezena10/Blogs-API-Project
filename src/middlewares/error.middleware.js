const httpstatusCode = require('../helpers/httpstatusCode');

module.exports = (err, req, res, _next) => 
  res.status(err.status || httpstatusCode.INTERNAL_SERVER)
  .json({ message: err.message || 'Erro inesperado. Por favor, tente mais tarde' });