import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSession } from "next-auth/client";
import Currency from "react-currency-formatter";

export default function checkout() {
    // Get items from the stores
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);

    const [session] = useSession();

    return (
        <div>
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left side */}
                <div className="flex-grow m-5 shadow-sm">
                    {/* Ad */}
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />

                    {/* Shopping cart items */}
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl pb-4 border-b">
                            {items.length === 0
                                ? "Your Basket is Empty"
                                : "Your Items"}
                        </h1>
                    </div>

                    {/* Items list */}
                    {items.map((item, key) => (
                        <CheckoutProduct
                            key={key}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                            description={item.description}
                            category={item.description}
                            image={item.image}
                            hasPrime={item.hasPrime}
                        />
                    ))}
                </div>

                {/* Right side */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal ({items.length} items):{" "}
                                <span className="font-bold">
                                    <Currency quantity={total} currency="INR" />
                                </span>
                            </h2>

                            <button
                                disabled={!session}
                                className={`button mt-2 ${
                                    !session &&
                                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}
                            >
                                {!session
                                    ? "Sign in to checkout"
                                    : "Proceed to checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
