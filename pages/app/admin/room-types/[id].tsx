import React from "react";
import grey from "@material-ui/core/colors/grey";
import { connect, ConnectedProps } from "react-redux";
import Page from "../../../../app/components/common/Page/Page";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  getRoomType,
  selectors,
} from "../../../../app/slices/adminSlice/roomTypesSlice";
import CardItem from "../../../../app/components/common/CardItem/CardItem";
import { FormattedMessage } from "react-intl";
import RoomTypeDetailsActionMenu from "../../../../app/components/roomTypes/RoomTypeDetailsActionMenu";
import { RootState } from "../../../../app/store";
import { useRouter } from "next/router";
import { ResponsiveImage } from "../../../../app/components/common/ResponsiveImage/ResponsiveImage";
import { FormattedCurrencyLabel } from "../../../../app/components/common/FormattedCurrencyLabel/FormattedCurrencyLabel";
import { selectors as commonSelectors } from "../../../../app/slices/commonSlice";
import { selectors as settingsSelectors } from "../../../../app/slices/adminSlice/settingsSlice";
import { LANGUAGE, CURRENCY } from "../../../../app/interfaces";
import { Amenity } from "../../../../app/components/common/Amenity/Amenity";
import * as imageService from "../../../../app/services/imageService";
import Nav from "../../../../app/components/common/Nav/Nav";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  mainBody: {},
  icon: {
    fontSize: 20,
    color: grey[700],
    marginRight: 12,
  },
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
export type RoomTypeDetailsProps = PropsFromRedux & {};
export function RoomTypeDetails(props: RoomTypeDetailsProps) {
  const classes = useStyles();
  const router = useRouter();
  const roomTypeId: string = router.query.id as string;

  React.useEffect(() => {
    props.getRoomType(roomTypeId);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          titleLocale="App.roomTypes.roomTypeDetails.title"
          backTitleLocale="App.roomTypes.roomTypeDetails.backTitle"
          actions={[
            <RoomTypeDetailsActionMenu key={0} roomType={props.roomType} />,
          ]}
        >
          <Grid container spacing={2} className={classes.mainBody}>
            <Grid item xs={12}>
              <Paper style={{ padding: "20px" }} elevation={0}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={{ fontWeight: 600 }}
                >
                  <FormattedMessage id="App.common.general" />
                </Typography>
                <Grid container spacing={2}>
                  <Grid item sm={4} xs={12}>
                    <CardItem
                      loading={props.loading}
                      label={
                        <FormattedMessage id="App.roomTypes.roomType.name" />
                      }
                      text={props.roomType?.name}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <CardItem
                      loading={props.loading}
                      label={
                        <FormattedMessage id="App.roomTypes.roomType.rate" />
                      }
                      text={
                        <FormattedCurrencyLabel
                          language={props.user?.language as LANGUAGE}
                          amount={props.roomType?.rate as number}
                          currency={props.company?.currency as CURRENCY}
                        />
                      }
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <CardItem
                      loading={props.loading}
                      label={
                        <FormattedMessage id="App.roomTypes.roomType.maxNumberOfGuests" />
                      }
                      text={props.roomType?.maxNumberOfGuests}
                    />
                  </Grid>
                </Grid>
                {props.roomType?.description && (
                  <Grid container spacing={2} style={{ marginTop: 8 }}>
                    <Grid item xs={12}>
                      <CardItem
                        loading={props.loading}
                        label={
                          <FormattedMessage id="App.roomTypes.roomType.description" />
                        }
                        text={props.roomType?.description}
                        style={{ whiteSpace: "pre-line" }}
                      />
                    </Grid>
                  </Grid>
                )}

                {(props.roomType?.images || []).length > 0 && (
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    {(props.roomType?.images || []).map((image) => (
                      <ResponsiveImage
                        src={imageService.getImagePath(image)}
                        width={60}
                        height={60}
                        style={{ marginRight: "10px" }}
                      />
                    ))}
                  </div>
                )}
              </Paper>

              <Paper
                elevation={0}
                style={{ padding: "20px", marginTop: "20px" }}
              >
                {(props.roomType?.amenities || []).filter(
                  (amenity) => amenity.isSelected
                ).length > 0 && (
                  <>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      style={{ fontWeight: 600 }}
                    >
                      <FormattedMessage id="App.common.amenities" />
                    </Typography>
                    <Grid container spacing={0}>
                      {(props.roomType?.amenities || [])
                        .filter((amenity) => amenity.isSelected)
                        .map((amenity) => (
                          <Grid item xs={12} sm={4} style={{ display: "flex" }}>
                            <Amenity amenity={amenity} />
                          </Grid>
                        ))}
                    </Grid>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    loading: selectors.selectLoading(state),
    roomType: selectors.selectRoomType(state),
    user: commonSelectors.selectUser(state),
    company: settingsSelectors.selectCompany(state),
  }),
  { getRoomType }
);
export default connector(RoomTypeDetails);
