/**过滤类，运用于全局template模板，挂载到了vue原型**/
const filterFn = {
  thousandSeparator(number) {
    if (isNaN(number) || number == "") return "";
    number = Math.round(number * 100) / 100;
    if (number < 0)
      return '-' + filterFn.outputdollars(Math.floor(Math.abs(number) - 0) + '') + filterFn.outputcents(Math.abs(number) - 0);
    else
      return filterFn.outputdollars(Math.floor(number - 0) + '') + filterFn.outputcents(number - 0);
  },
  outputdollars(number) {
    if (number.length <= 3)
      return (number == '' ? '0' : number);
    else {
      let mod = number.length % 3;
      let output = (mod == 0 ? '' : (number.substring(0, mod)));
      for (let i = 0; i < Math.floor(number.length / 3); i++) {
        if ((mod == 0) && (i == 0))
          output += number.substring(mod + 3 * i, mod + 3 * i + 3);
        else
          output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
      }
      return (output);
    }
  },
  outputcents(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
  }
}
export default filterFn

