import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Page from "../common/Page/Page";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { RootState } from "../..//store";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { IEmailTemplate, EMAIL_TYPE, LANGUAGE } from "../../interfaces";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { ExecuteOnce } from "@raultom/common-helpers/lib/helpers/ExecuteOnce";
import {
  toggleSnackbar,
  selectors as commonSelectors,
} from "../../slices/commonSlice";

import {
  selectors as emailTemplatesSelectors,
  getEmailTemplate,
  sendTestEmail,
  updateEmailTemplate,
  publishEmailTemplate,
} from "../../slices/adminSlice/emailTemplatesSlice";
import { MjmlEditor } from "./MjmlEditor";
import { emailTemplateDetails } from "../../helpers/navigation";
import Nav from "../common/Nav/Nav";
import SideMenu from "../common/SideMenu/SideMenu";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: 8,
  },
}));

const executeOnce = new ExecuteOnce();
const AUTOSAVE_INTERVAL = 2500;

type PropsFromRedux = ConnectedProps<typeof connector>;
export type IEmailTemplateDetailsProps = PropsFromRedux & {};
export function _EmailTemplateDetails(props: IEmailTemplateDetailsProps) {
  const router = useRouter();
  const language: LANGUAGE = router.query.language as any;
  const emailType: EMAIL_TYPE = router.query.type as any;
  const [index, setIndex] = React.useState(language === LANGUAGE.EN_US ? 0 : 1);
  const [subject, setSubject] = React.useState(props.emailTemplate?.subject);
  const [templateMjml, setTemplateMjml] = React.useState(
    props.emailTemplate?.mjml
  );
  const classes = useStyles();

  const getEmailTemplate = async () => {
    const emailTemplate = await props.getEmailTemplate({
      type: emailType,
      language,
    });
    if (emailTemplate?.subject) {
      setSubject(emailTemplate.subject);
    }
  };

  React.useEffect(() => {
    getEmailTemplate();
    // eslint-disable-next-line
  }, [language]);

  React.useEffect(() => {
    executeOnce.execute(async () => {
      if (
        props.emailTemplate?.type &&
        props.emailTemplate?.language &&
        subject !== props.emailTemplate?.subject
      ) {
        await props.updateEmailTemplate({
          type: props.emailTemplate?.type,
          language: props.emailTemplate?.language,
          subject,
        });
        await props.getEmailTemplate({ type: emailType, language });
      }
    }, AUTOSAVE_INTERVAL);
    // eslint-disable-next-line
  }, [subject]);

  React.useEffect(() => {
    executeOnce.execute(async () => {
      if (
        props.emailTemplate?.type &&
        props.emailTemplate?.language &&
        templateMjml !== props.emailTemplate?.mjml
      ) {
        await props.updateEmailTemplate({
          type: props.emailTemplate?.type,
          language: props.emailTemplate?.language,
          mjml: templateMjml,
        });
        await props.getEmailTemplate({ type: emailType, language });
      }
    }, AUTOSAVE_INTERVAL);
    // eslint-disable-next-line
  }, [templateMjml]);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex" }}>
        <SideMenu />
        <Page
          backTitleLocale="App.admin.emailTemplates.details.backTitle"
          title={
            <Typography variant="h6">
              {props.emailTemplate?.type && (
                <FormattedMessage
                  id={`App.admin.emailTemplates.${props.emailTemplate?.type}`}
                />
              )}
            </Typography>
          }
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Paper elevation={0}>
              <Tabs
                value={index}
                indicatorColor="primary"
                textColor="primary"
                onChange={(_, newIndex) => {
                  if (newIndex !== index) {
                    setIndex(newIndex);
                    router.replace(
                      emailTemplateDetails({
                        type: props.emailTemplate?.type as EMAIL_TYPE,
                        language:
                          newIndex === 0 ? LANGUAGE.EN_US : LANGUAGE.RO_RO,
                      })
                    );
                  }
                }}
              >
                <Tab
                  label={
                    <div style={{ display: "flex" }}>
                      {props.emailTemplate?.language === LANGUAGE.EN_US &&
                        props.emailTemplate?.isPublished && (
                          <Tooltip
                            title={
                              <FormattedMessage id="App.admin.emailTemplates.details.publishedTooltip" />
                            }
                          >
                            <CheckIcon className={classes.icon} />
                          </Tooltip>
                        )}
                      <FormattedMessage
                        id={`App.common.languages.${LANGUAGE.EN_US}`}
                      />
                    </div>
                  }
                />
                <Tab
                  label={
                    <div style={{ display: "flex" }}>
                      {props.emailTemplate?.language === LANGUAGE.RO_RO &&
                        props.emailTemplate?.isPublished && (
                          <Tooltip
                            title={
                              <FormattedMessage id="App.admin.emailTemplates.details.publishedTooltip" />
                            }
                          >
                            <CheckIcon className={classes.icon} />
                          </Tooltip>
                        )}
                      <FormattedMessage
                        id={`App.common.languages.${LANGUAGE.RO_RO}`}
                      />
                    </div>
                  }
                />
              </Tabs>
            </Paper>
            <div>
              <Button
                color="secondary"
                variant="outlined"
                disabled={props.loading}
                onClick={async () => {
                  await props.sendTestEmail(
                    props.emailTemplate as IEmailTemplate
                  );
                  props.toggleSnackbar({
                    isOpen: true,
                    messageLocale:
                      "App.admin.emailTemplates.sendTestEmail.success",
                    messageValues: { email: props.user?.email },
                    severity: "success",
                  });
                }}
              >
                <FormattedMessage id="App.admin.emailTemplates.sendTestEmail" />
              </Button>
              <Button
                color="primary"
                variant="contained"
                disabled={props.loading || props.emailTemplate?.isPublished}
                style={{ marginLeft: 16 }}
                onClick={async () => {
                  await props.publishEmailTemplate(
                    props.emailTemplate as IEmailTemplate
                  );
                  await props.getEmailTemplate({
                    type: props.emailTemplate?.type as EMAIL_TYPE,
                    language: props.emailTemplate?.language as LANGUAGE,
                  });
                  props.toggleSnackbar({
                    isOpen: true,
                    messageLocale:
                      "App.admin.emailTemplates.publishEmailTemplate.success",
                    severity: "success",
                  });
                }}
              >
                <FormattedMessage id="App.admin.emailTemplates.publish" />
              </Button>
            </div>
          </div>
          <Paper elevation={0} style={{ marginTop: "20px", padding: "20px" }}>
            <TextField
              fullWidth
              value={subject}
              label={<FormattedMessage id="App.admin.emailTemplates.subject" />}
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
          </Paper>
          <Paper
            elevation={0}
            style={{ marginTop: "20px", padding: "20px 20px 60px 20px" }}
          >
            {props.emailTemplate?.mjmlHtml && (
              <MjmlEditor
                mjml={props.emailTemplate.mjml}
                mjmlHtml={props.emailTemplate.mjmlHtml}
                onChange={(mjml: string) => {
                  setTemplateMjml(mjml);
                }}
              />
            )}
          </Paper>
        </Page>
      </div>
    </div>
  );
}

const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
    loading: emailTemplatesSelectors.selectLoading(state),
    emailTemplate: emailTemplatesSelectors.selectEmailTemplate(state),
  }),
  {
    getEmailTemplate,
    updateEmailTemplate,
    sendTestEmail,
    toggleSnackbar,
    publishEmailTemplate,
  }
);
const EmailTemplateDetails = connector(_EmailTemplateDetails);

export default EmailTemplateDetails;
