import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import React, { useState, useEffect, Component } from "react";
import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";

import "draft-js/dist/Draft.css";


export default function About(props) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <>
      <div>
        {props.title}
     
      </div>
      <CKEditor
      
        name="description"
        onChange={(data) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
      />

      {JSON.stringify(data)}
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: { title: "about" },
  }
}
