import { CartContext } from "@/components/CartContext";
import Layout from "@/components/Layout";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import axios from "axios";
import { handleVNPayReturn } from "@/lib/vnpay";

// pages/payment.js
export default function PaymentPage({ transactionStatus }) {
  const { cartProducts, getCost, wipeCart } = useContext(CartContext);
  const router = useRouter();
  const ls = typeof window !== "undefined" ? localStorage : null;
  useEffect(() => {
    if (transactionStatus !== null) {
      const redirectTimeout = setTimeout(() => {
        router.push('/');
      }, 3000)
      return () => clearTimeout(redirectTimeout);
    } else {
      try {
        if (transactionStatus == null) {
          throw new Error('Payment Required');
        }else if(match===false){
          throw new Error('Mismatch');
        }
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    }
  }, []);
  useEffect(() => {
    if (ls && ls.getItem("orderFormData") && cartProducts.length > 0) {
      if (transactionStatus === '00') {
        const { name, email, phone, address, transactionID } = JSON.parse(ls.getItem("orderFormData"));
        handleOrder(name, email, phone, address, transactionID);
        wipeCart()
      }
      ls.removeItem("orderFormData")
    }
  }, [cartProducts]);
  const handleOrder = async(name, email, phone, address, transactionID) => {
    var order = [...cartProducts]
    if (order.length > 0) {
      for (let i = 0; i < cartProducts.length; i++) {
        order[i] = {
          _id: order[i]._id,
          title: order[i].title,
          quantity: order[i].quantity,
          price: order[i].price,
        };
      }
      const data = {
        name,
        email,
        phone,
        address,
        cost: getCost(),
        order,
        transactionID
      };
      console.log(data)
      await axios.post("/api/orders", data);
    }
  }

  return (
    <>
      {transactionStatus != null 
      // && match===true
      ?
        <Layout>
          <div className="min-h-[400px] mt-3">
            <Typography variant="h2">
              {transactionStatus == '00' ?
                <span className="inline-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="green" className="w-11 h-11">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Order Successed, redirecting ...
                </span>
                :
                <span className="inline-flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="red" className="w-11 h-11">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Order Failed, redirecting ...
                </span>}
            </Typography>
          </div>
        </Layout>
        :
        <div className="w-screen h-screen">
          <h1>{transactionStatus==null?
          'Payment required'
          // :match==false?'Mismatch'
          :
          'Unknown error'}</h1>
        </div>
      }
    </>
  )
}

export async function getServerSideProps({ query }) {
  const match = handleVNPayReturn(query)
  const { vnp_TransactionStatus } = query;
  // console.log(match)
  return {
    props: {
      transactionStatus: vnp_TransactionStatus || null,
      // match: match||false
    },
  };
}
