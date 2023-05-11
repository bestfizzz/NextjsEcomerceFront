import { Carousel, Typography, Button } from "@material-tailwind/react";
const carouselItems = [
    {
        imageSrc:
            'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
        altText: 'image 1',
        heading: 'The Beauty of Nature',
        description:
            "It is not so much for its beauty that the forest makes a claim upon men's hearts, as for that subtle something, that quality of air that emanation from old trees, that so wonderfully changes and renews a weary spirit."
    },
    {
        imageSrc:
            'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
        altText: 'image 2',
        heading: 'The Beauty of Nature',
        description:
            "It is not so much for its beauty that the forest makes a claim upon men's hearts, as for that subtle something, that quality of air that emanation from old trees, that so wonderfully changes and renews a weary spirit."
    },
    {
        imageSrc:
            'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
        altText: 'image 3',
        heading: 'The Beauty of Nature',
        description:
            "It is not so much for its beauty that the forest makes a claim upon men's hearts, as for that subtle something, that quality of air that emanation from old trees, that so wonderfully changes and renews a weary spirit."
    }
];

export default function SlideShow() {
    return (
        <Carousel className="rounded-xl ">
            {carouselItems.map((item, index) => (
                <div className="relative h-full w-full" key={index}>
                    <img src={item.imageSrc} alt={item.altText} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                        <div className="w-3/4 text-center md:w-2/4">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                {item.heading}
                            </Typography>
                            <Typography variant="lead" color="white" className="mb-12 opacity-80">
                                {item.description}
                            </Typography>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="white">
                                    Explore
                                </Button>
                                <Button size="lg" color="white" variant="text">
                                    Gallery
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}