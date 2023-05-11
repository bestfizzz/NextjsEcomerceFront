import { createContext, useEffect, useState } from "react"

export const CartContext = createContext({})

export default function CartContextProvider({ children }) {
    const ls = typeof window !== "undefined" ? localStorage : null
    const [cartProducts, setCartProducts] = useState([])
    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls.setItem("cart", JSON.stringify(cartProducts))
        }
    }, [cartProducts])
    useEffect(()=>{
        if (ls && ls.getItem("cart")){
            setCartProducts(JSON.parse(ls.getItem("cart")))
        }
    },[])
    const addProductToCart = (product) => {
        setCartProducts(prev => [...prev, product])
    }
    const removeProductFromCart = (product) => {
        setCartProducts(prev => {
            let newList=[...prev]
            newList.splice(prev.lastIndexOf(product),1)
            return newList
        }
            )
    }
    const wipeCart = ()=>{
        ls.clear()
        setCartProducts([])
    }
    const getCost=()=>{
        let cost=0
        for (let i=0; i<cartProducts.length; i++) {
            cost+=parseInt(cartProducts[i].price)
        }
        return cost
    }
    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProductToCart,getCost,removeProductFromCart,wipeCart }}>
            {children}
        </CartContext.Provider>
    )
}
