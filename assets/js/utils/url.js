function joinUrl(baseUrl, url) {
    var theUrl = new URI(url);
    if (theUrl.is("relative")) {
        theUrl = theUrl.absoluteTo(baseUrl);
    }
    return theUrl.toString();
}

function getRouter(s) {
    let rX = /((\/pages\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/edit)|(\/pages)|(\/dashboard)|(\/checkout\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})|(\/account))$/i;
    let M = rX.exec(s);
    if (!M) return false;
    switch (M[1]) {
        case M[2]:
            return 'pageEdit';
        case M[3]:
            return 'pages';
        case M[4]:
            return 'dashboard';
        case M[5]:
            return 'checkout';
        case M[6]:
            return 'account';
        default:
            return 'unknown';
    }
}