import React from "react";
import { connect, ConnectedProps } from "react-redux";
import FormDialog from "../common/FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";
import { FormProps } from "react-final-form";
import { RootState } from "../../store";

import { FormUploadField } from "../common/formFields/FormUploadField";
import { IFile } from "@raultom/react-file-upload/lib/interfaces";

export const EDIT_COMPANY_IMAGES_FORM_DIALOG =
  "EDIT_COMPANY_IMAGES_FORM_DIALOG";

export const mapPayloadToApi = ({ logo, images }: any) => {
  let finalLogo =
    Array.isArray(logo) && logo.length === 1
      ? logo[0]
      : Array.isArray(logo) && logo.length === 0
      ? null
      : logo;

  return { images, logo: finalLogo };
};

type PropsFromRedux = ConnectedProps<typeof connector>;
interface IFormData {
  logo?: IFile | null;
  images?: IFile[];
}
export type EditCompanyImagesFormDialogProps = PropsFromRedux &
  FormProps<IFormData> & {
    loading: boolean;
  };
export const _EditCompanyImagesFormDialog = (
  props: EditCompanyImagesFormDialogProps
) => {
  return (
    <FormDialog<IFormData>
      name={EDIT_COMPANY_IMAGES_FORM_DIALOG}
      title={<FormattedMessage id="App.settings.company.editImages" />}
      confirmLabel={<FormattedMessage id="App.common.edit" />}
      {...props}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" style={{ marginBottom: 8 }}>
            <FormattedMessage id="App.common.logo" />
          </Typography>
          <FormUploadField
            maxNumberOfItems={1}
            name="logo"
            fileType="image/*"
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 16 }}>
          <Typography variant="subtitle2" style={{ marginBottom: 8 }}>
            <FormattedMessage id="App.common.images" />
          </Typography>
          <FormUploadField name="images" fileType="image/*" />
        </Grid>
      </Grid>
    </FormDialog>
  );
};

const connector = connect((state: RootState) => ({}), {});
export const EditCompanyImagesFormDialog = connector(
  _EditCompanyImagesFormDialog
);
