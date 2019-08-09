//1.定义所有环境服务器地址
const server={
  pro:"localhost",//生产环境
  dev:"http://www.imes-inc.ser",//开发环境
  util:"http://www.imes-inc.ser"//其他环境，可以为空，为空则适配到测试环境
}
//2.获取当前访问域名，并根据域名判断当前环境，然后获取指定环境的服务器地址
var DOMIN="";//服务端接口访问跟路径
const origin=location.hostname//当前访问域名
if(!DOMIN) DOMIN=(origin==server.pro?server.dev:location.protocol+'//'+origin)
var IPConfig = window.IPConfig = {
  "IP": DOMIN,
  "Host": "8000",
  "staticHost": "7000"
}