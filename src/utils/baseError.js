class NewError extends Error {
  constructor(code, message) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

module.exports = NewError;
// retirado de https://sematext.com/blog/node-js-error-handling/