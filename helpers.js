function sanitise(...inputArr) {
  return inputArr.map((inputStr) => {
    return inputStr.replace(/[<'"]/g, "&lt;");
  });
}

module.exports = { sanitise };
