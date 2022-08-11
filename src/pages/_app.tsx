import Modal from "react-modal";
import { AuthContextProvider } from "src/contexts/AuthContext";
import { ProductsContextProvider } from "src/contexts/products/context";
import "../styles/globals.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ProductsContextProvider>
        <Component {...pageProps} />
      </ProductsContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
