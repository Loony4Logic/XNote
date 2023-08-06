"use client"
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
  );

export default function Editor(){
    const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
    return (
      <div>
        <MDEditor value={value} onChange={(value: string|undefined)=>{setValue(value);return}} />
      </div>
    );
  }