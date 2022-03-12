import Modal from "react-modal";

// Context
import { ProductsContextProvider } from "src/contexts/products/context";

// Styles
import "../styles/globals.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <Component {...pageProps} />
    </ProductsContextProvider>
  );
}

export default MyApp;
