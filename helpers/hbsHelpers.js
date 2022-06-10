const getFlag = (flag) => {
  if (flag === 0) {
    return "green";
  }
  if (flag === 1) {
    return "yellow";
  }
  if (flag === 2) {
    return "red";
  }
};

module.exports = { getFlag };
