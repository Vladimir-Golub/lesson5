// const http = require('http');
// const querystring = require('querystring');
//
// let data = querystring.stringify({
//     lastName: "tomilo"
// });
//
// let options = {
//     hostname: 'netology.tomilomark.ru',
//     path: '/api/v1/hash',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Firstname': 'mark'
//     }
// };
//
// function handler(res) {
//     console.log(res.statusCode);
//     console.log(res);
//     let data = '';
//
//     res.on('data', function (part) {
//         data += part;
//     });
//     res.on('end', function () {
//         console.log(data);
//     })
// }
//
// let request = http.request(options);
//
// request.write(data);
// request.on('response', handler);
// request.end();


const http = require('http');
const querystring = require('querystring');

let firstName = 'mark';
let lastName = 'tomilo';

let data = querystring.stringify({
    lastName: lastName
});

let options = {
    hostname: 'netology.tomilomark.ru',
    path: '/api/v1/hash',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Firstname': firstName,
        'Content-Length': Buffer.byteLength(data)
    }
};

function result(hash) {
    console.log({
        firstName: firstName,
        lastName: lastName,
        secretKey: hash
    });
    return {
        firstName: firstName,
        lastName: lastName,
        secretKey: hash
    };
}

function handler(response) {

    let data = '';

    response.on('data', function (chunk) {
        data += chunk;
    });
    response.on('end', function () {
        let string = JSON.parse(data);
        result(string.hash);
    });
}

let request = http.request(options);

request.write(data);
request.on('response', handler);
request.end();