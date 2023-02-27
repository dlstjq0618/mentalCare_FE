import React, { useEffect, useState } from "react";
import { rem } from "polished";
import { Heading, Section } from '~/components';
import LayoutComponent from '~/components/Layout';
import Notice from './container/Notice';
import { api } from "~/woozooapi";
import { useDispatch } from "react-redux";
import { setNoticeDescription } from "~/store/settingsSlice";

function Index() {
    const [noticeData, setNoticeData] = useState()
    const dispatch = useDispatch();

    useEffect(() => {
        api.diagnosis.getNoticeListMain().then((res: any) => {
            setNoticeData(res.results),
                dispatch(setNoticeDescription(res.results))
        })
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
                <Notice data={noticeData} />
            </Section>
        </LayoutComponent>
    );
};

export default Index;
