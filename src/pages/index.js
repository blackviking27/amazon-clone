import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Amazon Clone</title>
            </Head>

            {/* Header */}
            {/* <Header /> */}

            {/* Main content container */}
            <main className="max-w-screen-2xl mx-auto">
                {/* Banner */}
                <Banner />

                {/* Products Feed */}
                <ProductFeed products={products} />
            </main>
        </div>
    );
}

// Api call to fetch products
export async function getServerSideProps(context) {
    const products = await fetch("https://fakestoreapi.com/products").then(
        (res) => res.json()
    );

    return {
        props: {
            products,
        },
    };
}
