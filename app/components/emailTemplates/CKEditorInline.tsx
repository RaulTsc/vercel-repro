import InlineEditor from "@ckeditor/ckeditor5-build-inline";

export const createInlineEditor = (domElement: HTMLElement, onChange: any) => {
  InlineEditor.create(domElement).then((editor: any) => {
    editor.model.document.on("change:data", () => {
      setTimeout(onChange, 100);
    });
  });
};
