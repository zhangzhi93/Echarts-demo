
export default {
  Base: {
    contextPath: "http://47.93.193.171:7170/",
    endPath: ".do",
  },
  getParaValueByName: function (paraName) {
    var reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    } else {
      return "";
    }
  }
}

