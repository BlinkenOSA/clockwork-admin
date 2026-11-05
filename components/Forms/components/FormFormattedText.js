import 'suneditor/dist/css/suneditor.min.css';
import React from "react";
import style from "./FormFormattedText.module.css";
import dynamic from "next/dynamic";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export const FormFormattedText = ({value, disabled=false, initialValue, ...props}) => {
  const options = {
    buttonList: [
      ['bold', 'underline', 'italic'],
      ['list', 'link'],
      ['outdent', 'indent'],
      ['undo', 'redo'],
      ['removeFormat']
    ],
    defaultStyle: 'font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; ' +
      'font-size: 14px; color: #5c6873;',
    resizingBar : true
  };

  return (
    <div className={`${disabled ? style.FormattedTextAreaDisabled : style.FormattedTextArea}`}>
      <SunEditor
        setContents={value ? value : undefined}
        autoFocus={false}
        showToolbar={!disabled}
        disable={disabled}
        setOptions={options}
        {...props}
      />
    </div>
  )

};
