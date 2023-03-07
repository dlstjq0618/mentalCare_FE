import React, { useState, useEffect, useRef } from "react";
import { RoundedButton } from "~/components";
import { rem } from "polished";
import { Heading, Section } from "~/components";
import LayoutComponent from "~/components/Layout";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";
import TitleInput from "../../../components/Notice/TitleInput";

const Div = styled.div`
  width: ${rem(1050)};
  min-height: 500;
`;

function Register() {
  const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>{console.log("loading...with editor")}</p>,
  });

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ["small", false, "large", "huge"] }, { color: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
    // ImageResize: {
    //   parchment: Quill.import("parchment"),
    // },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    "header",
    "color",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const router = useRouter();
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleOnchange = (content) => {
    console.log("content", content);
  };

  return (
    <LayoutComponent>
      <Section
        css={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Heading
          as="h1"
          css={{
            fontSize: rem(20),
            fontWeight: "bold",
            paddingBottom: rem(20),
          }}
        >
          커뮤니티
        </Heading>
        <TitleInput />
        <Div>
          <QuillNoSSRWrapper // 게시판 라이브러리
            style={{
              background: "white",
            }}
            modules={modules}
            formats={formats}
            onChange={handleOnchange}
            theme="snow"
          />
        </Div>
        <div style={{ width: rem(1055) }}>
          <RoundedButton
            onClick={() => alert("등록 완료")}
            css={{
              marginTop: "2vh",
              background: "#eb541e",
              border: "none",
              color: "white",
              float: "right",
              width: rem(100),
              height: rem(44),
              marginLeft: "8px",
            }}
          >
            등록
          </RoundedButton>
          <RoundedButton
            onClick={() => router.push("/notice")}
            css={{
              marginTop: "2vh",
              background: "#666",
              border: "none",
              color: "white",
              float: "right",
              width: rem(100),
              height: rem(44),
            }}
          >
            목록
          </RoundedButton>
        </div>
      </Section>
    </LayoutComponent>
  );
}

export default Register;
