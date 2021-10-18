const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req, res) => {
    const { items, email } = req.body;
    
    // For debugging
    console.log("Request Received ..... ");
    console.log(email);
    console.log(items);
    

    // Creating an object to send to stripe
    const transformedItems = items.map((item) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: "inr",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
    }));

    // Checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1JkhjcSEll8p0SJcxJrnMFtU"],
        shipping_address_collection: {
            allowed_countries: ["GB", "US", "CA", "IN"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image)),
        },
    });

    res.status(200).json({ id: session.id });
};
