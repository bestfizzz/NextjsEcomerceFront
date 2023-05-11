import {collection,getDocs,doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const products = collection(db, 'products');

const getProduct = async (id) => {
    const product = doc(db, 'products',id)
    const snapshot = await getDoc(product)
    let data = {
        _id: snapshot.id,
        ...snapshot.data()
    }
    return data
}

const getProducts = async () => {
    const snapshot = await getDocs(products)
    let list = []
    snapshot.forEach(doc => {
        let data = {
            _id: doc.id,
            ...doc.data()
        }
        list.push(data);
    });
    return list
}

export default function handler(req, res) {
    const { method } = req
    if (method === 'GET') {
        if (req.query?.id) {
            return getProduct(req.query?.id)
                .then((data) => {
                    return res.status(200).send(data);
                })
                .catch((error) => {
                    console.log('error', error);
                    return res.status(500).send(error);
                })
        }
        return getProducts()
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