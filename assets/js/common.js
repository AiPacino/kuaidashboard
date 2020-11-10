let origin = window.location.origin;
let port = window.location.port;
let apiPort = port;
let API_LOGIN = ""

const link = window.location.href.toLowerCase();
console.log(link)

let ApiHost;
if (port !== "") {
    ApiHost = origin.replace(port, apiPort)
} else {
    ApiHost = origin + ":" + apiPort
}

console.log(ApiHost)
API_LOGIN = ApiHost + "/api/v1/login"
API_SIGN_UP = ApiHost + "api/v1/users"

function SignOut() {
    localStorage.removeItem("token")
    window.location.href = '/';
}
