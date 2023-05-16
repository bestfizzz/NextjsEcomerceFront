import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Typography, Spinner, Button } from "@material-tailwind/react";
import ProductImages from "@/components/ProductImages";
import { CartContext } from "@/components/CartContext";

export default function ProductPage() {
    const router = useRouter()
    const { id } = router.query
    const { addProductToCart } = useContext(CartContext)
    const [productInfo, setProductInfo] = useState()
    const [quantityValue, setQuantityValue] = useState(0);

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/api/products?id=' + id).then(res => {
            setProductInfo(res.data)
        })
    }, [id])
    const handleIncrease = () => {
        setQuantityValue((prevQuantityValue) => prevQuantityValue + 1);
    };

    const handleDecrease = () => {
        setQuantityValue((prevQuantityValue) => prevQuantityValue > 1 ? prevQuantityValue - 1 : 1);
    };

    const addNumberOfProductsToCart = (product, quantityValue) => {
        addProductToCart(product, quantityValue)
    }

    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }
    return (
        <Layout>
            {productInfo ?
                <div className="flex flex-col sm:flex-row justify-center mt-8">
                    <div className="mx-auto sm:mx-0">
                        <ProductImages images={productInfo.images} />
                    </div>
                    <div className="flex flex-col mx-0 mt-0 sm:mx-8">
                        <Typography variant='h3' className="max-w-[30ch]">
                        { capitalize(productInfo.title)}
                        </Typography>
                        <Typography variant='lead'>{productInfo.price}₫</Typography>
                        <Typography variant='h1'>Category: {productInfo.category}</Typography>
                        <div className="flex items-center">
                            <button
                                className="px-2 py-1 bg-gray-200 text-gray-600 rounded-l"
                                onClick={handleDecrease}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                className="w-16 py-1 border border-gray-300 rounded-none text-center"
                                value={quantityValue}
                                onChange={(e) => Number(e.target.value) >= 0 || e.target.value == '' ? setQuantityValue(Number(e.target.value)) : 1}
                            />
                            <button
                                className="px-2 py-1 bg-gray-200 text-gray-600 rounded-r"
                                onClick={handleIncrease}
                            >
                                +
                            </button>
                        </div>
                        <Button variant="gradient" type="button" onClick={() => addNumberOfProductsToCart(productInfo, quantityValue)} size="sm" className="my-2">
                            <span>Add to cart</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-2 inline-flex">
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                            </svg>
                        </Button>
                        <Typography variant='h3'>Properties</Typography>
                        {productInfo.properties ? Object.keys(productInfo.properties).map((key,index) => {
                            return (
                                <Typography key={index} className="ml-4 font-thin" variant='h5'>- {capitalize(key)}: {productInfo.properties[key]}</Typography>
                            )
                        })
                            :
                            <Typography variant='h5'>No properties</Typography>
                        }
                        <div>
                            <Typography variant='small' className="max-w-[70ch]">{productInfo.description}</Typography>
                        </div>
                    </div>
                </div>
                :
                <div className="flex justify-center">
                    <Spinner className="h-12 w-12" />
                </div>
            }
        </Layout>
    )
}