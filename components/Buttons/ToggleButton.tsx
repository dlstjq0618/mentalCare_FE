import { Switch } from "antd";
import { rem } from "polished";
import React, { useEffect, useState } from "react";
import { styled } from "~/stitches.config";
import { api, doctor } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
import { selectToggleState, setToggleState } from "~/store/settingsSlice";
import { selectCounselingInfoData, selectSocketControlls, selectSocketControlls2, setSocketControlls, setSocketControlls2 } from "~/store/calendarDetailSlice";

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
const Toggle2 = styled(Switch, {
  "&.ant-switch.ant-switch-checked": { backgroundColor: "#eb541e" },
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
  const status2 = useSelector(selectSocketControlls2);
  const boolStatus = Boolean(status);
  const boolStatus2 = Boolean(status2);
  const [activate, setActivate] = useState<boolean>(boolStatus);
  const [activate2, setActivate2] = useState<boolean>(boolStatus2);
  const [doctorId, setDoctorId] = useState<number>(0)
  const infoData = useSelector(selectCounselingInfoData);

  const handleToggleState = (data: any) => {
    api.counselor.status({
      is_working: data
    }).then((res: any) => { dispatch(setSocketControlls(res.isWorking)) })
  }

  const handleToggleState2 = (data: any) => {
    api.counselor.status2({
      is_immediately: data
    }).then((res: any) => { dispatch(setSocketControlls2(res.isImmediately)) })
  }

  useEffect(() => {
    if (infoData.id) {
      api.counselor.info(infoData.id).then((res) => { dispatch(setSocketControlls(res.isWorking)), setActivate(res.isWorking) });
    }
  }, [infoData?.id])

  console.log("status2", status2);

  return (
    <>
      <Toggle
        onClick={() => { handleToggleState(!activate), setActivate(!activate) }}
        checkedChildren={"예약상담"}
        unCheckedChildren={"예약상담"}
        checked={activate}
      />

      <Toggle2
        style={{ marginTop: 10 }}
        onClick={() => { handleToggleState2(!activate2), setActivate2(!activate2) }}
        checkedChildren={"바로상담"}
        unCheckedChildren={"바로상담"}
        checked={activate2}
      />
    </>
  );
};
