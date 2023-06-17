import Layout from '@/Layout/Layout'
import AppDownload from '@/components/AppDownload/AppDownload'
import OfferUderPopular from '@/components/Offers/OfferUderPopular'
import Hero from '@/components/Pages/Home/Hero/Hero'
import PrivateRoutes from '@/components/PrivateRoutes/PrivateRoutes'
import Products from '@/components/Products/Products'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <PrivateRoutes>
     <Layout title={'Nobin Udyokta || Home'} thumb={'/social.png'} description={'Most popular e-Commerce website in BD'}>
	<Hero />
	<Products />
	<OfferUderPopular />
	<AppDownload />
   </Layout>
  </PrivateRoutes>
  )
}
