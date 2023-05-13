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
function generateSecureHash(data) {
  const sortedData = sortObject(data);
  const signData = querystring.stringify(sortedData, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
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
export default function createPaymentUrl(amount, bankCode, language, req) {
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

// Example usage
// const amount = 100000; // Amount in VND
// const bankCode = 'BANK_CODE'; // Optional bank code
// const language = 'vn'; // Optional language code
// const url = createPaymentUrl(amount, bankCode, language);
// console.log(url);?vnp_Amount=206000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14011734&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang+%3A13203331&vnp_PayDate=20230513203353&vnp_ResponseCode=00&vnp_TmnCode=LXDWQP4H&vnp_TransactionNo=14011734&vnp_TransactionStatus=00&vnp_TxnRef=13203331&vnp_SecureHash=70c73243cf9a2a23af64a0744f15d11a61e1d64ae9a1c9769ffed22c201bed6a7abf00b3f5b022ed34735a699645c57207810025fc4768acbdc6d1bf303fec91
//https://nextjs-ecomerce-front.vercel.app/?vnp_Amount=206000000&vnp_BankCode=NCB&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang+%3A13203710&vnp_PayDate=20230513203735&vnp_ResponseCode=24&vnp_TmnCode=LXDWQP4H&vnp_TransactionNo=14011735&vnp_TransactionStatus=02&vnp_TxnRef=13203710&vnp_SecureHash=adbb8c03557eaf303d4d173ce68473a28e4e613874f63725ee0053b322d8495588c619493e5219e57e61eac4bffdac22b97bcecf75bb3a935a309867616a662c
