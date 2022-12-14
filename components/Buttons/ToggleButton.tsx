import { Switch } from "antd";
import { rem } from "polished";
import React, { useEffect, useState } from "react";
import { styled } from "~/stitches.config";
import { api, doctor } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
import { selectToggleState, setToggleState } from "~/store/settingsSlice";
import { selectAccoutList, selectChatToggle, selectCounselingInfoData, selectSocketControlls, selectSocketControlls2, selectToggleButton, setChatToggle, setSocketControlls, setSocketControlls2 } from "~/store/calendarDetailSlice";

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
  const infoData = useSelector(selectCounselingInfoData);
  const account_list = useSelector(selectAccoutList);
  const test = useSelector(selectToggleButton); //???????????? ?????? ????????? true , ??????????????? false ?????? ????????? disabled

  const chat_toggle = useSelector(selectChatToggle); // ????????? ????????? ?????? ?????? ?????? ????????? ????????? 



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
      api.counselor.info(infoData.id).then((res) => { dispatch(setSocketControlls(res.isWorking)), setActivate(res.isWorking), dispatch(setSocketControlls2(res.isImmediately)), setActivate2(res.isImmediately) });
    }
  }, [infoData?.id])

  useEffect(() => {
    if (chat_toggle !== null) {
      console.log("chat_toggle", chat_toggle);
      api.counselor.status2({
        is_immediately: chat_toggle
      }).then((res: any) => { dispatch(setSocketControlls2(res.isImmediately)), setActivate2(res.isImmediately) }).then(() => {
        api.counselor.info(infoData.id).then((res) => { dispatch(setSocketControlls2(res.isImmediately)), setActivate2(res.isImmediately) });
      }).then(() => dispatch(setChatToggle(null)))
    }
    console.log("?????? ??????????")

  }, [chat_toggle])

  console.log("activate2", activate2);
  console.log("chat_toggle", chat_toggle);

  console.log("test", test);

  useEffect(() => {
    if (test === true) { // ?????????????????? ????????? ?????? ?????? ?????? ??? ?????? false
      api.counselor.status2({
        is_immediately: false
      }).then((res: any) => { dispatch(setSocketControlls2(res.isImmediately)), setActivate2(false) })
    }
  }, [test])


  return (
    <>
      <Toggle
        onClick={() => { handleToggleState(!activate), setActivate(!activate) }}
        checkedChildren={"????????????"}
        unCheckedChildren={"????????????"}
        checked={activate}
      />

      <Toggle2
        style={{ marginTop: 10 }}
        onClick={() => { handleToggleState2(!activate2), setActivate2(!activate2) }}
        checkedChildren={"????????????"}
        unCheckedChildren={"????????????"}
        checked={activate2}
        disabled={test}
      />
    </>
  );
};
