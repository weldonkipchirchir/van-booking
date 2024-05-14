  export function getToken() {
    let token = localStorage.getItem("token");
    if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }
    return token;
}
  export function getVerify() {
    let verify = localStorage.getItem("verifie2Fa");
    return verify;
}
