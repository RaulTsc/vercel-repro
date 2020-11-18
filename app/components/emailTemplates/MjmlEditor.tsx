import * as React from "react";
import jQuery from "jquery";
import { createInlineEditor } from "./CKEditorInline";

export interface IMjmlEditorProps {
  mjml?: string;
  mjmlPlaceholder?: string;
  mjmlHtml?: string;
  onChange?: (mjml: string) => void;
}
export const MjmlEditor: React.FC<IMjmlEditorProps> = (
  props: IMjmlEditorProps
) => {
  React.useEffect(() => {
    const onEditorChange = () => {
      const editableContainers = document.querySelectorAll(
        "div[contenteditable='true']"
      ) as any;
      const nodes = jQuery(`<div>${props.mjml || props.mjmlPlaceholder}</div>`);

      for (let i = 0; i < editableContainers.length; i++) {
        nodes
          .find("mj-raw")
          .children()
          .eq(i)
          .html(editableContainers[i].innerHTML);
      }

      const newMjml: string = nodes.html();

      if (props.onChange) {
        props.onChange(newMjml);
      }
    };

    const editableContainers1 = document.querySelectorAll(
      "div[contenteditable='true']"
    ) as any;

    for (const editableContainer of editableContainers1) {
      createInlineEditor(editableContainer, onEditorChange);
    }
    // eslint-disable-next-line
  }, [props.mjmlHtml]);

  const createMarkup: any = () => {
    return { __html: props.mjmlHtml };
  };

  return <div id="mjmlEditor" dangerouslySetInnerHTML={createMarkup()} />;
};
