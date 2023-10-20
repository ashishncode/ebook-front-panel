import Footer from "../components/common/Footer";
import Header from "../components/home/Header";
import HomeContent from "../components/home/homeContent";
import HomePackages from "../components/home/homePackages";
import HomeWhyChooseUs from "../components/home/homeWhyChooseUs";
import Latestebooks from "../components/home/latestBbooks";
import MainBanner from "../components/home/mainBanner";
import HeaderLogin from "../components/common/Header_login";

const HomePage = () => {
  const author = localStorage.getItem("authortype");
  const userEmail = localStorage.getItem("userEmail");
  return (
    <>
      {author || userEmail ? <HeaderLogin /> : <Header />}
      <MainBanner />
      <HomeContent />
      <Latestebooks />
      <HomePackages />
      <HomeWhyChooseUs />
      <Footer />
    </>
  );
};

export default HomePage;
