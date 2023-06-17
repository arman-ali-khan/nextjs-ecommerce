import Footer from "@/components/Pages/Shared/Footer/Footer";
import Navbar from "@/components/Pages/Shared/Navbar/Navbar";
import Head from "next/head";

const Layout = ({ children, title, description, thumb }) => {
  return (
    <div>
      <div>
        <Head>
          <title>{title || "Nobin Udyokta"}</title>

          <meta name="description" content={description} key="desc" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={thumb} />
        </Head>
      </div>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
