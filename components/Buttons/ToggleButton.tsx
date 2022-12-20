import { Switch } from "antd";
import { rem } from "polished";
import React, { useEffect, useState } from "react";
import { styled } from "~/stitches.config";
import { api, doctor } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
import { selectToggleState, setToggleState } from "~/store/settingsSlice";
import { selectCounselingInfoData, selectSocketControlls, setSocketControlls } from "~/store/calendarDetailSlice";

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
  const status = useSelector(selectSocketControlls);
  const boolStatus = Boolean(status)
  const [activate, setActivate] = useState<boolean>(boolStatus);
  const [doctorId, setDoctorId] = useState<number>(0)
  const infoData = useSelector(selectCounselingInfoData);

  const handleToggleState = (data: any) => {
    api.counselor.status({
      is_working: data
    }).then((res: any) => { dispatch(setSocketControlls(res.isWorking)) })
  }

  useEffect(() => {
    if (infoData.id) {
      api.counselor.info(infoData.id).then((res) => { dispatch(setSocketControlls(res.isWorking)), setActivate(res.isWorking) });
    }
  }, [infoData?.id])


  return (
    <>
      <Toggle
        onClick={() => { handleToggleState(!activate), setActivate(!activate) }}
        checkedChildren={"진료가능"}
        unCheckedChildren={"진료불가"}
        checked={activate}
      />
    </>
  );
};
