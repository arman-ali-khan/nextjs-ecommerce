import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/Layout/Layout'
import Hero from '@/components/Pages/Home/Hero/Hero'
import Products from '@/components/Products/Products'
import OfferUderPopular from '@/components/Offers/OfferUderPopular'
import Footer from '@/components/Pages/Shared/Footer/Footer'
import AppDownload from '@/components/AppDownload/AppDownload'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <Layout title={'Nextjs Ecommerce || Home'}>
	<Hero />
	<Products />
	<OfferUderPopular />
	<Products />
	<AppDownload />
   </Layout>
  )
}
