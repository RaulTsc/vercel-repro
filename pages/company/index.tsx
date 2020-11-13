import React from "react";
import Button from "@material-ui/core/Button";
import { CompanyHeader } from "../../website/components/company/CompanyHeader";
import { Footer } from "../../website/components/Footer";
import { ProblemStart } from "../../website/components/company/ProblemStart";
import { Values } from "../../website/components/company/Values";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { Nav } from "../../website/components/Nav";

const GetStarted = () => (
  <div style={{ textAlign: "center" }}>
    <Link href="/get-started">
      <Button variant="contained" color="primary" style={{ width: "200px" }}>
        <FormattedMessage id="App.common.getStarted" />
      </Button>
    </Link>
  </div>
);

export default function Company() {
  return (
    <div>
      <Nav />
      <CompanyHeader />
      <ProblemStart />
      <GetStarted />
      <Values />
      <Footer
        titleLocale="App.company.footer.title"
        subtitleLocale="App.company.footer.subtitle"
        buttonLocale="App.company.footer.button"
      />
    </div>
  );
}
