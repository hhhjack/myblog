const jwt = require('jsonwebtoken');
const secret = 'secret12345';

function createToken(payload){
    payload.ctime = Date.now();
    return jwt.sign(payload, secret, {expiresIn: 3600});
}

function checkToken(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, secret, (err, data)=>{
            console.log('token data', data);
            if(err)
                reject("token 验证失败");
            else
                resolve(data);
        })
    })
}

module.exports = {
    createToken, checkToken
}