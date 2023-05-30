import { Switch } from "antd";
import { rem } from "polished";
import React, { useEffect, useState } from "react";
import { styled } from "~/stitches.config";
import { api, doctor } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
import { selectToggleState, setToggleState } from "~/store/settingsSlice";
import { setToggleButton, selectAccoutList, selectChatToggle, selectConsultingList, selectCounselingInfoData, selectSocketControlls, selectSocketControlls2, selectToggleButton, setChatToggle, setSocketControlls, setSocketControlls2 } from "~/store/calendarDetailSlice";

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
  const test = useSelector(selectToggleButton); //바로상담 건이 있을때 true , 바로상담은 false 이고 버튼은 disabled
  const consultingList = useSelector(selectConsultingList); // 상담중

  const chat_toggle = useSelector(selectChatToggle); // 채팅방 알럿을 통해 바로 상담 상태를 나타냄

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
      api.counselor.info(infoData.id).then((res) => {
        dispatch(setSocketControlls(res.isWorking)),
          setActivate(res.isWorking),
          dispatch(setSocketControlls2(res.isImmediately)),
          setActivate2(res.isImmediately)
      });
    }
  }, [infoData?.id])

  useEffect(() => {
    if (chat_toggle !== null) {
      api.counselor.status2({
        is_immediately: chat_toggle
      }).then((res: any) => { dispatch(setSocketControlls2(res.isImmediately)), setActivate2(res.isImmediately) }).then(() => {
        api.counselor.info(infoData.id).then((res) => { dispatch(setSocketControlls2(res.isImmediately)), setActivate2(res.isImmediately) });
      }).then(() => dispatch(setChatToggle(null)))
    }

  }, [chat_toggle])


  useEffect(() => {
    if (test === true) { // 바로상담건이 있으니 버튼 조작 불가 및 상태 false
      api.counselor.status2({
        is_immediately: false
      }).then((res: any) => { dispatch(setSocketControlls2(res.isImmediately)), setActivate2(false) })
    }
  }, [test])

  useEffect(() => {
    if (consultingList?.count > 0) {
      api.counselor.status2({
        is_immediately: false
      }).then((res: any) => { dispatch(setSocketControlls2(res.isImmediately)), setActivate2(false), dispatch(setToggleButton(true)) })
    } else {
      dispatch(setToggleButton(false))
    }
  })


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
        disabled={test}
      />
    </>
  );
};
