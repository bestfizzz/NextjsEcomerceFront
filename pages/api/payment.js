import { createPaymentUrl } from "@/lib/vnpay";

export default function handler(req, res) {
    const { method } = req
    if (method === 'POST') {
        const amount = req.body.cost; // Amount in VND
        const bankCode = 'VNBANK'//'VNPAYQR'; // Optional bank code
        const language = 'vn'; // Optional language code
        const paymentURL = createPaymentUrl(amount, bankCode, language, req)
        if (paymentURL) {
            return res.status(200).send(paymentURL);
        } else {
            console.log('error');
            return res.status(500).send('error');
        }

    } else {
        return res.status(405)
    }
}