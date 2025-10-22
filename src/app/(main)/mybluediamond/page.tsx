"use client";

import React from "react";
import Image from "next/image";
import Banner from "@/components/common/Banner/BannerMydiamond";
import MyBlueDiamondCollection from "@/components/mybluediamondcollection/MyBlueDiamondCollection";
import ReviewsSection from "@/components/reviewssection/ReviewsSection";
import DiamondShapesSlider from "@/components/diamondshapesSlider/DiamondShapesSlider"
import JewelryBanner from "@/components/jewelrybanner/JewelryBanner"
import FeatureSection from "@/components/featuresection/FeatureSection"
const MyBlueDiamondPage = () => {
  return (
    <>
      <Banner Title="My Blue Diamonds" />
      <MyBlueDiamondCollection />
<ReviewsSection/>
<DiamondShapesSlider/>
<JewelryBanner/>
<FeatureSection/>
    </>
  );
};

export default MyBlueDiamondPage;
