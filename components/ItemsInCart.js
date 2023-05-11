import { numberWithCommas } from "./numberWithCommas"
import { useEffect, useState, useContext } from "react"
import { CartContext } from "./CartContext"
import { Typography } from "@material-tailwind/react"

export default function ItemsInCart() {
    const { cartProducts, addProductToCart, removeProductFromCart, getCost } = useContext(CartContext)
    const [productsUnique, setProductsUnique] = useState([])
    const noScrollbar =" h-72 relative max-w-lg bg-transparent flex flex-col divide-y border-b-2 border-black"
    const showScrollbar=noScrollbar+ " overflow-y-scroll scrollbar"
    useEffect(() => {
        setProductsUnique(() => {
            return Array.from(new Set(cartProducts.map(product => product._id)))
                .map(id => {
                    return cartProducts.find(product => product._id === id)
                })
        }
        )
    }, [cartProducts])

    return (
        <>
            <div className={productsUnique.length>3?showScrollbar:noScrollbar}>
                {productsUnique.map(function (product) {
                    const quantity = cartProducts.filter(item => item._id == product._id).length
                    return (
                        <div key={product._id} className="flex items-center gap-4 p-3 pr-0 w-full">
                            <img className=" w-14 h-14" src={product.images[0]} />
                            <div className="flex flex-col w-full gap-y-2">
                                <div className="flex justify-between w-full">
                                    <p className="text-slate-500 text-sm font-medium  ">{product.title}</p>
                                    <p className="text-slate-500 text-sm font-small ">{numberWithCommas(product.price) + '₫'} </p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className="text-slate-300 text-sm font-medium ">
                                        <span className="cursor-pointer" onClick={() => addProductToCart(product)}> + </span>
                                        {quantity}
                                        <span className="cursor-pointer" onClick={() => removeProductFromCart(product)}> - </span>
                                    </p>
                                    <p className="text-gray-600 text-sm font-small ">{numberWithCommas(product.price * quantity) + '₫'} </p>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
                }
            </div>
            <div className="flex justify-between w-full max-w-[512px]">
            <Typography className="mt-4 text-3xl" variant="h2">Total: </Typography>
            <Typography className="mt-4 text-3xl" variant="h2">{numberWithCommas(getCost())}₫</Typography>
            </div>
        </>
    )
}