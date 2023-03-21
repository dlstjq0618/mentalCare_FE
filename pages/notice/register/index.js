import React, { useState, useEffect, useRef } from "react";
import { RoundedButton } from "~/components";
import { rem } from "polished";
import { Heading, Section } from "~/components";
import LayoutComponent from "~/components/Layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import styled, { css } from "styled-components";
import { Input } from "~/components";
import dynamic from "next/dynamic";
import TitleInput from "../../../components/Notice/TitleInput";
import { Arricle, Button, Ul, Li } from "../container/Notice";
import { api, api2 } from "../../../mentalcareapi";
import { useDispatch, useSelector } from "react-redux";
import { setHtmlFiles, selectHtmlFiles } from "~/store/calendarDetailSlice";
import "react-quill/dist/quill.snow.css";

const Div = styled.div`
  width: ${rem(1050)};
  min-height: 500;
`;

function Register() {
  const Quill = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
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
  const [check, setCheck] = useState(false);
  const [type, setType] = useState("카테고리");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const contents = useSelector(selectHtmlFiles);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleChange = (content) => {
    dispatch(setHtmlFiles(content));
  };

  const handleSubmit = () => {
    console.log("html 데이터 전송");
    console.log("content", contents);
    api2.counselor
      .board({
        title: title,
        content: contents,
        isSecret: false,
        contentData: 0,
        fileUrls: [],
      })
      .then((res) => console.log("res", res));
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
        <Arricle style={{ justifyContent: "flex-start", marginBottom: 10 }}>
          <div>
            <Button select onClick={() => setCheck(!check)}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {type}
              </div>
              <KeyboardArrowDownIcon />
            </Button>
            {check && (
              <Ul style={{ zIndex: 10, position: "fixed" }}>
                {NOTICE_FILTER.map((res, index) => {
                  return (
                    <Li
                      style={{ zIndex: 10 }}
                      check
                      onClick={() => {
                        setType(res.label), setCheck(false);
                      }}
                      key={index}
                      value={res.value}
                    >
                      {res.label}
                      {type === res.label ? (
                        <CheckIcon style={{ color: "#eb541e" }} />
                      ) : (
                        <CheckIcon style={{ color: "#fff" }} />
                      )}
                    </Li>
                  );
                })}
              </Ul>
            )}
          </div>
          <Input
            value={title}
            placeholder="제목을 입력해주세요."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            css={{
              width: "100%",
              marginLeft: rem(8),
              borderRadius: "10px",
              paddingLeft: rem(24),
              "&::placeholder": {
                fontSize: rem(14),
              },
            }}
          />
        </Arricle>
        <Div>
          <Quill // 게시판 라이브러리
            style={{
              background: "white",
            }}
            modules={modules}
            formats={formats}
            onChange={(e) => {
              handleChange(e);
            }}
            theme="snow"
          />
        </Div>
        <div style={{ width: rem(1055) }}>
          <RoundedButton
            onClick={() => {
              handleSubmit();
            }}
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
