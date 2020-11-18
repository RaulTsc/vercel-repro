import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Page from "../../../../app/components/common/Page/Page";
import CardItem from "../../../../app/components/common/CardItem/CardItem";
import { RootState } from "../../../../app/store";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  getCompanyInformation,
  updateCompanyInformation,
  getCurrentPartner,
  updateCurrentPartner,
  createCompany,
  selectors as settingsSelectors,
} from "../../../../app/slices/adminSlice/settingsSlice";
import { getFullAddress } from "../../../../app/services/commonService";

import { toggleDialogByName } from "../../../../app/slices/componentsSlice";
import {
  EditCompanyFormDialog,
  EDIT_COMPANY_FORM_DIALOG,
} from "../../../../app/components/settings/EditCompanyFormDialog";
import { formatDate, DATE_FORMATS } from "@raultom/common-helpers/lib/helpers";
import { ResponsiveImage } from "../../../../app/components/common/ResponsiveImage/ResponsiveImage";
import {
  EditCompanyImagesFormDialog,
  EDIT_COMPANY_IMAGES_FORM_DIALOG,
  mapPayloadToApi,
} from "../../../../app/components/settings/EditCompanyImagesFormDialog";
import * as imageService from "../../../../app/services/imageService";
import ResponsiveTable from "../../../../app/components/common/ResponsiveTable/ResponsiveTable";
import { selectors as commonSelectors } from "../../../../app/slices/commonSlice";
import { ICompany } from "../../../../app/interfaces";
import { SuperAdminScoped } from "../../../../app/components/common/UserScoped/UserScoped";
import {
  AddCompanyFormDialog,
  ADD_COMPANY_FORM_DIALOG,
} from "../../../../app/components/settings/AddCompanyFormDialog";
import Nav from "../../../../app/components/common/Nav/Nav";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";

type PropsFromRedux = ConnectedProps<typeof connector>;
export type ISettingsProps = PropsFromRedux & {};
export function _Settings(props: ISettingsProps) {
  React.useEffect(() => {
    props.getCompanyInformation();
    props.getCurrentPartner();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page titleLocale="App.settings.title">
          <Paper
            elevation={0}
            style={{ position: "relative", padding: "20px" }}
          >
            <Grid container spacing={2}>
              <Grid item sm={4} xs={12}>
                <CardItem
                  loading={props.loading}
                  label={<FormattedMessage id="App.settings.companyName" />}
                  text={props.company?.name}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <CardItem
                  loading={props.loading}
                  label={<FormattedMessage id="App.common.currency" />}
                  text={props.company?.currency}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <CardItem
                  loading={props.loading}
                  label={<FormattedMessage id="App.settings.stars" />}
                  text={props.company?.stars}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <CardItem
                  loading={props.loading}
                  label={<FormattedMessage id="App.settings.address" />}
                  text={getFullAddress(props.company?.address)}
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: -8, marginTop: 16 }}>
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  <FormattedMessage id="App.settings.company.bookings" />
                </Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CardItem
                  loading={props.loading}
                  label={<FormattedMessage id="App.settings.checkoutTime" />}
                  text={formatDate({
                    date: props.company?.bookings?.checkout?.startTime,
                    format: DATE_FORMATS.h_mm_a,
                  })}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <CardItem
                  loading={props.loading}
                  label={<FormattedMessage id="App.settings.checkinTime" />}
                  text={formatDate({
                    date: props.company?.bookings?.checkin?.startTime,
                    format: DATE_FORMATS.h_mm_a,
                  })}
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: -8, marginTop: 16 }}>
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                  <FormattedMessage id="App.settings.company.google" />
                </Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CardItem
                  loading={props.loading}
                  label={
                    <FormattedMessage id="App.settings.company.google.name" />
                  }
                  text={props.company?.google?.name}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <CardItem
                  loading={props.loading}
                  label={
                    <FormattedMessage id="App.settings.company.google.mapsId" />
                  }
                  text={props.company?.google?.mapsId}
                />
              </Grid>
            </Grid>
            <Button
              color="primary"
              disabled={props.loading}
              style={{ position: "absolute", right: 8, bottom: 8 }}
              onClick={() => {
                props.toggleDialogByName({
                  name: EDIT_COMPANY_FORM_DIALOG,
                  isOpen: true,
                });
              }}
            >
              <FormattedMessage id="App.common.edit" />
            </Button>
          </Paper>

          <Paper
            elevation={0}
            style={{ marginTop: "20px", padding: "20px", position: "relative" }}
          >
            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
              <FormattedMessage id="App.common.logo" />
            </Typography>
            <img
              style={{ marginTop: 8 }}
              alt="Company logo"
              src={imageService.getImagePath(props.partner?.themeData?.logo)}
              height={60}
            />
            <Typography
              variant="subtitle1"
              style={{ marginTop: "16px", fontWeight: 600 }}
            >
              <FormattedMessage id="App.common.images" />
            </Typography>
            <Grid container spacing={2} style={{ marginTop: "0px" }}>
              {(props.company?.images || []).map((image) => (
                <Grid item xs={2}>
                  <ResponsiveImage
                    src={imageService.getImagePath(image)}
                    width="100%"
                    height={80}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              color="primary"
              disabled={props.loading}
              style={{ position: "absolute", right: 8, bottom: 8 }}
              onClick={() =>
                props.toggleDialogByName({
                  name: EDIT_COMPANY_IMAGES_FORM_DIALOG,
                  isOpen: true,
                })
              }
            >
              <FormattedMessage id="App.common.edit" />
            </Button>
          </Paper>

          <SuperAdminScoped>
            <Paper elevation={0} style={{ padding: "20px", marginTop: "20px" }}>
              <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                <FormattedMessage id="App.settings.companies.title" />
              </Typography>
              <ResponsiveTable
                listItems={props.user?.companies as ICompany[]}
                tableHeaderCells={[
                  <TableCell key={0} style={{ paddingLeft: "0px" }}>
                    <FormattedMessage id="App.common.name" />
                  </TableCell>,
                  <TableCell key={1} align="right">
                    <div style={{ position: "relative" }}>
                      <Fab
                        color="primary"
                        aria-label="add"
                        size="small"
                        style={{
                          position: "absolute",
                          right: "0px",
                          top: "-24px",
                        }}
                        onClick={() => {
                          props.toggleDialogByName({
                            name: ADD_COMPANY_FORM_DIALOG,
                            isOpen: true,
                          });
                        }}
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                  </TableCell>,
                ]}
                renderDesktopRow={(row: ICompany) => (
                  <TableRow key={row.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ paddingLeft: "0px" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      <div style={{ position: "relative" }}>
                        <IconButton
                          disabled={row.isDefault}
                          style={{
                            position: "absolute",
                            right: "-4px",
                            top: "-24px",
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                renderMobileRow={(row: ICompany) => (
                  <ListItem key={row.id} alignItems="flex-start">
                    <ListItemText primary={row.name} />
                  </ListItem>
                )}
              />
            </Paper>
          </SuperAdminScoped>

          <AddCompanyFormDialog
            loading={props.loading}
            onSubmit={async (company) => {
              await props.createCompany(company);
              props.toggleDialogByName({
                name: ADD_COMPANY_FORM_DIALOG,
                isOpen: false,
              });
            }}
          />

          {props.company && (
            <EditCompanyFormDialog
              initialValues={props.company}
              loading={props.loading}
              onSubmit={async (company) => {
                await props.updateCompanyInformation(company);
                await props.getCompanyInformation();
                props.toggleDialogByName({
                  name: EDIT_COMPANY_FORM_DIALOG,
                  isOpen: false,
                });
              }}
            />
          )}

          {props.company && (
            <EditCompanyImagesFormDialog
              initialValues={{
                logo: props.partner?.themeData?.logo,
                images: props.company.images,
              }}
              loading={props.loading}
              onSubmit={async (payload) => {
                await props.updateCompanyInformation({
                  images: mapPayloadToApi(payload).images,
                });
                await props.updateCurrentPartner({
                  themeData: {
                    logo: mapPayloadToApi(payload).logo,
                  },
                });
                await props.getCompanyInformation();
                await props.getCurrentPartner();
                props.toggleDialogByName({
                  name: EDIT_COMPANY_IMAGES_FORM_DIALOG,
                  isOpen: false,
                });
              }}
            />
          )}
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    loading: settingsSelectors.selectLoading(state),
    company: settingsSelectors.selectCompany(state),
    partner: settingsSelectors.selectPartner(state),
    user: commonSelectors.selectUser(state),
  }),
  {
    getCompanyInformation,
    updateCompanyInformation,
    toggleDialogByName,
    getCurrentPartner,
    updateCurrentPartner,
    createCompany,
  }
);
const Settings = connector(_Settings);

export default Settings;
