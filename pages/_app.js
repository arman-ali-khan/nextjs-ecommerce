import ProductsProvider from '@/context/ProductsProvider'
import NextNProgress from 'nextjs-progressbar';

import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  return <ProductsProvider>
    <NextNProgress color='#14b8a6' />
    <Component {...pageProps} />
    </ProductsProvider>
}
