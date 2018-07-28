/**
 * Create Cookies.
 * @function
 * @param  {String} keyname
 * @param  {any} value
 * @param  {number} expiredays
 */
export function setCookie(keyname, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = keyname + "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
/**
 * Get Cookies.
 * @param  {String} keyname
 * @return {any}
 */
export function getCookie(keyname) {
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(keyname + "=")
    if (start !== -1) { 
      start = start + keyname.length+1 
      end = document.cookie.indexOf(";", start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    } 
  }
  return null
}
