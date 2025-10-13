import Hero from "@/components/home/HeroComp";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import Image from "next/image";
import CollectionBanners from "@/components/home/CollectionBanners";
import NewArrivals from "@/components/home/NewArrivals";
// import QrBanner from "@/components/common/qrbanner/QrBanner";
import SplOfferbanner from "@/components/common/offerbanner/SplOfferbanner";
import PoppularCategory from "@/components/home/PoppularCategory";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import GiftMore from "@/components/home/GiftMore";
import MediaComp from "@/components/home/MediaComp";
import OfferPopup from "@/components/common/offerpopup/OfferPopup";
export default function Home() {
  return (
    <div className=" ">
         <OfferPopup />
     <Hero/>
     <FreeshipingComp/>
     <CollectionBanners/>
     <NewArrivals/>
     {/* <QrBanner/> */}
     <SplOfferbanner/>
     <PoppularCategory/>
     <SubscribeNewsletter/>
     <GiftMore/>
     <MediaComp/>
    </div>
  );
}
