
export default {
  Base: {
    contextPath: "/api/",
    endPath: ".do",
  },
  getParaValueByName: function (paraName) {
    const reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    } else {
      return "";
    }
  }
}

