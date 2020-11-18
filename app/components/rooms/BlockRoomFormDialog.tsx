import React from "react";
import { connect, ConnectedProps } from "react-redux";
import FormDialog from "../common/FormDialog/FormDialog";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FormDatePicker from "../common/formFields/FormDatePicker";
import { FormattedMessage } from "react-intl";
import { FormProps } from "react-final-form";
import { RootState } from "../../store";
import { ITimestamps, DateOrString } from "../../interfaces";
import { FieldArray } from "react-final-form-arrays";
import CloseIcon from "@material-ui/icons/Close";

import { biggerThan, smallerThan } from "../../services/validatorsService";

export const BLOCK_ROOM_FORM_DIALOG = "BLOCK_ROOM_FORM_DIALOG";

export interface IRoomBlocking extends ITimestamps {
  id?: string;
  companyId?: string;
  roomId?: string;
  startDate?: DateOrString;
  endDate?: DateOrString;
}

interface IRoomBlockingsProps {
  name: string;
  loading: boolean;
  title?: React.ReactNode;
}
const RoomBlockings = (props: IRoomBlockingsProps) => {
  return (
    <div>
      <Typography
        variant="subtitle2"
        style={{
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        {props.title}
      </Typography>
      <FieldArray name={props.name}>
        {({ fields }) => {
          const formFields = fields.map((name, index) => {
            return (
              <Grid container spacing={2} key={name}>
                <Grid item sm={6} xs={12}>
                  <FormDatePicker
                    fullWidth
                    required
                    minDate={new Date()}
                    disabled={props.loading}
                    name={`${name}.startDate`}
                    variant="inline"
                    label={
                      <FormattedMessage id="App.admin.rooms.blockRooms.startDate" />
                    }
                    validate={[
                      smallerThan(
                        `${name}.endDate`,
                        "App.admin.rooms.blockRooms.startDate.smallerThanEndDate"
                      ),
                    ]}
                  />
                </Grid>
                <Grid item sm={6} xs={12} style={{ display: "flex" }}>
                  <FormDatePicker
                    fullWidth
                    required
                    minDate={new Date()}
                    disabled={props.loading}
                    name={`${name}.endDate`}
                    variant="inline"
                    label={
                      <FormattedMessage id="App.admin.rooms.blockRooms.endDate" />
                    }
                    validate={[
                      biggerThan(
                        `${name}.startDate`,
                        "App.admin.rooms.blockRooms.endDate.biggerThanEndDate"
                      ),
                    ]}
                  />
                  <div>
                    <IconButton onClick={() => fields.remove(index)}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            );
          });

          return (
            <div>
              <div>{formFields}</div>
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <Button
                  fullWidth
                  color="primary"
                  onClick={() => {
                    fields.push({});
                  }}
                >
                  <FormattedMessage id="App.admin.rooms.blockRooms.addBlock" />
                </Button>
              </Grid>
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
};

interface IBlockRoomFormDialogInternalProps extends BlockRoomFormDialogProps {}
const BlockRoomFormDialogInternal = (
  props: IBlockRoomFormDialogInternalProps
) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RoomBlockings loading={props.loading} name="roomBlockings" />
      </Grid>
    </Grid>
  );
};

type PropsFromRedux = ConnectedProps<typeof connector>;
export type BlockRoomFormDialogProps = PropsFromRedux &
  FormProps<any> & {
    loading: boolean;
  };
function _BlockRoomFormDialog(props: BlockRoomFormDialogProps) {
  return (
    <FormDialog<any>
      name={BLOCK_ROOM_FORM_DIALOG}
      title={<FormattedMessage id="App.admin.rooms.blockRoom" />}
      confirmLabel={<FormattedMessage id="App.admin.rooms.blockRooms.edit" />}
      {...props}
    >
      <BlockRoomFormDialogInternal {...props} />
    </FormDialog>
  );
}

const connector = connect((state: RootState) => ({}), {});
export const BlockRoomFormDialog = connector(_BlockRoomFormDialog);
