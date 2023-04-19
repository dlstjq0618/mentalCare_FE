import React, { useState, useEffect, useRef, useMemo, useReducer } from "react";
import { RoundedButton } from "~/components";
import { rem } from "polished";
import { Heading, Section } from "~/components";
import LayoutComponent from "~/components/Layout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";
import { Input } from "../../../components";
import dynamic from "next/dynamic";
import { Arricle, Button, Ul, Li } from "../container/Notice";
import { api2 } from "../../../mentalcareapi";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecoveryConfirm,
  selectRecoveryConfirm,
  selectRecovery,
} from "~/store/notificationSlice";

import { selectCounselingInfoData } from "~/store/calendarDetailSlice";
import {
  NOTICE_CONTENT_TYPE,
  NOTICE_CONTENT_TYPE_ADMIN,
} from "~/utils/constants";
import "react-quill/dist/quill.snow.css";

const Div = styled.div`
  width: ${rem(1050)};
  min-height: 500;
`;
function Register() {
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [/*{ size: ["small", false, "large", "huge"] },*/ { color: [] }],
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
      },
      // ImageResize: { modules: ["Resize"] },
      clipboard: {
        matchVisual: false,
      },
    };
  });
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */

  const formats = [
    "header",
    "color",
    "font",
    // "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "image",
    "link",
    "video",
  ];

  const router = useRouter();
  const { id } = router.query;
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [check, setCheck] = useState(false);
  const [type, setType] = useState("일반");
  const [title, setTitle] = useState("");
  const dispatch2 = useDispatch();
  const infoData = useSelector(selectCounselingInfoData);
  const [contentType, setContentType] = useState(2);
  const [content, setContent] = useState("");
  const quillRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const confirm = useSelector(selectRecoveryConfirm);
  const store_contents = useSelector(selectRecovery);

  let ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    return () => {
      dispatch2(setRecoveryConfirm(false));
    };
  }, []);

  const handleSubmit = () => {
    if (confirm) {
      api2.counselor
        .board_put({
          postId: store_contents[0].postId,
          content: content,
          isSecret: false,
          fileUrls: null,
          title: title,
          contentType: Number(contentType),
        })
        .then(() => alert("수정 완료"))
        .then(() => router.push("/notice"));
    } else {
      api2.counselor
        .board({
          title: title,
          content: content,
          isSecret: false,
          contentType: Number(contentType),
          fileUrls: [],
        })
        .then(() => alert("등록 완료"))
        .then(() => router.push("/notice"));
    }
  };

  useEffect(() => {
    if (confirm) {
      setContent(store_contents[0]?.content);
      setTitle(store_contents[0]?.title);
    }
  }, []);
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
                {infoData?.username === "admin"
                  ? NOTICE_CONTENT_TYPE_ADMIN.map((res, index) => {
                      return (
                        <Li
                          style={{ zIndex: 10 }}
                          check
                          onClick={() => {
                            setType(res.label),
                              setCheck(false),
                              setContentType(res.value);
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
                    })
                  : NOTICE_CONTENT_TYPE.map((res, index) => {
                      return (
                        <Li
                          style={{ zIndex: 10 }}
                          check
                          onClick={() => {
                            setType(res.label),
                              setCheck(false),
                              setContentType(res.value);
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
              border: `1px solid #d3d3d3`,
              marginLeft: rem(8),
              borderRadius: "10px",
              paddingLeft: rem(24),
              "&::placeholder": {
                fontSize: rem(14),
              },
            }}
          />
        </Arricle>
        {/* <FileProfileInput2 handleFile={handleProfilePicUpload} /> */}
        <Div style={{ height: 850 }}>
          {ReactQuill && (
            <ReactQuill // 게시판 라이브러리
              style={{
                background: "white",
                height: 800,
              }}
              modules={modules}
              formats={formats}
              ref={quillRef}
              onChange={setContent}
              theme="snow"
              value={content}
              defaultValue={"기본값으로 지정한다."}
            />
          )}
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
            {confirm ? "수정" : "등록"}
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
