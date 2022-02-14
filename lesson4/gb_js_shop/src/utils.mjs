export function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {
 
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

export const pow = (a, n) => {
  if(n == 0) return 1;

  let result = a;

  for(let i = 1; i < n; i++) {
    result *= a
  }

  return result;
}

