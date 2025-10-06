import React from 'react'

const QrBanner = () => {
  return (
<div className="container mx-auto px-4 grid pb-15">
  {/* Desktop & Tablet */}
  <img 
    src="/assets/images/qrcode-banner.png" 
    alt="Bindu qr code" 
    className="w-full hidden sm:block" 
  />
  
  {/* Mobile */}
  <img 
    src="/assets/images/qrcode-banner-mobile.png" 
    alt="Bindu qr code" 
    className="w-full block sm:hidden" 
  />
</div>

  )
}

export default QrBanner