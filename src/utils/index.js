/**
 * 一些工具方法
 */

let SIGN_REGEXP = /([yMdhsm])(\1*)/g;
let DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
  len = len - (s + '').length;
  for (let i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
}

const utils = {
  // 格式化日期
  formatDate: {
    format: function (date, pattern) {
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
    },
    parse: function (dateString, pattern) {
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
  },

  // 增加天数
  addDateByDay(date, days = 0) {
    let timestamp = date.getTime() + days * 1000 * 60 * 60 * 24
    return new Date(utils.formatDate.format(new Date(timestamp), 'yyyy-MM-dd 00:00:00'))
  },
  // 增加小时
  addDateByHour(date, hours = 0) {
    let timestamp = date.getTime() + hours * 1000 * 60 * 60
    return new Date(utils.formatDate.format(new Date(timestamp), 'yyyy-MM-dd hh:00:00'))
  },
  // 两个日期相差多少天
  getHowManyDays(date1 = new Date(), date2 = new Date()) {
    return Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
  },
  //倒计时:cb: 回调，接收剩余秒数,s: 总秒数
  countDown(cb, s) {
    let timer = setInterval(() => {
      s === 0 ? clearInterval(timer) : --s;
      cb(s);
    }, 1000);
  },
  //生成随机字符串
  createUniqueStr() {
    let s = [],
      hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i += 1) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
  },
  //深拷贝,objectCopy(tagData[]):目标数组
  objectCopy(obj1, obj2) {
    if (!obj2) {
      obj2 = obj1.constructor === Array ? [] : {};
    }
    for (let name in obj1) {
      if (typeof obj1[name] === "object") {
        obj2[name] = (obj1[name].constructor === Array) ? [] : {};
        utils.objectCopy(obj1[name], obj2[name]);
      } else {
        obj2[name] = obj1[name];
      }
    }
    return obj2;
  },
  // 设置存储
  setQuery(key, value) {
    if (process.server) return
    const data = JSON.stringify(value).replace(/\,/g, '@_@')
    window.localStorage.setItem(key, encodeURI(data))
  },
  // 获取存储
  getQuery(key) {
    const data = window.localStorage.getItem(key)
    return data ? JSON.parse(decodeURI(data).replace(/\@\_\@/g, ',')) : false
  },
  // 加
  add(a, b) {
    let c, d, e;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    }
    e = Math.pow(10, Math.max(c, d))
    return (utils.mul(a, e) + utils.mul(b, e)) / e
  },
  // 减
  sub(a, b) {
    let c, d, e;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    }
    e = Math.pow(10, Math.max(c, d))
    return (utils.mul(a, e) - utils.mul(b, e)) / e
  },
  // 乘
  mul(a, b) {
    let c = 0
    let d = a.toString()
    let e = b.toString()
    try {
      c += d.split('.')[1].length;
    } catch (f) {}
    try {
      c += e.split('.')[1].length;
    } catch (f) {}
    return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
  },
  // 除
  div(a, b) {
    // console.log(a)
    let c, d
    let e = 0
    let f = 0
    try {
      e = a.toString().split('.')[1].length;
    } catch (g) {}
    try {
      f = b.toString().split('.')[1].length;
    } catch (g) {}
    c = Number(a.toString().replace('.', ''))
    d = Number(b.toString().replace('.', ''))
    // console.log(a)
    // console.log(c,d,e,f)
    return utils.mul(c / d, Math.pow(10, f - e))
  },
  // 获取分页索引
  getHeadNumAdapter(page = 1, pageSize = 0, index = 0) {
    return utils.mul(pageSize, page - 1) + index + 1
  },
  // 下载文件
  downloadFile(url) {
    let form = document.createElement('form')
    form.style.display = 'none'
    form.setAttribute('target', '')
    form.setAttribute('method', 'post')
    form.setAttribute('action', url)
    let input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', 'exportData')
    input.setAttribute('value', (new Date()).getMilliseconds())
    document.body.appendChild(form)
    form.appendChild(input)
    form.submit()
  },
  // 保存参数到url
  saveToUrl(json) {
    let str = ''
    Object.entries(json).forEach(([key, value]) => {
      if (value) {
        str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&'
      }
    })
    // 出去最后一个 & 符号
    str = str.substr(0, str.length - 1)
    // 原url已经有参数了
    let hash = ''
    if (location.hash.indexOf('?') > -1) {
      let index = location.hash.indexOf('?')
      hash = location.hash.substr(0, index)
    } else {
      hash = location.hash
    }
    location.replace(hash + '?' + str)
  },
  //数量过滤
  numberFilter(str) {
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
          .substring(0, 3);
        if (str2.length === 3) {
          let strlast = parseInt(str2.substring(2, 3));
          if (strlast <= 4) {
            str2 = str2.substring(0, 2);
          } else if (strlast >= 5) {
            str2 = parseInt(str2.substring(0, 2)) + 1 + "";
          }
        } else {
          str2 = utils.countnum(str2);
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
  },
  countnum(str) {
    let l = str.length;
    switch (l) {
      case 0:
        str += "00";
        break;
      case 1:
        str += "0";
        break;
      default:
        break;
    }
    return str;
  },
}
export default utils