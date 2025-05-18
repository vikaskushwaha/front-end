'use client'

import ExploreCars from "./component/exploreCars"
import Footer from "./component/footer"
import { BDXCarsHeader } from "./component/hero"
import LatestBlog from "./component/latestBlog"
import PopularMakes from "./component/popularMakes"
import Premiumbrands from "./component/premiumBrands"
import ShopBoxCar from "./component/shopBoxCar"
import Testimony from "./component/testimony"
import VideoSection from "./component/videoSection"
import WhyChooseUs from "./component/whyChooseUs"
import { SearchProvider } from "./context/SearchContext"

export default function HomePage() {
  return (
    <SearchProvider>
      <div className="w-full flex flex-col">
        <BDXCarsHeader />

        <div className="relative bg-[#F9FBFC] rounded-t-3xl rounded-b-3xl mt-[-2%] mb-[-2%] z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-6">
          <Premiumbrands />
          <ExploreCars id="explore-cars" />
          <VideoSection />
          <WhyChooseUs />
          <PopularMakes />
          <ShopBoxCar />
          <Testimony />
          <LatestBlog />
        </div>

        <Footer />
      </div>
    </SearchProvider>
  )
}