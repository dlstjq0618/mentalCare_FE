import { Switch } from "antd";
import { rem } from "polished";
import React, { useEffect, useState } from "react";
import { styled } from "~/stitches.config";
import { api, doctor } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
import { selectToggleState, setToggleState } from "~/store/settingsSlice";
import { P } from "../Elements";

interface Toggle {
  checkedContent?: string;
  unCheckedContent?: string;
  activeState?: boolean;
}

const Toggle = styled(Switch, {
  "&.ant-switch.ant-switch-checked": { backgroundColor: "$green" },
  "&.ant-switch-checked:focus": {
    boxShadow: "none",
  },
  "&.ant-switch": {
    backgroundColor: "darkgray",
    border: "none",
    width: rem(90),
    height: rem(30),
    fontSize: "$p6-12",
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: "1.4",
    letterSpacing: rem(-0.36),
  },
  "&.ant-switch .ant-switch-handle": {
    width: rem(24),
    height: rem(24),
    left: rem(2.5),
    top: rem(3),
  },
  "&.ant-switch-checked .ant-switch-handle": {
    left: "calc(100% - 24px - 4px)",
  },
  "&.ant-switch .ant-switch-handle::before": {
    borderRadius: "50%",
  },
});

export const ToggleButton = ({ activeState }: Toggle) => {
  const dispatch = useDispatch()
  const puvlicState = useSelector(selectToggleState);
  const [activate, setActivate] = useState<boolean | undefined>(puvlicState);
  const [doctorId, setDoctorId] = useState<number>(0)

  useEffect(() => {
    // api.doctor.info().then((res) => { dispatch(setToggleState(res.hospitalUser.isPublic)), setActivate(res.hospitalUser.isPublic), setDoctorId(res.hospitalUser.id) })
  }, [])


  // const handleToggleState = (data: any) => {
  //   api.doctor.activate(doctorId, {
  //     isActive: data
  //   }).then(() => api.doctor.info().then((res) => { dispatch(setToggleState(res.hospitalUser.isPublic)) }))
  // }

  return (
    <>
      <Toggle
        // onClick={() => { setActivate(!activate), handleToggleState(!activate) }}
        checkedChildren={"진료가능"}
        unCheckedChildren={"진료불가"}
        checked={activate}
      />
    </>
  );
};
