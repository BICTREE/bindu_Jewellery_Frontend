"use client";

import Banner from '@/components/common/Banner/Banner';
import React from "react";
import { JSX } from "react/jsx-runtime";

const COMPANY_NAME = "Your Company Name";
const SUPPORT_EMAIL = "support@yourcompany.com";
const SUPPORT_PHONE = "+91 98765 43210";

export default function ReturnPolicyPage(): JSX.Element {
  return (
 <><Banner
          Title="Refund Policy" />
          
          
          <main className=" container mx-auto p-6 sm:p-10 bg-white ">
              <header className="mb-8">
                  <h1 className=" text-gray-900  text-2xl md:text-3xl font-bold  mb-8">Refund Policy</h1>
                  <p className="mt-2 text-sm text-gray-600">Last updated: September 30, 2025</p>
              </header>

              <section className="prose prose-neutral">
                  <p>
                      At <strong>{COMPANY_NAME}</strong>, we want you to be happy with your purchase. If you are
                      not satisfied, we&apos;re here to help — read the terms below carefully so you know what to
                      expect when returning a product.
                  </p>

                  <h2>1. Eligibility for Returns</h2>
                  <ul>
                      <li>Returns are accepted within <strong>30 days</strong> of delivery for most items unless
                          otherwise stated on the product page.</li>
                      <li>To be eligible, items must be unused, in the same condition that you received them, and
                          in the original packaging with all tags and accessories.</li>
                      <li>Personalised or custom-made items, intimate products, and perishable goods are not
                          eligible for return unless they arrive damaged or defective.</li>
                  </ul>

                  <h2>2. How to Start a Return</h2>
                  <ol>
                      <li>Contact our support team at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or
                          call <a href={`tel:${SUPPORT_PHONE}`}>{SUPPORT_PHONE}</a> with your order number and a
                          brief description of the issue.</li>
                      <li>Our support team will issue a Return Merchandise Authorization (RMA) number and provide
                          instructions for shipping the item back.</li>
                      <li>Return labels may be provided by us in case of defect or error on our side. For buyer
                          remorse returns, the customer is typically responsible for return shipping costs.</li>
                  </ol>

                  <h2>3. Inspection and Refunds</h2>
                  <p>
                      Once we receive and inspect the returned item, we will notify you of the status of your
                      refund. If approved, we will process the refund to your original payment method within
                      <strong> 7–14 business days</strong>. Timing for the funds to appear depends on your bank
                      or payment provider.
                  </p>

                  <h2>4. Exchanges</h2>
                  <p>
                      If you need an exchange (for example, size or color), contact support. Exchanges are subject
                      to stock availability. If an item is out of stock, you may choose a refund or store credit.
                  </p>

                  <h2>5. Damaged or Defective Items</h2>
                  <p>
                      If the item you received is defective, damaged, or incorrect, please contact us within
                      <strong> 7 days</strong> of delivery with photos of the issue and we will arrange a return
                      or replacement at no extra cost to you.
                  </p>

                  <h2>6. Non-Returnable Items</h2>
                  <ul>
                      <li>Gift cards</li>
                      <li>Products marked as non-returnable on the product page</li>
                      <li>Items damaged after delivery due to misuse or normal wear</li>
                  </ul>

                  <h2>7. Partial Refunds</h2>
                  <p>
                      Partial refunds may be granted (if applicable) in cases where an item is only partially
                      returned, missing parts, or damaged but still usable.
                  </p>

                  <h2>8. Return Shipping</h2>
                  <p>
                      For returns not due to our error, customers are responsible for return shipping. We
                      recommend using a trackable shipping service or purchasing shipping insurance. We are not
                      responsible for items lost during return shipment unless a return label provided by us is
                      used.
                  </p>

                  <h2>9. International Returns</h2>
                  <p>
                      For international orders, customs fees, import duties, and taxes are non-refundable and the
                      customer is responsible for any charges incurred during return shipping unless otherwise
                      stated.
                  </p>

                  <h2>10. Privacy & Data</h2>
                  <p>
                      When processing returns and refunds we may use the order information required to validate
                      eligibility. For questions about how we handle personal data, see our Privacy Policy or
                      contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
                  </p>

                  <h2>Contact Us</h2>
                  <p>
                      If you have questions about this Return & Refund Policy, contact us:
                  </p>
                  <ul>
                      <li>Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
                      <li>Phone: <a href={`tel:${SUPPORT_PHONE}`}>{SUPPORT_PHONE}</a></li>
                  </ul>

                  <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-semibold">Quick FAQ</h3>
                      <dl className="mt-3">
                          <h2 className="font-bold">How long do I have to return an item?</h2>
                          <dd className="mb-2">30 days from delivery for most items.</dd>

                          <h2 className="font-bold">When will I receive my refund?</h2>
                          <dd className="mb-2">Refunds are processed within 7–14 business days after we accept the
                              return.</dd>

                          <h2 className="font-bold">Who pays for return shipping?</h2>
                          <dd className="mb-2">Customers pay for return shipping unless the return is due to our
                              error or a defective product.</dd>
                      </dl>
                  </div>
              </section>

              {/* <footer className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <span className="text-sm text-gray-600">© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</span>
      <div className="flex gap-3">
        <button
          onClick={() => window.print()}
          className="inline-block px-4 py-2 border rounded-lg text-sm font-medium hover:shadow">
          Print
        </button>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-block px-4 py-2 bg-[#d4b262] text-white rounded-lg text-sm font-medium hover:opacity-95">
          Contact Support
        </a>
      </div>
    </footer> */}
          </main></>
  );
}
