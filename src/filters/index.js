/*
 * @Author: xgw 
 * @Date: 2019-06-01 11:19:38 
 * @Last Modified by: xgw
 * @Last Modified time: 2019-06-01 14:40:12
 */

/**************
 * 过滤器现在只能用在两个地方：mustache 插值和 v-bind 表达式。
 * 在 v-model 、v-on 、v-for 等指令时 Vue 还是推荐我们将该逻辑通过 computed 来计算属性。
 * eg:{{message | add(filterA,filterB)}}   // 调用方式
 * message会作为第一个参数，filterA，filterB是第二个和第三个参数
 * ********************/
let SIGN_REGEXP = /([yMdhsm])(\1*)/g;
let DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
  len = len - (s + '').length;
  for (let i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}
//日期格式
export function formatTime(date, pattern) {
  pattern = pattern || DEFAULT_PATTERN;
  return pattern.replace(SIGN_REGEXP, function ($0) {
    switch ($0.charAt(0)) {
      case 'y':
        return padding(date.getFullYear(), $0.length);
      case 'M':
        return padding(date.getMonth() + 1, $0.length);
      case 'd':
        return padding(date.getDate(), $0.length);
      case 'w':
        return date.getDay() + 1;
      case 'h':
        return padding(date.getHours(), $0.length);
      case 'm':
        return padding(date.getMinutes(), $0.length);
      case 's':
        return padding(date.getSeconds(), $0.length);
    }
  });
}

export function parseTime(dateString, pattern) {
  let matchs1 = pattern.match(SIGN_REGEXP);
  let matchs2 = dateString.match(/(\d)+/g);
  if (matchs1.length === matchs2.length) {
    let _date = new Date(1970, 0, 1);
    for (let i = 0; i < matchs1.length; i++) {
      let _int = parseInt(matchs2[i]);
      let sign = matchs1[i];
      switch (sign.charAt(0)) {
        case 'y':
          _date.setFullYear(_int);
          break;
        case 'M':
          _date.setMonth(_int - 1);
          break;
        case 'd':
          _date.setDate(_int);
          break;
        case 'h':
          _date.setHours(_int);
          break;
        case 'm':
          _date.setMinutes(_int);
          break;
        case 's':
          _date.setSeconds(_int);
          break;
      }
    }
    return _date;
  }
  return null;
}
//数量过滤：1：四舍五入，精确多少位
export function numberFilter(str, num) {
  let str1,
    str2,
    result,
    negative = parseFloat(str) < 0;
  if (str === "" || parseFloat(str) === 0 || isNaN(parseFloat(str))) {
    result = "";
  } else {
    if (str.indexOf(".") === -1) {
      str = str.replace(/[^\d]/g, "").replace(/\b(0+)/gi, "") + ".00";
      result = str;
    } else {
      str1 = str
        .substring(0, str.indexOf("."))
        .replace(/[^\d]/g, "")
        .replace(/\b(0+)/gi, "");
      str2 = str
        .substring(str.indexOf(".") + 1, str.length)
        .replace(/[^\d]/g, "")
        .substring(0, (Number(num) + 1));
      if (str2.length === (Number(num) + 1)) {
        let strlast = parseInt(str2.substring(str2.length - 1, str2.length));
        if (strlast <= 4) {
          str2 = str2.substring(0, Number(num));
        } else if (strlast >= 5) {
          str2 = parseInt(str2.substring(0, Number(num))) + 1 + "";
        }
      }
      if (str1 === "") {
        if (str2 === "00") {
          result = "";
        } else {
          result = "0." + str2;
        }
      } else {
        result = str1 + "." + str2;
      }
    }
  }
  if (negative) {
    result = "-" + result;
  }
  return result;
}

//金额千分符：
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

//
