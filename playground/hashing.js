const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123!';

bcrypt.genSalt(8, 'testme', (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$08$rV14YPr5A/vPbbB4LXwn1.Zof61ON5eQnPScdrg1C1lSF4g9Vgolm';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// data = {
//     id: 10
// };

// var token = jwt.sign(data, 'tst234');
// console.log(token);

// var decoded = jwt.verify(token, 'tst234');
// console.log('decoded', decoded);

// message = 'I am user 5';

// hash = SHA256(message);

// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

// data = {
//     id: 4
// };

// token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret1').toString()
// }


// // token.data.id = 5;
// // token.data.hash = SHA256(JSON.stringify(data)).toString();

// resultHash = SHA256(JSON.stringify(token.data) + 'secret1').toString();

// if(resultHash === token.hash)
// {
//     console.log('Data is not changed');
// }
// else 
// {
//      console.log('Data is changed. Do not trust');
// }