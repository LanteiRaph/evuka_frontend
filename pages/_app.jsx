import React, { useEffect } from "react";

import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../redux/store";
import { Provider } from "react-redux";


import { AuthContextProvider } from "../context/AuthContext";
import { CartContextProvider } from "../context/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script1 = document.createElement("script");

    script1.src =
      "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
    script1.type = "module";

    document.body.appendChild(script1);

    const script = document.createElement("script");

    script.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
    script.noModule = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script);
    };
  }, [])
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <CartContextProvider>
          <PayPalScriptProvider
            options={{ "client-id": "AYElRjOKkBn2lK-0UWa6xQxlfWRNBnTwueyaKFeeU4tYJ-WVH0r2x4MIJVtOXYvn39rt3dZTX90d_tXO"}}>
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default MyApp;
