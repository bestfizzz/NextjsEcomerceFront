import { Carousel } from "@material-tailwind/react";

export default function ProductImages({ images }) {
    return (
        <Carousel className="rounded-xl max-w-[300px] max-h-[300px]">
            {images?.map(image => {
                return (
                    <img
                        src={image}
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                )
            })}
        </Carousel>
    );
}