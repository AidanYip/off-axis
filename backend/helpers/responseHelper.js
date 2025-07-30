const buildResponse = (success, statusCode, message, result = null) => {
  return {
    success,
    status_code: statusCode,
    message,
    result,
  };
};
  
module.exports = {
  buildResponse,
};
  