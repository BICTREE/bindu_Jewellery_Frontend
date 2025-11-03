import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* 2 Columns: 1 small, 1 big */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-10">
          {/* LEFT COLUMN — Download App Now */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <img
              src="/assets/images/footer-icon.png"
              alt="Bindu Jewellery"
              className="mb-3"
            />
            <p className="text-sm mb-3">Download The App Now</p>
            <img
              src="/assets/logo/qr-img.png"
              alt="QR Code"
              className="h-20 mb-3"
            />
            <div className="flex gap-2">
              <img
                src="/assets/logo/apple-store.png"
                alt="App Store"
                className="h-10"
              />
              <img
                src="/assets/logo/playstore.png"
                alt="Google Play"
                className="h-10"
              />
            </div>
          </div>

          {/* RIGHT COLUMN — 2 Rows */}
          <div className="flex flex-col gap-10">
            {/* Row 1 - 3 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
              {/* Information */}
              <div>
                <h3 className="text-gold font-semibold mb-4 uppercase">
                  Information
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/returnpolicy" className="ftr-hober">
                      Return Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/shippingpolicy" className="ftr-hober">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacypolicy" className="ftr-hober">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/termsandconditions" className="ftr-hober">
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h3 className="text-gold font-semibold mb-4 uppercase">
                  Customer Service
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/faq" className="ftr-hober">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="ftr-hober">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery" className="ftr-hober">
                      Media
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="ftr-hober">
                      Gift Vouchers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Get in Touch */}
              <div>
                <h3 className="text-gold font-semibold mb-4 uppercase">
                  Get In Touch
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-map-marker text-gold mt-1"></i>
                    <span>
                      NH - 17, Ashwini Nagar, <br />
                      Kasaragod, Kerala, India
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-phone text-gold"></i>
                    <a href="tel:04994256888" className="hover:text-gold">
                      04994256888
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fa-solid fa-envelope text-gold"></i>
                    <a
                      href="mailto:contact@bindujewellery.co.in"
                      className="hover:text-gold"
                    >
                      contact@bindujewellery.co.in
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Row 2 - Sister Concerns */}
          <div className="border-t border-gray-700 pt-8 text-left">
  <h3 className="text-gold font-semibold mb-6 uppercase">
    Our Sister Concerns
  </h3>

  <div className="flex flex-col sm:flex-row gap-10">
    {/* Sister Company 1 */}
    <div className="flex flex-col ">
      <img
        src="/assets/logo/shasra-logo.jpg"
        alt="Sahasra Boutique"
        className="h-18 mb-2 object-contain"
      />
      <p className="text-sm text-gray-300">Sahasra Boutique</p>
    </div>

    {/* Sister Company 2 */}
    <div className="flex flex-col ">
      <img
        src="/assets/logo/savits-logo.jpg"
        alt="The Saavits"
        className="h-18 mb-2 object-contain"
      />
      <p className="text-sm text-gray-300">The Saavits</p>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 py-4 px-4 mt-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>Copyright © 2025 All Rights Reserved | Bictreeindia.Com.</p>
          <div className="flex gap-3 mt-3 md:mt-0">
            <img src="/assets/logo/visa.png" alt="Visa" className="h-6" />
            <img src="/assets/logo/amr-expr.png" alt="Amex" className="h-6" />
            <img src="/assets/logo/discover.png" alt="Discover" className="h-6" />
            <img src="/assets/logo/master.png" alt="Mastercard" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
