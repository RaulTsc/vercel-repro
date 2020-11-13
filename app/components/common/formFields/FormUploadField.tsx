import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Field } from "react-final-form";
import {
  FileUpload,
  IFileUploadProps,
} from "@raultom/react-file-upload/lib/components/FileUpload/FileUpload";
import { RootState } from "../../../store";

import { uploadFile } from "../../../slices/commonSlice";
import { FormattedMessage } from "react-intl";

type PropsFromRedux = ConnectedProps<typeof connector>;
export type IFormUploadFieldProps = PropsFromRedux &
  IFileUploadProps & {
    /**
     * Trigger change before component unmounts. This is dangerous and should be used with forms that don't destroy on unmount.
     */
    triggerChangeOnUnmount?: boolean;
    input?: any;
    meta?: any;
  };
const FormUploadFieldComponent = (props: IFormUploadFieldProps) => {
  const {
    input: { value, name },
    meta: { touched, error },
    files,
    ...restProps
  } = props;

  const initialFiles = files || value || [];
  // sometimes it's bound to an object
  const finalInitialValue = Array.isArray(initialFiles)
    ? initialFiles
    : [initialFiles];

  const baseResourcePath = "images";

  return (
    <FileUpload
      {...restProps}
      name={name}
      files={finalInitialValue}
      error={touched && error}
      hintText={<FormattedMessage id="App.common.upload.uploadFiles" />}
      onChange={(_ev, allFiles) => {
        const { onChange } = props.input;
        onChange(allFiles);
      }}
      onComponentUnmounted={(allFiles) => {
        if (props.triggerChangeOnUnmount) {
          const { onChange } = props.input;
          onChange(allFiles);
        }

        if (props.onComponentUnmounted) {
          props.onComponentUnmounted(allFiles);
        }
      }}
      fileMapper={async (file) => {
        const result = await props.uploadFile(file, {
          baseResourcePath,
        });
        return result;
      }}
    />
  );
};

export const _FormUploadField: React.SFC<IFormUploadFieldProps> = (
  props: any
) => {
  return <Field {...props} component={FormUploadFieldComponent} />;
};

const connector = connect((state: RootState) => ({}), { uploadFile });
export const FormUploadField = connector(_FormUploadField);
