import React, { useEffect, useState, useRef } from "react";
import { Divider } from "antd";
import { List } from "antd";
import { useRouter } from "next/router";
import { DiagnosisStatus } from "~/interfaces";
import { rem } from "polished";
import { api } from "~/woozooapi";
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import PaginationControlled from "~/components/Pagination";
import {
    Div,
    Dropdown,
    Input,
    SearchIcon,
    Image,
    Span,
    Details,
} from "~/components";
import {
    PrivateDiagnosisReservationListResponse,
    PrivateReservationStatusType,
} from "~/interfaces";
import moment from "moment";
import { NOTICE_FILTER } from '~/utils/constants';
import { selectNoticeCount, selectNoticeDescription, selectNoticeDescription2 } from "~/store/settingsSlice";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { selectNotificationAllList } from "~/store/notificationSlice";
import { debounce } from "lodash";



interface INoticeProps {
    data?: [] | undefined;
    value?: any;
    pages?: any;
}
interface IStyled {
    margin?: number;
    size?: number | string;
    bold?: string;
    flex?: boolean;
    width?: number;
    bottom?: number;
    check?: boolean;
    search?: boolean;
    select?: boolean;
    submit?: boolean;
}

export const Arricle = styled.article<IStyled>`
    position: relative;
    width: ${rem(1054)};
    place-content: center;
    display: flex;
`;

export const Button = styled.div<IStyled>`
    ${(props) =>
        props.select &&
        css`
        width: ${rem(129)};
        border: 1px solid #d3d3d3;
        justify-content: space-between;
        display: flex;
        height: ${rem(50)};
        color: #666666;
        padding: 13px 14px 14.4px 22px;
        flex-grow: 0;
        border-radius: 10px;
        border: solid 1px #eee;
        background-color: white;
        font-weight: bold;
        font-size: 14px;
    `}
    ${(props) =>
        props.search &&
        css`
        width: 98px;
        color: white;
        height: ${rem(48)};
        margin: 0 0 0 5px;
        padding: 12.9px 33.6px 14.1px 34.4px;
        border-radius: 10px;
        background-color: #333;
    `}
    ${(props) =>
        props.submit &&
        css`
        width: 108px;
        color: #000000;
        text-align: center;
        padding: 11px 0;
        position: absolute;
        right: 0;
        height: ${rem(48)};
        margin: 0 0 0 5px;
        border: solid 1px #ada7a7;
        border-radius: 10px;
        background-color: #fff;
    `}
    cursor: pointer;
`   ;

export const Ul = styled.ul`
width: ${rem(130)};
    background-color: white;
    max-height: ${rem(300)};
    color: #666666;
    overflow: auto;
    border-radius: 10px;
    padding: 0;
    border: 1px solid #d3d3d3;
    position: relative;
    cursor: pointer;
    
`
export const Li = styled.li<IStyled>`
width: ${rem(125)};
    ${(props) =>
        props.check &&
        css`
        justify-content: space-evenly;
        margin-top: 11px;
    `}
    width: 100;
    list-style: none;
    height: ${rem(40)};
    display: flex;
    background-color: white;
    :hover {
        opacity: 0.8
    }
`


function Notice(props: INoticeProps) {
    const totalCount = useSelector(selectNoticeCount);
    const totalDescription = useSelector(selectNoticeDescription);
    const [teams, setTeams] = useState<any>();
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState<any>("");
    const [tempState, setTempState] = useState<boolean>();
    const [check, setCheck] = useState(false);
    const router = useRouter();
    const [type, setType] = useState("전체");
    const [pages, setPages] = useState(0);
    const all_list = useSelector(selectNotificationAllList);
    const [reservationList, setReservationList] =
        useState<PrivateDiagnosisReservationListResponse>();

    const noticeDiscription = useSelector(selectNoticeDescription2);
    const search_value = teams?.slice(0, 10);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFilter = (type: any) => {
        const filter_data = props.value && props.value.filter((data: any) => {
            return data.contentType === Number(type)
        })
        setTeams(filter_data)
    }
    const handleInput = debounce((value) => {
        console.log(value);
        setTeams(value)
    }, 700);

    useEffect(() => {
        if (teams === undefined || type === "전체") {
            setTeams(totalDescription)
        } else if (type !== "전체") {
            if (type === '공지') {
                handleFilter(1)
            } else if (type === '일반') {
                handleFilter(2)
            } else if (type === '질문') {
                handleFilter(3)
            } else {
                handleFilter(4)
            }
        }
    }, [type])

    useEffect(() => {
        if (teams && teams.length > 0) {
            setTempState(true);
        } else {
            setTempState(false);
        }
    })

    useEffect(() => {
        if (search.length < 1) {
            setTeams(totalDescription)
        }
    }, [totalDescription])

    useEffect(() => {
        if (search.length !== 0) {
            setType("전체");
        }
    }, [search])

    console.log("search_value", search_value)

    return (
        <>
            {
                tempState ?
                    <Details style={{ marginTop: rem(30), width: rem(1055), minHeight: rem(840), height: 'auto', maxHeight: rem(840) }}>
                        <div style={{ fontWeight: "bold", display: "flex" }}>
                            <div style={{ width: rem(20), marginRight: rem(53), marginLeft: rem(53) }}>No</div>
                            <div style={{ width: rem(30) }}>분류</div>
                            <div style={{ width: rem(483), textAlign: 'center' }}>제목</div>
                            <div style={{ width: rem(136) }}>작성자</div>
                            <div style={{ width: rem(41) }}>조회</div>
                            <div style={{ width: rem(170), textAlign: 'center' }}>등록일</div>
                        </div>
                        <Divider style={{ background: "#000", margin: `${rem(14)} 0` }} />
                        {
                            noticeDiscription && noticeDiscription.map((data: any, index: number) => (
                                <>
                                    <div key={index} style={{ display: "flex", fontSize: rem(14) }}>
                                        <div style={{ width: rem(120), textAlign: 'center' }}>
                                            {"공지"}
                                        </div>

                                        <Div key={index} css={{ width: `3.5rem`, letterSpacing: `${rem(-0.56)}`, textAlign: 'center', marginRight: rem(25) }}>
                                            {data.contentType && data.contentType === 1 ? '공지' : data.contentType === 2 ? '일반' : data.contentType === 3 ? '질문' : data.contentType === 4 ? '답글' : ''}
                                        </Div>

                                        <div key={index} style={{ width: rem(483), letterSpacing: `${rem(-0.56)}`, justifyContent: "space-between" }}>
                                            <Div css={{ cursor: "pointer", display: "flex" }} onClick={() => router.push(`/notice/${data.id}`)}>
                                                <div style={{ marginRight: '2px' }}>
                                                    {
                                                        data.title && data.title.length > 10 ? data.title.slice(0, 7) + '...' : data.title
                                                    }
                                                </div>
                                                {
                                                    <div>
                                                        {
                                                            new Date(data.created).getTime() + 604800000 > new Date().getTime() ?
                                                                <Image priority src="/ico_new@2x.png" alt="empty" width={12} height={12} />
                                                                : ""
                                                        }
                                                    </div>
                                                }
                                            </Div>
                                        </div>
                                        <div key={index} style={{ width: rem(136) }}>
                                            {data?.userName}
                                        </div>
                                        <div style={{ width: rem(110), paddingLeft: rem(16) }}>
                                            {data?.readCount}
                                        </div>
                                        <Div key={index} css={{ width: rem(133), letterSpacing: `${rem(-0.56)}`, color: "rgba(0, 0, 0, 0.3)" }}>
                                            {moment(new Date(data.created)).format('YYYY.MM.DD')}
                                        </Div>
                                    </div>
                                    <Divider style={{ margin: `${rem(14)} 0` }} />
                                </>
                            ))
                        }
                        {
                            search_value && search_value.map((data: any, index: number) => (
                                <>
                                    <div key={index} style={{ display: "flex", fontSize: rem(14) }}>
                                        <div style={{ width: rem(120), textAlign: 'center' }}>
                                            {index + 1}
                                        </div>

                                        <Div key={index} css={{ width: `3.5rem`, letterSpacing: `${rem(-0.56)}`, textAlign: 'center', marginRight: rem(25) }}>
                                            {data.contentType && data.contentType === 1 ? '공지' : data.contentType === 2 ? '일반' : data.contentType === 3 ? '질문' : data.contentType === 4 ? '답글' : ''}
                                        </Div>

                                        <div key={index} style={{ width: rem(483), letterSpacing: `${rem(-0.56)}`, justifyContent: "space-between" }}>
                                            <Div css={{ cursor: "pointer", display: "flex" }} onClick={() => router.push(`/notice/${data.id}`)}>
                                                <div style={{ marginRight: '2px' }}>
                                                    {
                                                        data.title && data.title.length > 10 ? data.title.slice(0, 7) + '...' : data.title
                                                    }
                                                </div>
                                                {
                                                    <div>
                                                        {
                                                            new Date(data.created).getTime() + 604800000 > new Date().getTime() ?
                                                                <Image priority src="/ico_new@2x.png" alt="empty" width={12} height={12} />
                                                                : ""
                                                        }
                                                    </div>
                                                }
                                            </Div>
                                        </div>
                                        <div key={index} style={{ width: rem(136) }}>
                                            {data?.userName}
                                        </div>
                                        <div style={{ width: rem(110), paddingLeft: rem(16) }}>
                                            {data?.readCount}
                                        </div>
                                        <Div key={index} css={{ width: rem(133), letterSpacing: `${rem(-0.56)}`, color: "rgba(0, 0, 0, 0.3)" }}>
                                            {moment(new Date(data.created)).format('YYYY.MM.DD')}
                                        </Div>
                                    </div>
                                    <Divider style={{ margin: `${rem(14)} 0` }} />
                                </>
                            ))
                        }
                    </Details> :
                    <Details style={{ marginTop: rem(30), textAlign: 'center', width: rem(1055), height: rem(640) }}>
                        <div style={{
                            marginTop: "21%"
                        }}>
                            <Image priority src="/empty.png" alt="empty" width={40} height={40} />
                            <div style={{ textAlign: "center" }}>
                                검색어와 일치하는 결과가 없습니다.
                            </div>
                        </div>
                    </Details>
            }
            {
                search?.length > 0 ? null : <Arricle style={{ marginBottom: 50 }}>
                    <PaginationControlled pages={props.pages} />
                </Arricle>
            }
            <Arricle>
                <div>
                    <Button select onClick={() => setCheck(!check)}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>{type}</div><KeyboardArrowDownIcon />
                    </Button>
                    {
                        check &&
                        <Ul style={{ zIndex: 10 }}>
                            {
                                NOTICE_FILTER.map((res: { label: string, value: string }, index: number) => {
                                    return <Li check onClick={() => {
                                        setType(res.label),
                                            setCheck(false)
                                    }} key={index} value={res.value}>{res.label}{type === res.label ? <CheckIcon style={{ color: '#eb541e' }} />
                                        :
                                        <CheckIcon style={{ color: "#fff" }} />}</Li>
                                })
                            }
                        </Ul>
                    }
                </div>
                <Input
                    css={{
                        width: rem(285),
                        marginLeft: rem(8),
                        borderRadius: "10px",
                        paddingLeft: rem(24),
                        "&::placeholder": {
                            fontSize: rem(14),
                        },
                    }}
                    onChange={e => {
                        const test = all_list && all_list.filter((team: any) => {
                            return team.title.toLowerCase().includes(e.target.value.toLowerCase())
                        });
                        if (e.target.value.length > 0) {
                            // setTeams(test);
                            handleInput(test);
                        }
                        setSearch(e.target.value);
                    }}
                    ref={inputRef}
                />
                <Button search>검색</Button>
                <Button submit onClick={() => router.push('/notice/register')}>글쓰기</Button>
            </Arricle>
        </>
    );
}

export default Notice;
