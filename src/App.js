import Navbar from "./Components/Nav";
import Hero from "./Components/Hero";
import QuickAccess from "./Components/QuickAccess";
import LatestEpisodes from "./Components/LatestEpisodes";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import MostViewed from "./Components/MostViewed";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ui/ScrollToTop";


function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <QuickAccess/>
      <LatestEpisodes/>
      <Trending/>
      <Popular/>
      <MostViewed/>
      <Footer/>
      <ScrollToTop/>
    </div>
  );
}

export default App;
