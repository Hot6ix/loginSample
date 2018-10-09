function getCookie() {
    var cookie = document.cookie.split(';');
    var result = {};

    for(var i=0; i<cookie.length; i++) {
        var key = cookie[i].split('=')[0].trim();
        var value = cookie[i].split('=')[1];
        
        result[key] = value;
    }

    return result;
}

function clearCookie() {
    var cookieArray = document.cookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}