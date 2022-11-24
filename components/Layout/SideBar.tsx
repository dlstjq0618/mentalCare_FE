import { Layout } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { rem } from "polished";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RocketDoctorLogo,
  PreviousCounselingIcon,
  SettingIcon,
  Div,
  Aside,
  RoundedButton,
  Heading,
  P,
  ToggleButton,
} from "~/components";
import useInterval from "~/utils/hook/useInterval"
import { SideBarButtons } from "~/components/Buttons";
import { useGetDiagnosisListQuery } from "~/services/diagnosis";
import { styled } from "~/stitches.config";
import {
  selectShouldNotificate,
  setDiagnosisIdForNotification,
} from "~/store/notificationSlice";
import { Store } from 'react-notifications-component';
import { selectCounselorId, selectCounselorName, setCounselorId, setCounselorName } from "~/store/doctorInfoForChangeSlice";
import { selectDiagnosisCallStatus, selectDiagnosisNotificationNumber, setDiagnosisNotificationNumber } from "~/store/diagnosisDetailSlice";
import {
  isMobile
} from "react-device-detect";
import { selectCalendarUserList, setSessionId } from "~/store/calendarDetailSlice";
import { api } from "~/woozooapi";

const { Sider } = Layout;

const StyledSider = styled(Sider, {
  "&.ant-layout-sider": {
    backgroundColor: "$gray08",
    height: "fit-content",
    borderRadius: "20px",
    marginTop: rem(-4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "div.logo": {
    height: rem(90.5),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "div.text": {
    width: rem(90),
    height: "fit-content",
    color: "$white",
    fontSize: "$p4-14",
    lineHeight: "1.4",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: `0 0 ${rem(18)}`,
    textAlign: "center",
  },
  "div.group-btn": {
    paddingTop: rem(31),
    display: "flex",
    flexDirection: "column",
    gap: rem(16),
  },
  "span.doctor-name": {
    fontWeight: "bold",
    marginRight: rem(4),
  },
});


const SideBar = (props: { total?: number; doctorName?: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [focus, setFocus] = useState<boolean>(true);
  const notifyNum: any = useSelector(selectDiagnosisNotificationNumber); // 스토어에 들어가있는 값
  const notifyState: any = useSelector(selectDiagnosisCallStatus);
  const path = router.pathname;
  const userList = useSelector(selectCalendarUserList);
  const sessionId = typeof window !== 'undefined' ? JSON.parse(localStorage?.getItem('session') as any) : "";
  const userName = useSelector(selectCounselorName);


  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldNotificate = useSelector(selectShouldNotificate);

  const handleToast = () => {
    Store.addNotification({
      title: "대기실",
      message: "새로운 환자가 입장하였습니다.",
      type: "success",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 30000,
        onScreen: true
      }
    });
  }
  useEffect(() => {
    const userId = window?.localStorage?.getItem("userId");
    const sessionId = window.localStorage.getItem("session");
    const id = Number(userId);
    dispatch(setCounselorId(id));

    console.log("userId", userId);
    console.log("sessionId", sessionId);

    api.counselor.info(id).then((res) => {
      dispatch(setCounselorName(res.accountInfo.accountHolder))
    })
  }, [])

  useEffect(() => {
    dispatch(setSessionId(sessionId))
  }, [sessionId])


  // useEffect(() => {
  //   if (waitingCount !== notifyNum && focus) {
  //     dispatch(setDiagnosisNotificationNumber(waitingCount))
  //     console.log("store")
  //   }
  // }, [focus]);

  // useEffect(() => {
  //   window.addEventListener('focus', function () {
  //     setFocus(true)
  //   }, false);
  //   window.addEventListener('blur', function () {
  //     setFocus(false)
  //   }, false)
  // }, [focus])

  // useInterval(() => {
  //   if (waitingListInfo?.results && !focus && !isMobile) {
  //     const notify = new Notification("우주약방", {
  //       body: "진료를 기다리는 환자가 있습니다.",
  //       icon: "/doctor@3x.png",
  //     })
  //     notify.onclick = (e) => {
  //       router.push("/diagnosis")
  //     }
  //   }
  // }, 30000);

  // useEffect(() => {
  //   if (!isMobile) {
  //     if (Notification.permission === "granted") {
  //       if (waitingListInfo && waitingListInfo.count > 0) {
  //         if (waitingCount !== notifyNum) {
  //           const notify = new Notification("우주약방", {
  //             body: "진료를 기다리는 환자가 있습니다.",
  //             icon: "/doctor@3x.png",
  //           })
  //           notify.onclick = (e) => {
  //             router.push("/diagnosis")
  //           }
  //         }
  //       }
  //     } else {
  //       Notification.requestPermission().then((data: any) => {
  //         if (data === "granted") {
  //           console.log("grated");// 권한 허용 받은 직후 로직
  //         } else {
  //           console.log("not suss")
  //         }
  //       })
  //     }
  //   }
  //   dispatch(setDiagnosisNotificationNumber(waitingCount))
  // }, [waitingListInfo?.results, focus])

  // useEffect(() => { /** 새로운 환자 입장 시 TTS */
  //   dispatch(setDiagnosisIdForNotification(waitingListInfo?.results?.[0]?.id));
  //   if (audioRef.current === null) {
  //     return;
  //   }

  //   if (shouldNotificate) {
  //     audioRef.current.play();
  //   }
  // }, [dispatch, shouldNotificate, waitingListInfo]);

  return (
    <StyledSider width={rem(120)}>
      <Div
        css={{
          width: "100%",
          height: rem(687),
          padding: `0 ${rem(17)} ${rem(24)}`,
          backgroundColor: "$black01",
          borderRadius: "20px",
        }}
      >
        <Link href="/" passHref>
          <Div className="logo" css={{ cursor: "pointer", fontSize: rem(40) }}>
            <RocketDoctorLogo />
          </Div>
        </Link>
        <div className="text">
          <span>
            <span className="doctor-name">
              {userName}
            </span>
            <span>님, </span>
          </span>
          <span>환영합니다!</span>
        </div>
        <ToggleButton activeState={true} />
        <div className="group-btn">
          <SideBarButtons
            href="/calendar"
            visiting={path === "/calendar" ? true : false}
          >
            <span>{userList.length}</span>
            <div>대기실</div>
          </SideBarButtons>
          <SideBarButtons
            href="/settings"
            visiting={path === "/settings" ? true : false}
          >
            <SettingIcon />
            <div>설정</div>
          </SideBarButtons>
        </div>
      </Div>
    </StyledSider>
  );
};

export default SideBar;
