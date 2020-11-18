import React from "react";
import NoSsr from "../../../../app/components/common/NoSsr/NoSsr";

import dynamic from "next/dynamic";

const EmailTemplateDetailsPage = dynamic(
  () =>
    import(
      "../../../../app/components/emailTemplates/EmailTemplateDetailsPage"
    ),
  {
    ssr: false,
  }
);

const EmailTemplateDetails = (props: any) => {
  return (
    <NoSsr>
      <EmailTemplateDetailsPage {...props} />
    </NoSsr>
  );
};

export default EmailTemplateDetails;
