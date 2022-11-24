import { rem } from "polished";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  DialogWithCloseButton,
  Div,
  Heading,
  Image,
  RoundedButton,
  LinkComponent,
} from "~/components";
import { Divider } from "antd";
import { styled } from "~/stitches.config";
import { signOut } from "~/utils/nextAuth.utils";
import { api } from "~/woozooapi"
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { selectNoticeCount, setNoticeCount } from "~/store/settingsSlice";

export const NavBar = styled("div", {
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  width: rem(940),
  span: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: rem(12),
    height: rem(12),
    borderRadius: "50%",
    backgroundColor: "$primary",
    color: "$white",
    fontSize: rem(8),
    marginLeft: rem(2),
  },
});
interface Props {
  notificationsNo: number;
}

const Header = ({ notificationsNo }: Props) => {
  const router = useRouter();
  // const { data: doctorInfo } = useGetDoctorInfoQuery();
  // const doctorId: number | undefined = doctorInfo?.hospitalUser.id
  const dispatch = useDispatch();
  const state = useSelector(selectNoticeCount);
  const [isOpen, setIsOpen] = useState(false);
  const [noticeState, setNoticeState] = useState([]);
  const noticeArray: boolean[] = [];
  const logOut = () => {
    setIsOpen(true);
  };

  const handleLogOut = (data: number | undefined) => {
    api.doctor.operate({ doctorId: data }).then(() => console.log("logout"));
    // api.doctor.update({
    //   isTreatmentActive: false
    // }).then(() => { console.log("suss"), signOut({ redirect: false, callbackUrl: "/auth/login" }); }).then(() => router.push("/auth/login"))
  }


  useEffect(() => {
    api.diagnosis.getNoticeListMain().then((res) => setNoticeState(res.results));
  }, [])


  // useEffect(() => {
  //   if (noticeState && noticeState.length > 0) {
  //     noticeState.map((data: any) => {
  //       if (new Date(data.createAt).getTime() + 604800000 > new Date().getTime()) {
  //         dispatch(setNoticeCount(true))
  //       } else {
  //         noticeArray.push(false)
  //       }
  //     })
  //     if (noticeArray.length === noticeState.length) {
  //       dispatch(setNoticeCount(false))
  //     }
  //   }
  // }, [noticeState])

  return (
    <>
      <NavBar>
        <LinkComponent colors="black" onClick={() => router.push("/account")} style={{ paddingRight: rem(3) }}>
          정산
        </LinkComponent>
        <Divider type="vertical" />
        <LinkComponent as="button" colors="gray" onClick={logOut}>
          로그아웃
        </LinkComponent>
      </NavBar>
      <DialogWithCloseButton
        aria-label="로그아웃 다이얼로그"
        showDialog={isOpen}
        close={() => {
          setIsOpen(false);
        }}
      >
        <Div css={{ height: rem(58) }} />
        <Heading
          as="h3"
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: rem(17),
          }}
        >
          로그아웃 하시겠습니까?
        </Heading>
        <Div css={{ height: rem(50) }} />
        <Div css={{ display: "flex", gap: rem(10), marginBottom: rem(10) }}>
          <RoundedButton
            color="black"
            css={{ flex: 1, height: rem(50) }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            아니요
          </RoundedButton>
          <RoundedButton
            color="orange"
            css={{ flex: 1, height: rem(50) }}
          // onClick={() => handleLogOut(doctorId)}
          >
            예
          </RoundedButton>
        </Div>
      </DialogWithCloseButton>
    </>
  );
};

export default Header;
