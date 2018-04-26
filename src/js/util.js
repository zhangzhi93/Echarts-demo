
export default {
  Base: {
    contextPath: "/api/",
    contextPath: "http://dashiji.gtzmmf.com/",
    //contextPath: "http://47.93.193.171:7170/",
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
  },
  Alert: function (mark, content) {
    if (mark == 4) {
      document.location = `xlzalert::${content}`;
    } else {
      DSJ.ShowMsgBox(content);
    };
  }
}

