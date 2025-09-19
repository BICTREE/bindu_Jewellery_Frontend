import Banner from "@/components/common/Banner/Banner";
import CollectionBanners from "@/components/home/CollectionBanners";
import ProductFilter from "@/components/productfilter/ProductFilter";
import ProductListComp from "@/components/productlist/ProductListComp";

import React from "react";
const products = [
  {
    id: 1,
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    image: "/assets/images/card-img01.png",
    hoverImg: "/assets/images/catmod-01.jpg",
  },
  {
    id: 2,
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    image: "/assets/images/card-img01.png",
    hoverImg: "/assets/images/catmod-01.jpg",
  },
  {
    id: 3,
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    image: "/assets/images/card-img01.png",
    hoverImg: "/assets/images/catmod-01.jpg",
  },
  {
    id: 4,
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    image: "/assets/images/card-img01.png",
    hoverImg: "/assets/images/catmod-01.jpg",
  },
  {
    id: 5,
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    image: "/assets/images/card-img01.png",
    hoverImg: "/assets/images/catmod-01.jpg",
  },
  {
    id: 6,
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    image: "/assets/images/card-img01.png",
    hoverImg: "/assets/images/catmod-01.jpg",
  },

  {
    id: 7,
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    image: "/assets/images/card-img01.png",
    hoverImg: "/assets/images/catmod-01.jpg",
  },

    {
    id: 8,
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    image: "/assets/images/card-img01.png",
    hoverImg: "/assets/images/catmod-01.jpg",
  },


];

const Collections = () => {
  return (
    <>
      <Banner
      Title="Title"
      />
      <ProductFilter />
      <ProductListComp products={products} />
      <CollectionBanners/>
      
    </>
  );
};

export default Collections;
