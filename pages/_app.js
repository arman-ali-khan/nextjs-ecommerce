import ProductsProvider from '@/context/ContextProvider'
import NextNProgress from 'nextjs-progressbar';

import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast';
export default function App({ Component, pageProps }) {
  return <ProductsProvider>
    <NextNProgress color='#14b8a6' />
    <Toaster position="top-center" reverseOrder={false} />
    <Component {...pageProps} />
    </ProductsProvider>
}
