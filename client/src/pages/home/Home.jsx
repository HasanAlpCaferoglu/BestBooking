import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="flex flex-col items-start justify-between gap-[30px] mx-6 md:mt-[50px] lg:mx-24">
        <Featured />
        <div className="flex flex-col items-start gap-[30px]">
          <h1 className="text-xl">Browse by property type</h1>
          <PropertyList />
        </div>
        <div className="flex flex-col items-start gap-[30px]">
          <h1 className="text-xl">Homes guests love</h1>
          <FeaturedProperties />
        </div>   
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Home;

