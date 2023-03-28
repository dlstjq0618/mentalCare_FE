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
import { api2 } from '~/mentalcareapi';
import { selectCounselingInfoData } from "~/store/calendarDetailSlice";
import { selectNoticeCount, selectNoticeDescription } from "~/store/settingsSlice";
import { CircularProgress } from '@mui/material';


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
  margin: 28px 0 0 0;
  background-color: #d9d9d9;
`;
const Progress = styled.div`
    text-align: center;
    margin-top: ${rem(250)};
`;


function NoticeDetail() {
    const router = useRouter();
    const dispatch = useDispatch()
    const { id } = router.query;
    const ids = Number(id);
    const [seat, setSeat] = useState<any>([]);
    const [noticeGroup, setNoticeGroup] = useState<string>();
    const [noticeValue, setNoticeValue] = useState<any>();
    const [noticeDate, setNoticeDate] = useState<any>();
    const [comment, setComment] = useState(false);
    const [userName, setUserName] = useState("");
    const [privateCheck, setPrivateCheck] = useState(false); // 댓글 비밀상태 체크
    const [replyPrivateCheck, setReplyPrivateCheck] = useState(false); // 답글 비밀상태체크
    const [commentValue, setCommentValue] = useState("");
    const [reply, setReply] = useState("");
    const info = useSelector(selectCounselingInfoData);
    const [html, setHtml] = useState('');
    const [commentNumber, setCommentNumber] = useState<number>();
    const [loading, setLoading] = useState(false);

    const handleSubmitComment = () => { // 댓글
        api2.counselor.comment({
            content: commentValue,
            isSecret: privateCheck,
            nestCommentId: null,
            counselor_id: info?.id,
            postId: id,
        }).then(() => alert("댓글이 저장되었습니다.")).then(() => {
            api2.counselor.detail_List(id).then((res: any) => setSeat(res.query?.result)).then(() => { setComment(false), setCommentValue("") });
        })
    }

    const handleSubmitReply = () => { // 답글
        api2.counselor.comment({
            content: reply,
            isSecret: privateCheck,
            postId: id,
            nestCommentId: null
        }).then(() => {
            api2.counselor.detail_List(id).then((res: any) => setSeat(res.query?.result)).then(() => setComment(false));
        })
    }

    const handleOnDelete = () => {
        if (info?.id === seat[0]?.userId || info?.username === 'admin') {
            api2.counselor.delete(id).then(() => alert('게시물 삭제 완료')).then(() => router.push('/notice'))
        } else {
            alert("권한이 없습니다.")
        }
    }

    const handleDelectComment = (ids: any) => {
        api2.counselor.comment_delete(ids).then(() => alert("댓글이 삭제되었습니다.")).then(() => {
            api2.counselor.detail_List(id).then((res: any) => setSeat(res.query?.result)).then(() => setComment(false));
        })
    }

    useEffect(() => {
        api2.counselor.detail_List(id).then((res: any) => setSeat(res.query?.result));
        api2.counselor.detail_List(id).then((res: any) => setHtml(res.query?.result[0]?.content)).then(() => setLoading(true))
    }, [id])

    useEffect(() => {
        if (seat.length > 0) {
            seat && seat.filter((team: any, index: number) => {
                setNoticeGroup(team.title)
                setNoticeValue(team.content)
                setNoticeDate(team.created)
            })
        }
    });

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
                    <Details style={{
                        marginBottom: rem(0),
                        height: rem(697),
                        width: rem(1055),
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    }}>
                        <div style={{
                            flexGrow: 0,
                            margin: `${rem(12)} 0 ${rem(5)}`,
                            fontSize: rem(20),
                            lineHeight: 1.4,
                            textAlign: "left",
                            fontWeight: "600"
                        }}>
                            {noticeGroup}
                        </div>
                        <div>
                            {/* <Button style={{ marginRight: 20 }} cursor width={69} height={32}>수정</Button> */}
                            <Button onClick={() => handleOnDelete()} cursor style={{ marginRight: 6 }} width={69} height={32}>삭제</Button>
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
                            <div style={{ marginLeft: '12px' }}>조회 {seat[0]?.readCount}</div>
                        </div>
                        <Line></Line>
                        <div style={{
                            flexGrow: 0,
                            margin: `${rem(30)} 0 0`,
                            fontSize: rem(14),
                            lineHeight: 1.4,
                            letterSpacing: rem(-0.56),
                            textAlign: "left",
                            color: "#000",
                            width: "100%"
                        }}>
                            {
                                <div className='content'>
                                    {
                                        loading ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <Progress>
                                            <CircularProgress />
                                        </Progress>
                                    }
                                </div>
                            }
                            {/* <Button>댓글</Button> */}
                        </div>
                    </Details>
                    <div style={{ height: 'auto', background: '#fff', width: 1055, padding: '26px 40px' }}>
                        <div>
                            <Button width={117} height={40} style={{ paddingTop: 11, display: 'flex', justifyContent: 'space-evenly' }}>
                                <Image src={commentIcon} width={20} height={20}></Image> 댓글 <strong>{seat[0]?.comments?.length}</strong>
                            </Button>
                            <Line></Line>
                        </div>
                        {
                            seat && seat[0]?.comments.map((data: any, index: number) => {
                                return <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: rem(20) }}>
                                        <div style={{ color: '#333333', fontWeight: 'bold', fontSize: '14px' }}>
                                            {data?.userName}
                                        </div>
                                        {
                                            info?.username === 'admin' || Number(data?.userId) === info?.id ?
                                                <div
                                                    key={index}
                                                    onClick={() => handleDelectComment(data.id)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        border: '1px solid #b4b4b4',
                                                        height: '26px',
                                                        width: 47,
                                                        textAlign: 'center'
                                                    }}>
                                                    삭제
                                                </div> : null
                                        }
                                    </div>
                                    <div key={index}>
                                        {data?.content}
                                    </div>
                                    <div style={{ color: '#000', fontSize: '12px', opacity: 0.5, marginTop: '4px' }}>
                                        {moment(new Date(data.created)).format('YYYY/MM/DD hh:mm')}
                                    </div>
                                    {/* <div onClick={() => {
                                        setComment(!comment),
                                            setUserName("User_name"),
                                            setCommentNumber(index);
                                    }} style={{ cursor: 'pointer', marginTop: '12px', border: '1px solid #b4b4b4', height: '26px', width: 47, textAlign: 'center', marginBottom: 20 }}>
                                        답글
                                    </div> */}
                                    <Line></Line>
                                    {
                                        comment && commentNumber === index ?
                                            <div key={index} style={{ height: '221px', background: 'rgba(0, 0, 0, 0.03)', padding: '26px 40px' }}>
                                                <div style={{ display: 'flex' }}>
                                                    <SubdirectoryArrowRightIcon />
                                                    <textarea
                                                        value={reply}
                                                        onChange={(e) => {
                                                            setReply(e.target.value);
                                                        }}
                                                        style={{
                                                            resize: 'none',
                                                            width: '100%',
                                                            height: rem(144)
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'end',
                                                        alignItems: 'center'
                                                    }}>
                                                    {/* <Image src={icon_lock} width={20} height={20} /> */}
                                                    {/* <div onClick={() => setReplyPrivateCheck(!replyPrivateCheck)} style={{ marginRight: '30px', cursor: 'pointer' }}>비밀댓글</div> */}
                                                    <div onClick={() => handleSubmitReply()}
                                                        style={{
                                                            cursor: 'pointer',
                                                            marginTop: '9px',
                                                            border: '1px solid #b4b4b4',
                                                            height: '32px',
                                                            width: 69,
                                                            textAlign: 'center',
                                                            float: 'right',
                                                            paddingTop: '3px',
                                                            background: '#fff'
                                                        }}>
                                                        등록
                                                    </div>
                                                </div>
                                            </div> : null
                                    }
                                </>
                            })

                        }
                        {/* { // 페이지네이션 작업
                            Math.floor(seat[0]?.comments?.length / 10) < 1 ? null : <div style={{ marginTop: rem(20) }}>
                                <PaginationControlled pages={Math.floor(seat[0]?.comments?.length / 10)} />
                                {console.log("seat[0]?.comments?.length", seat[0]?.comments?.length)}
                            </div>
                        } */}
                        <textarea
                            value={commentValue}
                            placeholder='댓글을 남겨보세요'
                            onChange={(e) => {
                                setCommentValue(e.target.value)
                            }}
                            style={{
                                outline: 'none',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                minHeight: '144px',
                                marginTop: '34px',
                                resize: 'none',
                                width: '100%',
                                height: '100%',
                                padding: '20px'
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center'
                            }}>
                            {/* <Image src={icon_lock} width={20} height={20} /> */}
                            {/* <div onClick={() => setPrivateCheck(!privateCheck)} style={{ fontWeight: privateCheck ? 'bold' : '', marginRight: '30px', cursor: 'pointer' }}>비밀댓글</div> */}
                            <div onClick={() => handleSubmitComment()} style={{
                                cursor: 'pointer',
                                marginTop: '9px',
                                border: '1px solid #b4b4b4',
                                height: '32px',
                                width: 69,
                                textAlign: 'center',
                                float: 'right',
                                paddingTop: '3px'
                            }}>
                                등록
                            </div>
                        </div>
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