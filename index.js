//Ejercicio #0
let promise = new Promise(
    function (resolve, reject) {
        resolve(1);
        setTimeout(() => resolve(2), 1000);
    });
console.log("==========Resultado Ejercicio #0==========")
promise.then(alert);
//Ejercicio #1
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
console.log("==========Resultado Ejercicio #1==========")
delay(3000).then(() => alert('runs after 3 seconds'));
//Ejercicio #2
function f1(){
    alert('Hello')
}
function f2(){
    alert('Hi')
}
console.log("==========Resultado Ejercicio #2==========")
promise.then(f1).catch(f2);
promise.then(f1, f2);
console.log("No son igual porque catch es un controlador de errores")
//Ejercicio #3
async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        let json = await response.json();
        return json;
    }
    throw new Error(response.status);
}
console.log("==========Resultado Ejercicio #3==========")
loadJson('no-such-user.json').catch(alert);
//Ejercicio #4
class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}
async function loadJsonAsync(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
}
async function demoGithubUser() {
    let user;
    while (true) {
        let name = prompt("Enter a name?", "iliakan");
        try {
            user = await loadJsonAsync(`https://api.github.com/users/${name}`);
            break;
        } catch (err) {
            if (err instanceof HttpError && err.response.status == 404) {
                alert("No such user, please reenter.");
            } else {
                throw err;
            }
        }
    }
    alert(`Full name: ${user.name}.`);
    return user;
}
console.log("==========Resultado Ejercicio #4==========")
demoGithubUser();
//Ejercicio #5
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
}
function f() {
    wait().then(result => alert(result));
}
console.log("==========Resultado Ejercicio #5==========")
f();
//Ejercicio #6
new Promise(function (resolve, reject) {
    setTimeout(() => {
        throw new Error("Whoops!");
    }, 1000);
}).catch(alert);
console.log("==========Resultado Ejercicio #6==========")
console.log("No entra al catch porque busca el controlador de error mas cercano que es throw")
//Ejercicio #7
function printNumbers(from, to) {
    let current = from;
    let timerId = setInterval(function () {
        alert(current);
        if (current == to) {
            clearInterval(timerId);
        }
        current++;
    }, 1000);
}
console.log("==========Resultado Ejercicio #7==========")
printNumbers(7, 9);