import React from "react";
import { ProductHeader } from "../../website/components/product/ProductHeader";
import { HotelManagementSystem } from "../../website/components/product/HotelManagementSystem";
import { DirectBookingTechnology } from "../../website/components/product/DirectBookingTechnology";
import { Footer } from "../../website/components/Footer";
import { Nav } from "../../website/components/Nav";

export default function Product() {
  return (
    <div>
      <Nav />
      <ProductHeader />
      <HotelManagementSystem />
      <DirectBookingTechnology />
      <Footer
        titleLocale="App.home.footer.title"
        subtitleLocale="App.home.footer.description"
        buttonLocale="App.common.requestDemo"
      />
    </div>
  );
}
