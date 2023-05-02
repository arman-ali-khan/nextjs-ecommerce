import Navbar from '@/components/Pages/Shared/Navbar/Navbar';
import Head from 'next/head';
import React from 'react';

const Layout = ({children,title,description,thumb}) => {
    return (
        <div>
            <div>
            <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description}
        />
        <meta
          property="og:image"
          content={thumb}
        />
      </Head>
            </div>
            <nav className='z-50'>
            <Navbar />
            </nav>
            <main>
                {children}
            </main>
            <footer>

            </footer>
        </div>
    );
};

export default Layout;