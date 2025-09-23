// import { Link } from "lucide-react";
import React from "react";
import Link from "next/link";
type ProductCardProps = {
  image: string;
  hoverImg: string;
  name: string;
  offer?: string;
  price: number | string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  hoverImg,
  name,
  offer,
  price,
}) => {
  return (
    <>
      <Link href="/product-list/ring" className="cardBlock sm:justify-center mx-auto ">
        <div className="card">
          <img src={image} alt={name} className="img img1" />
          <img src={hoverImg} alt={name} className="img img2" />

          <div className="info">
            <ul className="actions">
              <li>
                <button className="iconBtn">
                  <img src="/assets/images/Heart.svg" alt="wishlist" />
                </button>
              </li>
              <li>
                <button className="iconBtn">
                  <img src="/assets/images/Eye.svg" alt="preview" />
                </button>
              </li>
              <li>
                <button className="iconBtn">
                  <img src="/assets/images/Forward_Arrow.svg" alt="share" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="productInfo">
          <h3>{name}</h3>
          <p>{offer ?? "22K Hallmarked"}</p>
          <div className="price">
            <span className="textPrice">₹{price}</span>
            <button className="textCart">Add to Cart</button>
          </div>
        </div>
      </Link>

      {/* ✅ Scoped styles */}
      <style jsx>{`
        .cardBlock {
          width: 260px;
        }

        .card {
          position: relative;
          width: 260px;
          height: 360px;
          overflow: hidden;
          border-radius: 0;
          background: #fff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.5s ease;
          cursor: pointer;
        }

        .card img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .card img.img2 {
          opacity: 0;
        }

        .info {
          position: absolute;
          bottom: 0;
          opacity: 0;
          transform: translateX(-50px);
          transition: 0.5s;
          color: #fff;
          text-align: center;
          padding: 12px;
        }

        .info ul {
          width: 30px;
          margin: 0;
          padding: 0;
        }

        .info ul li {
          width: 30px;
          height: 30px;
          list-style: none;
          background: #d4d4d4;
          margin: 5px 0;
          padding: 5px;
          border-radius: 100%;
        }

        .info ul li img {
          width: 100%;
          height: 100%;
          position: inherit;
        }

        .productInfo {
          padding: 12px;
          text-align: center;
        }

        .productInfo h3 {
          font-size: 14px;
          font-weight: bold;
          color: #b58900;
          margin: 6px 0 4px;
          text-transform: uppercase;
        }

        .productInfo p {
          font-size: 12px;
          color: #777;
          margin: 0;
        }

        .price {
          margin-top: 8px;
          font-size: 16px;
          font-weight: bold;
          color: #000;
          position: relative;
        }

        .price .textPrice {
          display: inline-block;
          transition: opacity 0.3s ease;
        }

        .price .textCart {
          display: none;
          color: #b58900;
        }

        /* Hover effects */
        .cardBlock:hover .card {
          border-radius: 120px 120px 0 0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .cardBlock:hover .img1 {
          opacity: 0;
        }

        .cardBlock:hover .img2 {
          opacity: 1;
          transform: scale(1.05);
        }

        .cardBlock:hover .info {
          opacity: 1;
          transform: translateX(0px);
          transition-delay: 0.2s;
        }

        .cardBlock:hover .price .textPrice {
          display: none;
        }

        .cardBlock:hover .price .textCart {
          display: inline-block;
        }
      `}</style>
    </>
  );
};

export default ProductCard;
