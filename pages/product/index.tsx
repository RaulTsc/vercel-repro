import React from "react";
import { ProductHeader } from "../../components/product/ProductHeader";
import { HotelManagementSystem } from "../../components/product/HotelManagementSystem";
import { DirectBookingTechnology } from "../../components/product/DirectBookingTechnology";
import { Footer } from "../../components/Footer";
import { Nav } from "../../components/Nav";

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
