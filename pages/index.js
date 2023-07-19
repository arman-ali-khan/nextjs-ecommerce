import Layout from '@/Layout/Layout'
import AppDownload from '@/components/AppDownload/AppDownload'
import OfferUderPopular from '@/components/Offers/OfferUderPopular'
import Hero from '@/components/Pages/Home/Hero/Hero'
import Products from '@/components/Products/Products'



export default function Home() {
  return (
     <Layout title={'Nobin Udyokta || Home'} thumb={'/social.png'} description={'Buy Products and stocks'}>
	<Hero />
	<Products />
	<OfferUderPopular />
	<AppDownload />
   </Layout>
  )
}
