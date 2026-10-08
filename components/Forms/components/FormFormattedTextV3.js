import 'suneditor/dist/css/suneditor.min.css';
import React from "react";
import style from "./FormFormattedTextV3.module.scss";
import rehypeSanitize from "rehype-sanitize";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import * as commands from "@uiw/react-md-editor/commands"

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor/nohighlight").then((mod) => mod.default),
    { ssr: false }
)

export const FormFormattedTextV3 = ({value, disabled=false, initialValue, ...props}) => {
  return (
    <div data-color-mode="light" className={`${disabled ? style.FormattedTextAreaDisabled : style.FormattedTextArea}`}>
        <MDEditor
            minHeight={props.height ? props.height : 100}
            maxHeight={300}
            preview={'edit'}
            value={value}
            enableScroll={true}
            previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
            }}
            commands={[
                commands.bold, commands.italic, commands.strikethrough, commands.divider,
                commands.orderedListCommand, commands.unorderedListCommand, commands.divider,
                commands.link, commands.quote, commands.table
            ]}
            {...props}
        />
    </div>
  )
};
