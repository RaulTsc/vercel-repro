import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Page from "../../../../app/components/common/Page/Page";
import ResponsiveTable from "../../../../app/components/common/ResponsiveTable/ResponsiveTable";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ListItemText from "@material-ui/core/ListItemText";
import { RootState } from "../../../../app/store";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import {
  ITimestamps,
  LANGUAGE,
  IEmailTemplate,
} from "../../../../app/interfaces";
import { emailTemplateDetails } from "../../../../app/helpers/navigation";
import { makeStyles } from "@material-ui/core/styles";
import {
  getEmailTemplates,
  selectors as emailTemplatesSelectors,
} from "../../../../app/slices/adminSlice/emailTemplatesSlice";
import { selectors as commonSelectors } from "../../../../app/slices/commonSlice";
import FormattedDateLabel from "../../../../app/components/common/FormattedDateLabel/FormattedDateLabel";
import Nav from "../../../../app/components/common/Nav/Nav";
import SideMenu from "../../../../app/components/common/SideMenu/SideMenu";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    cursor: "pointer",
  },
}));

type PropsFromRedux = ConnectedProps<typeof connector>;
export type IEmailTemplatesProps = PropsFromRedux & {};
export function _EmailTemplates(props: IEmailTemplatesProps) {
  const history = useRouter();
  const classes = useStyles();
  React.useEffect(() => {
    props.getEmailTemplates();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page titleLocale="App.emailTemplates.title">
          {props.emailTemplates.length > 0 && (
            <Paper elevation={0}>
              <ResponsiveTable
                listItems={props.emailTemplates}
                tableHeaderCells={[
                  <TableCell key={0}>
                    <FormattedMessage id="App.common.name" />
                  </TableCell>,
                  <TableCell key={1}>
                    <FormattedMessage id="App.admin.emailTemplates.lastUpdatedAt" />
                  </TableCell>,
                ]}
                renderDesktopRow={(row: IEmailTemplate) => (
                  <TableRow
                    hover
                    key={row.id}
                    className={classes.tableRow}
                    onClick={() =>
                      history.push(
                        emailTemplateDetails({
                          type: row.type,
                          language: row.language,
                        })
                      )
                    }
                  >
                    <TableCell component="th" scope="row">
                      <FormattedMessage
                        id={`App.admin.emailTemplates.type.${row.type}`}
                      />
                    </TableCell>
                    <TableCell>
                      <FormattedDateLabel date={row.updatedAt} />
                    </TableCell>
                  </TableRow>
                )}
                renderMobileRow={(row: IEmailTemplate) => (
                  <ListItem
                    button
                    key={row.id}
                    alignItems="flex-start"
                    onClick={() =>
                      history.push(
                        emailTemplateDetails({
                          type: row.type,
                          language: row.language,
                        })
                      )
                    }
                  >
                    <ListItemText
                      primary={row.type}
                      secondary={row.updatedAt}
                    />
                  </ListItem>
                )}
              />
            </Paper>
          )}
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
    emailTemplates: emailTemplatesSelectors.selectEmailTemplates(state),
  }),
  { getEmailTemplates }
);
export default connector(_EmailTemplates);
