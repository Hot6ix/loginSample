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