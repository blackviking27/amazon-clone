import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Provider as AuthProvider } from "next-auth/client";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Provider store={store}>
                <Header />
                <Component {...pageProps} />
            </Provider>
        </AuthProvider>
    );
}

export default MyApp;
