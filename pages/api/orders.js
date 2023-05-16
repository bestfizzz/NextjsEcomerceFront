import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
const orders = collection(db, 'orders');

const postOrder = async (data) => {
    return await addDoc(orders, data)
}

export default function handler(req, res) {
    const { method } = req
    if (method === 'POST') {
        // const data =req.body
        const data={
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            cost: req.body.cost,
            order: req.body.order,
            transactionID: req.body.transactionID||'',
        }
        data.createdAt = new Date()
        return postOrder(data)
            .then((data) => {
                return res.status(200).send(data);
            })
            .catch((error) => {
                console.log('error', error);
                return res.status(500).send(error);
            })
    } else {
        return res.status(405)
    }
}