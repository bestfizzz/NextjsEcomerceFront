import ItemsInCart from '@/components/ItemsInCart';
import Layout from '@/components/Layout';
import OrderForm from '@/components/OrderForm';
import { Breadcrumbs,Typography } from "@material-tailwind/react";
export default function CheckOut() {
    return (
        <Layout>
            <div className='flex items-start'>
                <Breadcrumbs separator=">" className='bg-transparent w-full self-start'>
                    <span className="opacity-60 text">
                        Cart
                    </span>
                    <span >Order</span>
                    <span className="opacity-60">
                        Payment
                    </span>
                </Breadcrumbs>
            </div>
            <div className='flex w-full flex-col sm:flex-row'>
                <div className='flex-1 md:ml-10'>
                    <OrderForm />
                </div>
                <div className='flex-1 items-center ml-4'>
                    <Typography className="mx-auto" variant="h2">Cart</Typography>
                    <ItemsInCart />
                </div>
            </div>
        </Layout>
    )
}