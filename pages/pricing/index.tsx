import React from "react";
import { PricingHeader } from "./components/PricingHeader";
import { PricingBody } from "./components/PricingBody";
import { Footer } from "../../components/Footer";
import { Nav } from "../../components/Nav";

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
