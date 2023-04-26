function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === cookieName) return value;
    }
    return null;
}

async function jwtFetch(url, options = {}) {

    // Default options.method to 'GET' if no method is provided.
    options.method = options.method || 'GET';

    // Default options.header to {} if no header is provided.
    options.headers = options.headers || {};

    // Set the "Authorization" header to the value of the "jwtToken" in localStorage.
    options.headers["Authorization"] = localStorage.getItem('jwtToken');

    // If the options.method is NOT 'GET', then set the 'Content-Type' header to 'application/json'
    // and the 'CSRF-Token' header to the value stored in the 'CSRF-Token' cookie.
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['CSRF-Token'] = getCookie('CSRF-Token');
    }

    // Call fetch with the url and the updated options hash.
    const res = await fetch(url, options);

    // If the res status >= 400, throw an error with the error being the res.
    if (res.status >= 400) throw res;

    // If the res status < 400, return the res to the next promise chain.
    return res

}

export default jwtFetch;