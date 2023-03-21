import React, { useEffect, useState } from "react";
import { rem } from "polished";
import { Heading, Section } from '~/components';
import LayoutComponent from '~/components/Layout';
import Notice from './container/Notice';
import { api } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
import { setNoticeDescription } from "~/store/settingsSlice";
import { setHtmlFiles, selectHtmlFiles } from "~/store/calendarDetailSlice";
import { api2 } from "~/mentalcareapi";

function Index() {
    const [noticeData, setNoticeData] = useState();
    const [noticeData2, setNoticeData2] = useState();
    const dispatch = useDispatch();
    const value = useSelector(selectHtmlFiles);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        api.diagnosis.getNoticeListMain().then((res: any) => {
            setNoticeData(res.results)
            // dispatch(setNoticeDescription(res.results))
        })
    }, [])

    useEffect(() => {
        api2.counselor.Lists(1).then((res: any) => {
            setNoticeData2(res.query?.result.postList)
            dispatch(setNoticeDescription(res.query?.result.postList))
        })
    }, [])

    useEffect(() => {
        api2.counselor.List().then((res: any) => setPages(Math.floor(res.query?.count / 10)))
    }, [])

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
