const express = require('express');
const base32 = require('base32');
const otplib = require('otplib');
const router = express.Router();

otplib.authenticator.options = {
  step: 30,
  window: 1,
};

function genKey() 
{
  const len = 16;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let key = '';

  for (let i = 0; i < len; i++) 
  {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}


function verifyTOTPCode(secretKey, totpCode) 
{
  const isValid = otplib.authenticator.check(totpCode, secretKey);
  return isValid;
}


var secretKey = "";


router.get('/', (req, res) => {
  secretKey = genKey()
  res.render('index', { secretKey: secretKey });
});

router.post('/verify', (req, res) => {
  const totpCode = req.body.totpCode;
  const isValid = verifyTOTPCode(secretKey, totpCode);
  if (isValid) {
    res.send('TOTP code is valid!');
  } else {
    res.send('TOTP code is invalid!');
  }
});

module.exports = router;
