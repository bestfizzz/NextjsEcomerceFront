import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useRouter } from "next/router";

export default function OrderForm() {
    const { cartProducts, getCost,wipeCart } = useContext(CartContext)
    const router=useRouter()
    const [ticked, setTicked] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [cost, setCost] = useState(0)
    useEffect(() => {
        setCost(() => getCost())
    }, [])
    const submitOrder =async (ev) => {
        ev.preventDefault()
        if (ticked && cost > 0) {
            const order = Array.from(new Set(cartProducts.map(product => product._id)))
                .map(id => {
                    return cartProducts.find(product => product._id === id)
                })
            for(var i=0;i<order.length;i++) {
                order[i].quantity=cartProducts.filter(item => item._id == order[i]._id).length
                order[i]={
                    _id: order[i]._id,
                    title:order[i].title,
                    quantity: order[i].quantity,
                    price:order[i].price,
                }
            }
            const data = { name: name, email: email, phone: phone, address: address, cost: cost,order:order }
            await axios.post('/api/orders',data)
            router.push('/')
            wipeCart()
        }
    }
    return (
        <Card color="transparent" shadow={false} className="">
            <Typography variant="h4" color="blue-gray">
                Customer Information
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details.
            </Typography>
            <form onSubmit={submitOrder} className="mt-8 mb-2 max-w-screen-lg md:w-auto md:pr-7 sm:min-w-80 w-auto">
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" value={name} onChange={ev => setName(ev.target.value)} required label="Name" />
                    <Input size="lg" value={email} onChange={ev => setEmail(ev.target.value)} required label="Email" />
                    <Input size="lg" value={phone} onChange={ev => setPhone(ev.target.value)} required label="Phone" />
                    <Input size="lg" value={address} onChange={ev => setAddress(ev.target.value)} required label="Address" />
                </div>
                <Checkbox
                    label={
                        (
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree to buy this product
                            </Typography>
                        )
                    }
                    containerProps={{ className: "-ml-2.5" }}
                    onClick={() => setTicked(!ticked)}
                />
                <Button color={ticked && cost > 0 ? '' : "gray"} type="submit" className="mt-6" fullWidth>
                    Comfirm
                </Button>
            </form>
        </Card>
    );
}