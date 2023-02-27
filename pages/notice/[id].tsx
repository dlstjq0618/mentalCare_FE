import React, { useEffect, useState } from 'react';
import { Details, RoundedButton } from "~/components"
import { rem } from "polished";
import {
    Heading, Section, FileProfileInput
} from '~/components';
import LayoutComponent from '~/components/Layout';
import { useRouter } from "next/router";
import { useParams } from "react-router-dom";
import { api } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from 'styled-components';
import moment from "moment";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import PaginationControlled from '~/components/Pagination';
import Image from 'next/image';
import icon_lock from '../../public/icon_lock@2x.png'
import commentIcon from '../../public/comment@3x.png'


interface IStyeldProps {
    size?: number | string;
    height?: number;
    width?: number;
    cursor?: boolean;

}

const Button = styled.div<IStyeldProps>`
    border: 1px solid #ada7a7;
    padding: 8px;
    border-radius: 2px;
    flex-grow: 0;
    text-align: center;
    line-height: 1;
    
    ${(props) =>
        props.width &&
        css`
        width: ${rem(props.width)};
    `}
    ${(props) =>
        props.height &&
        css`
        height: ${rem(props.height)};
    `}
    ${(props) =>
        props.cursor &&
        css`
        float: right;
        cursor: pointer;
    `}
`;

const Line = styled.div`
    width: ${rem(975)};
  height: 1px;
  flex-grow: 0;
  margin: 28px 0;
  background-color: #d9d9d9;
`;


function NoticeDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [seat, setSeat] = useState([]);
    const [noticeGroup, setNoticeGroup] = useState<string>();
    const [noticeValue, setNoticeValue] = useState<any>();
    const [noticeDate, setNoticeDate] = useState<any>();
    const [comment, setComment] = useState(false);
    const [userName, setUserName] = useState("")
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
                        커뮤니티
                    </Heading>
                    <Details style={{ marginBottom: rem(0), height: rem(697), width: rem(1055), borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
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
                        <div>
                            <Button cursor width={69} height={32}>수정</Button>
                            <Button cursor style={{ marginRight: 6 }} width={69} height={32}>삭제</Button>
                        </div>
                        <div style={{
                            display: 'flex',
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
                            <div style={{ marginLeft: '12px' }}>조회 5</div>
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
                            {/* <Button>댓글</Button> */}
                        </div>
                    </Details>
                    <div style={{ height: 'auto', background: '#fff', width: 1055, padding: '26px 40px' }}>
                        <div>
                            <Button width={117} height={40} style={{ paddingTop: 11, display: 'flex' }}>
                                <Image src={commentIcon} width={20} height={20}></Image>   댓글 <strong color='#e8440a'>33</strong>
                            </Button>
                            <Line></Line>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ color: '#333333', fontWeight: 'bold', fontSize: '14px' }}>
                                {"User"}
                            </div>
                            <div style={{ cursor: 'pointer', border: '1px solid #b4b4b4', height: '26px', width: 47, textAlign: 'center' }}>
                                삭제
                            </div>
                        </div>
                        <div>
                            {"내용 ex) 15만원에 거래가능한데 지역이 어디세요? 근처면 직거래 괜찮을까요?"}
                        </div>
                        <div style={{ color: '#000', fontSize: '12px', opacity: 0.5, marginTop: '4px' }}>{"2023/0209 10:22"}</div>
                        <div onClick={() => { setComment(!comment), setUserName("User_name") }} style={{ cursor: 'pointer', marginTop: '12px', border: '1px solid #b4b4b4', height: '26px', width: 47, textAlign: 'center', marginBottom: 20 }}>
                            답글
                        </div>
                        {
                            comment &&
                            <div style={{ display: 'flex', height: '184px', background: 'rgba(0, 0, 0, 0.03)', padding: '26px 40px' }}>
                                <SubdirectoryArrowRightIcon /><textarea style={{ resize: 'none', width: '100%', height: '100%' }} ></textarea>
                            </div>
                        }
                        <PaginationControlled />
                        <textarea placeholder='댓글을 남겨보세요' style={{ outline: 'none', border: '1px solid rgba(0, 0, 0, 0.1)', minHeight: '144px', marginTop: '34px', resize: 'none', width: '100%', height: '100%', padding: '20px' }} />
                        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}><Image src={icon_lock} width={20} height={20} /><div style={{ marginRight: '30px' }}>비밀댓글</div><div style={{ cursor: 'pointer', marginTop: '9px', border: '1px solid #b4b4b4', height: '32px', width: 69, textAlign: 'center', float: 'right', paddingTop: '3px' }}>등록</div></div>
                    </div>
                    <div style={{ width: rem(1055), marginTop: rem(20) }}>
                        <Button cursor width={75} height={48} onClick={() => router.push('/notice')} style={{ background: '#fff', paddingTop: 16 }}>
                            목록
                        </Button>
                    </div>
                </Section>
            </LayoutComponent>
        </>
    );
}

export default NoticeDetail;