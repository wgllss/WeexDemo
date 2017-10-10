// export function formatDate(date, fmt) {
exports.formatDate = function (date, fmt) {
   if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (var k in o) {
    if (new RegExp("("+ k +")").test(fmt)) {
      var str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}


//不够位数就在之前补足0
function prefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

exports.formatTime = function (timeStamp) {
  // timeStamp = parseInt(timeStamp);
  //如果timeStamp不是字符串或数字或不存在
  // if (typeof(timeStamp) != 'number'||!timeStamp) {
  //   timeStamp = Date.parse(new Date());
  // }
  if(timeStamp < 140000000000) {
    timeStamp = timeStamp * 1000;
  }

  var dateTime = new Date(timeStamp);

  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  month = prefixInteger(month,2);
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new =new Date().getTime();  //typescript转换写法

  var milliseconds = 0;
  var timeSpanStr;
  var a_minute = 1000 * 60;
  var an_hour = a_minute * 60;
  var a_day = an_hour * 24;
  var a_month = a_day * 30;


  var milliseconds = now_new - timeStamp;
    
  if (milliseconds <= a_minute) {
      if(day ==now.getDay()){
          timeSpanStr = '刚刚';
      }else {
          if(year == now.getFullYear()){
              timeSpanStr = month + '-' + day;
          }else{
              timeSpanStr = year + '-' + month + '-' + day;
          }
      }
  }
  else if (a_minute < milliseconds && milliseconds <= an_hour) {
    if(day ==now.getDay()){
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }else {
        if(year == now.getFullYear()){
            timeSpanStr = month + '-' + day;
        }else{
            timeSpanStr = year + '-' + month + '-' + day;
        }
    }
  }
  else if (an_hour < milliseconds && milliseconds <= a_day) {
      if(day ==now.getDay()){
          timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
      }else {
          if(year == now.getFullYear()){
              timeSpanStr = month + '-' + day;
          }else{
              timeSpanStr = year + '-' + month + '-' + day;
          }
      }
  }
  // else if (a_day < milliseconds && milliseconds <= a_month) {
  //   timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  // }
  else if (milliseconds > a_day && year == now.getFullYear()) {
    timeSpanStr = month + '-' + day;
    // timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
  } else {
    timeSpanStr = year + '-' + month + '-' + day;
  }
  return timeSpanStr;

}