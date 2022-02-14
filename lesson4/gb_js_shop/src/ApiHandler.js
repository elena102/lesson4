export default class ApiHandler {
  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }

  getCatalog(onSuccess, onError) {
    this.send(onError, onSuccess, `${this.apiUrl}/catalog`)
  }

  getCart(onSuccess, onError) {
    this.send(onError, onSuccess, `${this.apiUrl}/cart`)
  }

  addToCart(onSuccess, onError, data) {
    this.send(onError, onSuccess, `${this.apiUrl}/cart`, 'POST', JSON.stringify(data), {"Content-Type": "application/json"})
  }

  removeFromCart(onSuccess, onError, data) {
    this.send(onError, onSuccess, `${this.apiUrl}/cart`, 'DELETE', JSON.stringify(data), {"Content-Type": "application/json"})
  }


  send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {
 
    let xhr;

    if (window.XMLHttpRequest) {
      // Chrome, Mozilla, Opera, Safari
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      // Internet Explorer
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.timeout = timeout; 

    xhr.ontimeout = onError;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if(xhr.status < 400) {
          onSuccess(xhr.responseText)
        } else if (xhr.status >= 400) {
          onError(xhr.status)
        }
      }
    }

    xhr.open(method, url, true);

    for(const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, value)
    }

    xhr.send(data);
  }

}