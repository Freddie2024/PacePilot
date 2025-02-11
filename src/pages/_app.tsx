import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Main_Layout from '@/components/Main_Layout';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line global-require
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return <Component {...pageProps} />;
}
