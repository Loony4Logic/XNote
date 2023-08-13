"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Editor({
  value,
  setValue,
  syncData,
}: {
  value: string | undefined;
  setValue: Function;
  syncData: Function;
}) {
  return (
    <>
      <div data-color-mode="dark">
        {" "}
        <MDEditor
          value={value}
          onChange={(value: string | undefined) => {
            setValue(value);
            syncData(value);
            return;
          }}
          height={300}
        />
      </div>
    </>
  );
}
