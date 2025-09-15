import React from 'react'
import "@fortawesome/fontawesome-free/css/all.min.css";
const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="container ">

        <div className="mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo + QR + Apps */}
        <div className="flex flex-col items-center md:items-center sm:items-end text-center md:text-left">
          <img src="/assets/logo/brand-logo.png" alt="Bindu Jewellery" className="h-35 mb-3" />
          <p className="text-sm mb-3">Download The App Now</p>
          <img src="/assets/logo/qr-img.png" alt="QR Code" className="h-28 mb-3 w-[110px]" />
          <div className="flex gap-2">
            <img src="/assets/logo/apple-store.png" alt="App Store" className="h-10" />
            <img src="/assets/logo/playstore.png" alt="Google Play" className="h-10" />
          </div>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-gold font-semibold mb-4 uppercase">Information</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="ftr-hober">Jewellery Care Tips</a></li>
            <li><a href="#" className="ftr-hober">FAQ</a></li>
            <li><a href="#" className="ftr-hober">Return Policy</a></li>
            <li><a href="#" className="ftr-hober">Shipping Policy</a></li>
            <li><a href="#" className="ftr-hober">Certifications</a></li>
            <li><a href="#" className="ftr-hober">Privacy Policy</a></li>
            <li><a href="#" className="ftr-hober">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-gold font-semibold mb-4 uppercase">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="ftr-hober">About Us</a></li>
            <li><a href="#" className="ftr-hober">Blog</a></li>
            <li><a href="#" className="ftr-hober">Brand</a></li>
            <li><a href="#" className="ftr-hober">Gift Vouchers</a></li>
            <li><a href="#" className="ftr-hober">Affiliate</a></li>
            <li><a href="#" className="ftr-hober">Special Offer</a></li>
            <li><a href="#" className="ftr-hober">Jewellery Care Tips</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-gold font-semibold mb-4 uppercase">Get In Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <i className="fa-solid fa-location-dottext-gold mt-1"></i>
              <span>
                Bindu Jewellery <br />
                NH - 17, Ashwini Nagar, <br />
                Kasaragod, Kerala, India
              </span>
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-gold"></i>
              <a href="tel:04994256888" className="hover:text-gold">04994256888</a>
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-gold"></i>
              <a href="mailto:contact@bindujewellery.co.in" className="hover:text-gold">
                contact@bindujewellery.co.in
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-900 py-4 px-4">
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
      </div>
    </footer>
  )
}

export default Footer