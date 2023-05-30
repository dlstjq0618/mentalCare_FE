import React, { useEffect, useState } from "react";
import { rem } from "polished";
import { Heading, Section, RegisterForm } from '~/components';
import LayoutComponent from '~/components/Layout';
import Notice from './container/Notice';
import { api } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
import { setNoticeDescription, setNoticeDescription2 } from "~/store/settingsSlice";
import { setHtmlFiles, selectHtmlFiles } from "~/store/calendarDetailSlice";
import { api2 } from "~/mentalcareapi";
import { useForm, FormProvider } from "react-hook-form";
import { setNotificationAllList } from "~/store/notificationSlice";

function Index() {
    const [noticeData, setNoticeData] = useState();
    const [noticeData2, setNoticeData2] = useState();
    const dispatch = useDispatch();
    const value = useSelector(selectHtmlFiles);
    const [pages, setPages] = useState(0);
    const methods = useForm();


    useEffect(() => {
        api.diagnosis.getNoticeListMain().then((res: any) => {
            setNoticeData(res.results)
            // dispatch(setNoticeDescription(res.results))
        })
    }, [])

    useEffect(() => { // 페이지네이션에 맞는 리스트 정보 호출
        api2.counselor.Lists(1).then((res: any) => {
            setNoticeData2(res.query?.result.postList)
            dispatch(setNoticeDescription(res.query?.result.postList))
            dispatch(setNoticeDescription2(res.query?.result.noticeList))
        })
    }, [pages]);

    useEffect(() => { // 페이지네이션
        api2.counselor.List().then((res: any) => setPages(res.query?.count))
    }, [pages])

    useEffect(() => { //검색용, 모든데이터 호출 
        api2.counselor.List().then((res: any) => {
            dispatch(setNotificationAllList(res.query?.result))
        })
    })
    return (
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
                    커뮤니티
                </Heading>
                <Notice data={noticeData} value={noticeData2} pages={pages} />
            </Section>
        </LayoutComponent>
    );
};

export default Index;
