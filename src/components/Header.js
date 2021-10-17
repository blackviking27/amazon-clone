import Image from "next/image";
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";

import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

export default function Header() {
    // User session
    const [session] = useSession();

    // Router object
    const router = useRouter();

    // Selector to get the items from the store
    const items = useSelector(selectItems);

    return (
        <header>
            {/* Top Nav */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                {/* Amazon Logo */}
                <div className="mt-1 flex items-center flex-grow sm:flex-grow-0">
                    <Image
                        onClick={() => router.push("/")}
                        src="https://links.papareact.com/f90"
                        height={40}
                        width={150}
                        objectFit="contain"
                        className="cursor-pointer"
                    />
                </div>

                {/* Search bar */}
                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer  bg-yellow-400  hover:bg-yellow-500">
                    <input
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
                        type="text"
                    />
                    <SearchIcon className="h-12 p-4" />
                </div>

                {/* Utilities */}
                <div className="text-white flex items-center text-xs space-x-6 mx-5 whitespace-nowrap">
                    <div
                        onClick={!session ? signIn : signOut}
                        className=" cursor-auto link"
                    >
                        <p>
                            {session
                                ? `Hello, ${session.user.name}`
                                : "Sign In"}
                        </p>
                        <p className="font-extrabold md:text-sm">
                            Accounts & Lists
                        </p>
                    </div>

                    <div
                        onClick={() => router.push("/orders")}
                        className="link"
                    >
                        <p>Orders</p>
                        <p className="font-extrabold md:text-sm">& Returns</p>
                    </div>

                    <div
                        onClick={() => router.push("/checkout")}
                        className=" relative link flex items-center"
                    >
                        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                            {items.length}
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                            Basket
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex space-x-3 p-3 pl-6 items-center text-white bg-amazon_blue-light">
                <p className="link flex items-center">
                    <MenuIcon className="h-6 mr-1" />
                    <p>All</p>
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Buisness</p>
                <p className="link">Today's Deal</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Health & Personal</p>
                <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
            </div>
        </header>
    );
}
