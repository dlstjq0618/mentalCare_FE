import { Layout } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { rem } from "polished";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
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
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {
  selectAccoutList,
  selectConferenceList,
  selectCalendarUserList,
  selectConsultingList,
  selectReservationList,
  selectSocketData,
  selectWaitlist,
  setCounselingInfoData,
  setSessionId,
  setSocketControlls,
  selectImmediateListCount,
  selectNonImmediateListCount,
  setStoreFocus,
  selectStoreFocus,
} from "~/store/calendarDetailSlice";
import { api } from "~/woozooapi";
import counselorLogo from '../../public/counser.png'
import { CommunityIcon } from "../icons/CommunityIcon";

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
  const [focus, setFocus] = useState<boolean>();
  const notifyNum: any = useSelector(selectDiagnosisNotificationNumber); // 스토어에 들어가있는 값
  const notifyState: any = useSelector(selectDiagnosisCallStatus);
  const socketInfo = useSelector(selectSocketData);
  const path = router.pathname;
  const userList = useSelector(selectCalendarUserList);
  const sessionId = typeof window !== 'undefined' ? JSON.parse(localStorage?.getItem('session') as any) : "";
  const userName = useSelector(selectCounselorName);

  const storeFocus = useSelector(selectStoreFocus);

  const consultingList = useSelector(selectConsultingList); // 상담중
  const reservationList = useSelector(selectReservationList); // 예약 확정 O
  const waitingList = useSelector(selectWaitlist);
  const account_list = useSelector(selectAccoutList);
  const conference_list = useSelector(selectConferenceList);

  const immediateCount = useSelector(selectImmediateListCount);
  const nonImmediateCount = useSelector(selectNonImmediateListCount);
  const totalCount = immediateCount + nonImmediateCount;

  const watingRoom_count = consultingList?.count + reservationList?.count;

  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldNotificate = useSelector(selectShouldNotificate);
  const [count, setCount] = useState(0);

  const handleToast = () => {
    Store.addNotification({
      title: "대기실",
      message: "새로운 내담자가 기다리고있습니다.",
      type: "warning",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 10000,
        onScreen: true
      }
    });
  }

  useEffect(() => {
    console.log("SOCKET_INFO", socketInfo);
  }, [socketInfo])

  useEffect(() => {
    const userId = window?.localStorage?.getItem("userId");
    const sessionId = window?.localStorage?.getItem("session");

    console.log(sessionId, sessionId);
    const working = window?.localStorage?.getItem("status");

    dispatch(setSocketControlls(working));
    const id = Number(userId);
    dispatch(setCounselorId(id));

    api.counselor.info(id).then((res) => {
      dispatch(setCounselorName(res.username)),
        dispatch(setCounselingInfoData(res));
    }).then((res) => console.log("res", res));
  }, [])

  useEffect(() => {
    dispatch(setSessionId(sessionId))
  }, [sessionId])

  // useEffect(() => {
  //   if (count > 0) {
  //     handleToast()
  //   }
  // }, [count])

  // useEffect(() => {
  //   function is_true(element: any) {
  //     if (element.isimmediate === true) {
  //       return true;
  //     }
  //   }
  //   function is_status(element: any) {
  //     if (element.status === 5) {
  //       return true;
  //     }
  //   }
  //   const true_value = reservationList.result?.filter(is_true);
  //   const status_value = reservationList.result?.filter(is_status);

  //   if (true_value?.length > 0 && status_value?.length > 0) {
  //     dispatch(setToggleButton(true));
  //   } else {
  //     dispatch(setToggleButton(false));
  //   }
  // }, [reservationList])

  useEffect(() => {
    if (focus) {
      dispatch(setDiagnosisNotificationNumber(totalCount))
    }
  }, [focus]);

  useEffect(() => {
    if (focus === false) {
      dispatch(setStoreFocus(false))
    }
  }, [totalCount])


  useEffect(() => {
    window.addEventListener('focus', function () {
      setFocus(true);
      dispatch(setStoreFocus(true));
    }, false);
    window.addEventListener('blur', function () {
      setFocus(false);
    }, false)
  }, [focus])

  useInterval(() => { //notification 반복 조건
    if (!isMobile) {
      if (storeFocus === false && !focus) {
        const notify = new Notification("우주약방 마음상담", {
          body: "진료를 기다리는 환자가 있습니다.",
          icon: "/doctor@3x.png",
        })
        notify.onclick = (e) => {
          router.push(`${process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ?
            'https://mentalcare.rocketdoctor.co.kr/calendar' : 'https://dev.mentalcare.rocketdoctor.co.kr/calendar'}`)
        }
      }
    }
  }, 30000);

  useEffect(() => {
    if (!isMobile) {
      if (Notification.permission === "granted") {
        if (totalCount && totalCount > 0) {
          if (storeFocus === false) {
            const notify = new Notification("우주약방 마음상담", {
              body: "진료를 기다리는 환자가 있습니다.",
              icon: "/doctor@3x.png",
            })
            notify.onclick = (e) => {
              router.push(`${process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ?
                'https://mentalcare.rocketdoctor.co.kr/calendar' : 'https://dev.mentalcare.rocketdoctor.co.kr/calendar'}`)
            }
          }
        }
      } else {
        Notification.requestPermission().then((data: any) => {
          if (data === "granted") {
            console.log("grated");// 권한 허용 받은 직후 로직
          } else {
            console.log("not suss")
          }
        })
      }
    }
  }, [totalCount, storeFocus])


  // useEffect(() => { /** 새로운 환자 입장 시 TTS */
  //   dispatch(setDiagnosisIdForNotification(waitingListInfo?.results?.[0]?.id));
  //   if (audioRef.current === null) {
  //     return;
  //   }

  //   if (shouldNotificate) {
  //     audioRef.current.play();
  //   }
  // }, [dispatch, shouldNotificate, waitingListInfo]);

  useEffect(() => {
    if (account_list.count === undefined) {
      const totalCount = 0 + waitingList?.count;
      setCount(totalCount)
    } else if (account_list.count !== undefined) {
      const totalCount1 = account_list?.count + waitingList?.count + conference_list?.count;
      setCount(totalCount1)
    }

  }, [account_list.count, waitingList.count, conference_list.count])

  return (
    <>
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
            <Div className="logo" css={{ cursor: "pointer" }}>
              {/* <RocketDoctorLogo /> */}
              <Image src={counselorLogo} width={90} height={37} />
            </Div>
          </Link>
          <span style={{
            color: '#fff',
            background: "#e8440a",
            border: "solid 1.5px #e73e11",
            fontSize: 10,
            height: 24.8,
            padding: '2.3px 3px 4px 3px',
            position: 'absolute',
            left: `${rem(35)}`,
            marginTop: `${rem(-25)}`,
            textAlign: 'center',
            borderRadius: 16,
            width: `${rem(51)}`
          }}>마음상담</span>
          <div className="text" style={{ margin: `${rem(25)} 0 ${rem(28)}` }}>
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
              <span>{Number.isNaN(watingRoom_count) ? 0 : watingRoom_count}</span>
              <div>대기실</div>
            </SideBarButtons>
            <SideBarButtons
              href="/notice"
              visiting={path === "/notice" ? true : false}
            >
              <CommunityIcon />
              <div>커뮤니티</div>
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
    </>

  );
};

export default SideBar;
