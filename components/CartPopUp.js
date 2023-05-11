import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ItemsInCart from "./ItemsInCart";
import { useRouter } from "next/router";
import { CartContext } from "./CartContext";

export default function CartPopUp({showInMobile}) {
    const { cartProducts } = useContext(CartContext)
    const [open, setOpen] = React.useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState()
    const handleOpen = () => setOpen((cur) => !cur);
    const router = useRouter()
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => {
                if (window.innerWidth < 960) {
                    setIsSmallScreen(true)
                } else {
                    setIsSmallScreen(false)
                }
            }
        );
    }
    )
    return (
        <React.Fragment>
            {isSmallScreen && showInMobile ?
                <Button onClick={handleOpen} variant="gradient" size="sm" fullWidth className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 inline-flex">
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                    <span>Cart ({cartProducts.length})</span>
                </Button>
                :
                <Button onClick={handleOpen} variant="gradient" size="sm" className={"hidden md:inline-block px-4 py-3 text-center "}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 inline-flex">
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                    <span className="">Cart ({cartProducts.length}) </span>
                </Button>}
            <Dialog size="xs" className="min-w-[90%] sm:min-w-fit" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                    <Typography className="ml-2" variant="h2">Cart</Typography>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className=" md:pr-2">
                    <ItemsInCart />
                </DialogBody>
                <DialogFooter className="justify-between gap-2 border-t border-blue-gray-50">
                    <Button onClick={() => router.push('/checkout')} variant="gradient" size="sm" fullWidth className="mb-2">
                        <span>Check Out</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    );
}