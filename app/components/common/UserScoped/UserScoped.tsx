import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { selectors as commonSelectors } from "../../../slices/commonSlice";
import { RootState } from "../../../store";

export enum USER_SCOPE_GROUPS {
  SUPER_ADMIN = "superadmin_all",
  COMPANY_ADMIN = "company_admin",
  COMPANY_USER = "company_user",
  COMPANY_PORTFOLIO_ALL = "company_portfolio_all",
  COMPANY_CONTRACTING_EDIT_CONTRACT = "company_contracting_edit_contract",
  MESSAGE_TEMPLATES_ALL = "message_templates_all",
  EMAIL_TEMPLATES_ALL = "email_templates_all",
}

export const userContainsRequiredScopes = (
  user: any = {},
  ...requiredScopes: USER_SCOPE_GROUPS[]
) => {
  const userScopes: string[] = (
    (user && user.tokenInfo && user.tokenInfo.scope) ||
    []
  )
    .filter((scope: string) => !!scope)
    .map((scope: string) => scope.toLowerCase());

  if (!requiredScopes || !requiredScopes.length) {
    return true;
  }

  const hasSuperAdmin = userScopes.some(
    (scope) => scope === USER_SCOPE_GROUPS.SUPER_ADMIN
  );
  if (hasSuperAdmin) {
    return true;
  }

  const hasRequiredScopes = requiredScopes.every(
    (elem) => userScopes.indexOf(elem) > -1
  );
  return hasRequiredScopes;
};

type PropsFromRedux = ConnectedProps<typeof connector>;
type IUserScopedContainerProps = PropsFromRedux & {
  children?: React.ReactNode;
  requiredScopes: USER_SCOPE_GROUPS[];
};
export const _UserScoped = (props: IUserScopedContainerProps) => {
  const { user, children, requiredScopes } = props;
  const hasRequiredScopes = userContainsRequiredScopes(user, ...requiredScopes);

  if (!hasRequiredScopes) {
    return null;
  }

  return <>{children}</>;
};

export interface IUserScopedProps {
  children?: any;
}
const connector = connect(
  (state: RootState) => ({
    user: commonSelectors.selectUser(state),
  }),
  {}
);
export const UserScoped = connector(_UserScoped);

export const CompanyUserScoped = ({ children }: IUserScopedProps) => (
  <UserScoped requiredScopes={[USER_SCOPE_GROUPS.COMPANY_USER]}>
    {children}
  </UserScoped>
);

export const CompanyAdminScoped = ({ children }: IUserScopedProps) => (
  <UserScoped requiredScopes={[USER_SCOPE_GROUPS.COMPANY_ADMIN]}>
    {children}
  </UserScoped>
);

export const SuperAdminScoped = ({ children }: IUserScopedProps) => (
  <UserScoped requiredScopes={[USER_SCOPE_GROUPS.SUPER_ADMIN]}>
    {children}
  </UserScoped>
);
