import axios from 'axios';
import crypto from 'crypto';
import querystring from 'qs';
import moment from 'moment';

// VNPay credentials
const tmnCode = process.env.tmnCode;
const secretKey = process.env.secretKey;
const vnpUrl = process.env.vnpUrl;
const returnUrl = process.env.baseUrl + '/checkout/status'

// Generate secure hash
function generateSecureHash(data,hash='sha512') {
  const sortedData = sortObject(data);
  const signData = querystring.stringify(sortedData, { encode: false });
  const hmac = crypto.createHmac(hash, secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  return signed;
}

// Sort object properties
function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}

// Create payment URL
export function createPaymentUrl(amount, bankCode, language, req) {
  const date = new Date();
  const createDate = moment(date).format('YYYYMMDDHHmmss');
  const orderId = moment(date).format('DDHHmmss');

  const vnpParams = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: language || 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: `Thanh+toan+don+hang+%3A${orderId}`,
    vnp_OrderType: 'other',
    vnp_ReturnUrl:encodeURIComponent(returnUrl),
    vnp_Amount: amount * 100,
    vnp_CreateDate: createDate,
    
  };

  if (bankCode) {
    vnpParams.vnp_BankCode = bankCode;
  }

  const secureHash = generateSecureHash(vnpParams);
  vnpParams.vnp_SecureHash = secureHash;

  const url = `${vnpUrl}?${querystring.stringify(vnpParams, { encode: false })}`;
  return {url, orderId};
}

export function handleVNPayReturn(query) {
  const vnp_Params = query;
  const secureHash = vnp_Params['vnp_SecureHash'];
  console.log(vnp_Params)
  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];  

  const signed = generateSecureHash(vnp_Params,'sha512');

  if (secureHash === signed) {
    console.log(secureHash,signed)
    // Check if the data in the database is valid and provide the result accordingly
    return signed
  } else {
    return signed
  }
}

//http://localhost:3000/checkout/status?vnp_Amount=210000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14013839&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang+%3A16184943&vnp_PayDate=20230516185124&vnp_ResponseCode=00&vnp_TmnCode=LXDWQP4H&vnp_TransactionNo=14013839&vnp_TransactionStatus=00&vnp_TxnRef=16184943&vnp_SecureHash=041d768330895fbc3f156674537ee80cc6d56b5e01b93408677b55c30d8183af1bdb87aadc3ef6e09f3d33c26d7ec3e134b5b69bc3969f5fcfb8fb5f3859e372