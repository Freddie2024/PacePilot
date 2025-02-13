import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Main_Layout from '@/components/Main_Layout';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line global-require
      import("bootstrap/dist/js/bootstrap.bundle.min.js")
      .then(() => console.log("Bootstrap JS loaded"))
      .catch((err) => console.error("Error loading Bootstrap JS:", err));
    }
  }, []);

  return (
    <Main_Layout>
        <Component {...pageProps} />
    </Main_Layout>
);
}
