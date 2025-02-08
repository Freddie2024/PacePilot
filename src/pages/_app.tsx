import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
// import { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import Main_Layout from '@/components/Main_Layout';

// Dynamically import Bootstrap JS without server-side rendering
const BootstrapJS = dynamic(() => import('bootstrap/dist/js/bootstrap.bundle.min.js'), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     require("bootstrap/dist/js/bootstrap.bundle.min.js");
  //   }
  // }, []);

  return (
    <>
      <BootstrapJS /> {/* Load Bootstrap JS on the client side */}
      <Component {...pageProps} />;
    </>
  );
}
