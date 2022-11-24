import React, { useEffect, useState } from 'react';
import { Details, RoundedButton } from "~/components"
import { rem } from "polished";
import { Heading, Section } from '~/components';
import LayoutComponent from '~/components/Layout';
import { useRouter } from "next/router";
import { useParams } from "react-router-dom";
import { api } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function NoticeDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [seat, setSeat] = useState([]);
    const [noticeGroup, setNoticeGroup] = useState<string>();
    const [noticeValue, setNoticeValue] = useState<any>();
    const [noticeDate, setNoticeDate] = useState<any>();
    const dispatch = useDispatch()

    useEffect(() => {
        api.diagnosis.getNoticeListMain().then((res: any) => {
            setSeat(res.results)
        })
    }, [])

    useEffect(() => {
        seat.filter((team: any, index: number) => {
            if (index === Number(id)) {
                setNoticeGroup(team.title)
                setNoticeValue(team.description)
                setNoticeDate(team.createAt)
            }
        })
    })

    return (
        <>
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
                        공지사항
                    </Heading>
                    <Details style={{ marginBottom: rem(15), height: rem(697) }}>
                        <div style={{
                            flexGrow: 0,
                            margin: `0 ${rem(12)} 0 0`,
                            fontSize: rem(14),
                            lineHeight: 1.4,
                            letterSpacing: rem(-0.56),
                            textAlign: "left",
                        }}>
                            {noticeGroup}
                        </div>
                        <div style={{
                            flexGrow: 0,
                            margin: `${rem(12)} 0 ${rem(5)}`,
                            fontSize: rem(20),
                            lineHeight: 1.4,
                            textAlign: "left",
                            fontWeight: "600"
                        }}>
                            {noticeValue?.indexOf("/") > 0 ? noticeValue.substr(0, noticeValue.indexOf("/")) : noticeValue}
                        </div>
                        <div style={{
                            width: rem(65),
                            flexGrow: 0,
                            margin: "0 0 0",
                            fontSize: rem(14),
                            lineHeight: 1.4,
                            letterSpacing: rem(-0.56),
                            textAlign: "center",
                            color: "rgba(0, 0, 0, 0.3)"
                        }}
                        >
                            {moment(new Date(noticeDate)).format('YYYY.MM.DD')}
                        </div>
                        <div style={{
                            flexGrow: 0,
                            margin: `${rem(30)} 0 0`,
                            fontSize: rem(14),
                            lineHeight: 1.4,
                            letterSpacing: rem(-0.56),
                            textAlign: "left",
                            color: "#000"
                        }}>
                            {noticeValue?.indexOf("/") > 0 ? noticeValue.slice(noticeValue.indexOf("/") + 1) : ""}
                        </div>
                    </Details>
                    <div>
                        <RoundedButton onClick={() => router.push('/notice')} css={{
                            background: "$white",
                            border: "none",
                            color: "#333",
                            float: "right",
                            width: rem(100),
                            height: rem(44)
                        }}>
                            목록
                        </RoundedButton>
                    </div>
                </Section>
            </LayoutComponent>
        </>
    );
}

export default NoticeDetail;