import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { rem } from "polished";


interface ICheckProps {
  status?: boolean;
  day?: string;
}

export default function CheckboxLabels(props: ICheckProps) {
  const [checkState, setCheckState] = useState("null");

  const handleCheckStateStart = () => {
    setCheckState("start")
  }
  const handleCheckStateNone = () => {
    setCheckState("none")
  }
  const handleCheckStateWeek = () => {
    setCheckState("week")
  }

  return (
    <>
      {
        props.day === "weekEnd" ?
          <>
            <FormGroup style={{ width: "100%" }} onClick={handleCheckStateStart} >
              <FormControlLabel
                style={checkState === "start" ?
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#ffede7",
                    borderRadius: 10,
                    color: "#e73e11",
                    fontWeight: "bold",
                    padding: "17px 28px"
                  }
                  :
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#f7f7f7",
                    borderRadius: 10,
                    color: " #666666",
                    padding: "17px 28px"
                  }}
                labelPlacement="start"
                label={<span style={{ fontWeight: "bold" }}>{"주중만 점심시간이 있어요."}</span>}
                control={<></>}
              />
            </FormGroup>
            <FormGroup style={{ width: "100%", marginTop: "2vh" }} onClick={handleCheckStateWeek} >
              <FormControlLabel
                style={checkState === "week" ?
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#ffede7",
                    borderRadius: 10,
                    color: "#e73e11",
                    fontWeight: "bold",
                    padding: "17px 28px"
                  }
                  :
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#f7f7f7",
                    borderRadius: 10,
                    color: "#666666",
                    padding: "17px 28px"
                  }}
                labelPlacement="start"
                label={<span style={{ fontWeight: "bold" }}>{"주말에도 점심시간이 있어요."}</span>}
                control={<></>}
              />
            </FormGroup>
            <FormGroup style={{ width: "100%", marginTop: "2vh" }} onClick={handleCheckStateNone} >
              <FormControlLabel
                style={checkState === "none" ?
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#ffede7",
                    borderRadius: 10,
                    color: "#e73e11",
                    fontWeight: "bold",
                    padding: "17px 28px"
                  }
                  :
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#f7f7f7",
                    borderRadius: 10,
                    color: " #666666",
                    padding: "17px 28px"
                  }}
                labelPlacement="start"
                label={<span style={{ fontWeight: "bold" }}>{"점심시간 없이 운영해요."}</span>}
                control={<></>}
              />
            </FormGroup>
          </> :
          <>
            <FormGroup style={{ width: "100%" }} onClick={handleCheckStateStart} >
              <FormControlLabel
                style={checkState === "start" ?
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#ffede7",
                    borderRadius: 10,
                    color: "#e73e11",
                    fontWeight: "bold",
                    padding: "17px 28px"
                  }
                  :
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#f7f7f7",
                    borderRadius: 10,
                    color: " #666666",
                    padding: "17px 28px"
                  }}
                labelPlacement="start"
                label={<span style={{ fontWeight: "bold" }}>{"점심시간이 있어요."}</span>}
                control={<></>}
              />
            </FormGroup>
            <FormGroup style={{ width: "100%", marginTop: "2vh" }} onClick={handleCheckStateNone} >
              <FormControlLabel
                style={checkState === "none" ?
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#ffede7",
                    borderRadius: 10,
                    color: "#e73e11",
                    fontWeight: "bold",
                    padding: "17px 28px"
                  }
                  :
                  {
                    justifyContent: "left",
                    height: rem(56),
                    background: "#f7f7f7",
                    borderRadius: 10,
                    color: " #666666",
                    padding: "17px 28px"
                  }}
                labelPlacement="start"
                label={<span style={{ fontWeight: "bold" }}>{"점심시간 없이 운영해요."}</span>}
                control={<></>}
              />
            </FormGroup>
          </>
      }
    </>
  );
}
