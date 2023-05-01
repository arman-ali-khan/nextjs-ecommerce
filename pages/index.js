import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/Layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <Layout title={'Nextjs Ecommerce || Home'}>
    <div className='text-3xl '>Hello World</div>
   </Layout>
  )
}
