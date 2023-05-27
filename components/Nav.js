import { useContext,useState,useEffect } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    Card,
} from "@material-tailwind/react";
import { CartContext } from "@/components/CartContext";
import { useRouter } from "next/router";
import CartPopUp from "./CartPopUp";

export default function Nav() {
    const [openNav, setOpenNav] = useState(false);
    const router = useRouter()
    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Home
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                About
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Products
                </a>
            </Typography>
            {/* <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Docs
                </a>
            </Typography> */}
        </ul>
    );
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);
    const {cartProducts} = useContext(CartContext)
    return (
        <>
            <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 md:px-8 md:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
                        Ecommerce shop
                    </Typography>
                    <div className="mr-4 hidden md:block">{navList}</div>
                    <CartPopUp showInMobile={false} />
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <CartPopUp showInMobile={true}/>
                </Collapse>
            </Navbar>
        </>
    );
}