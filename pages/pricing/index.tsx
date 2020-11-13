import React from "react";
import { PricingHeader } from "../../website/components/pricing/PricingHeader";
import { PricingBody } from "../../website/components/pricing/PricingBody";
import { Footer } from "../../website/components/Footer";
import { Nav } from "../../website/components/Nav";

export default function () {
  return (
    <div>
      <Nav />
      <PricingHeader />
      <PricingBody />
      <Footer
        titleLocale="App.pricing.footer.title"
        buttonLocale="App.company.footer.button"
      />
    </div>
  );
}
