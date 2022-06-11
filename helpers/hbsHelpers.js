const moment = require("moment");
const vnTimeZone = require("moment-timezone");
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
function utcToLocal(time, format) {
  return moment(time).vnTimeZone("Asia/Ho_Chi_Minh").format(format);
}

module.exports = { getFlag, utcToLocal };
