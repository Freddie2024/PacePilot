import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Main_Layout from '@/components/Main_Layout';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return <Component {...pageProps} />;
}
