import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { AuthContextProvider } from "src/contexts/AuthContext";
import { ReactQueryProvider } from "src/provider/ReactQueryProvider";
import "../styles/globals.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ReactQueryProvider>
        <Component {...pageProps} />
        <Toaster />
      </ReactQueryProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
