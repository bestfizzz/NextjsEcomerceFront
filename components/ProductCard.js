import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    CardFooter
} from "@material-tailwind/react";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext"
import { numberWithCommas } from "./numberWithCommas";
export default function ProductCard({ product }) {
    const {addProductToCart}=useContext(CartContext)
    return (
        <Card className="w-80">
            <CardHeader shadow={false} floated={false} className="h-64">
                <img
                    src={product.images[0]}
                    className="w-full h-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <div className="flex items-center justify-between mb-2">
                    <Typography color="blue-gray" className="font-medium">
                        {product.title}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                        {numberWithCommas(product.price) + '₫'}
                    </Typography>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        {product.description}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal opacity-75">
                        {product.category}
                    </Typography>
                </div>

            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    type="button"
                    onClick={() => addProductToCart(product)}
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}