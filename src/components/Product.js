import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
    // Random rating for product
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );

    const [hasPrime] = useState(Math.random() < 0.5);

    return (
        <div className="relative flex flex-col m-5  bg-white z-20 p-10 rounded-md">
            <p className="absolute top-2 right-2 text-sm italic  text-gray-400 ">
                {category}
            </p>

            <Image src={image} height={200} width={200} objectFit="contain" />

            <h4 className="font-bold my-5">{title}</h4>

            {/* Rating */}
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon className="h-5 text-yellow-500" />
                    ))}
            </div>

            {/* Description */}
            <p className="text-sm my-2 line-clamp-2">{description}</p>

            {/* Price */}
            <div className="mb-5">₹{parseInt(price * 70)}</div>

            {/* Prime */}
            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img
                        className="w-12"
                        src="https://links.papareact.com/fdw"
                        alt=""
                    />
                    <p className="text-xs text-gray-500">
                        FREE Next-Day Delivery
                    </p>
                </div>
            )}

            {/* Add to Basket button */}
            <button className="mt-auto button">Add to Basket</button>
        </div>
    );
}

export default Product;
