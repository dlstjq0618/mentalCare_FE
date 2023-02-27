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
import { selectNoticeCount, selectNoticeDescription } from "~/store/settingsSlice";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PaginationControlled from "~/components/Pagination";

interface INoticeProps {
    data?: [] | undefined;
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
    const [reservationList, setReservationList] =
        useState<PrivateDiagnosisReservationListResponse>();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFilter = (type: string) => {
        const filter_data = props.data && props.data.filter((data: any) => {
            return data.title === `${type}`
        })
        setTeams(filter_data)
    }


    useEffect(() => {
        if (teams === undefined || type === "전체") {
            setTeams(totalDescription)
        } else if (type !== "전체") {
            handleFilter(type)
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
        setTeams(totalDescription)
    }, [totalDescription])

    useEffect(() => {
        if (search.length !== 0) {
            setType("전체");
        }
    }, [search])

    return (
        <>
            {
                tempState ?
                    <Details style={{ marginTop: rem(30), width: rem(1055), height: rem(640) }}>
                        <div style={{ fontWeight: "bold", display: "flex", justifyContent: "space-between", margin: `0 ${rem(30)} 0 ${rem(30)}` }}>
                            <div>No</div>
                            <div>분류</div>
                            <div>제목</div>
                            <div>작성자</div>
                            <div>조회</div>
                            <div>등록일</div>
                        </div>
                        <Divider style={{ background: "#000", margin: `${rem(14)} 0` }} />
                        {
                            teams && teams.map((data: any, index: number) => (
                                <>
                                    <div style={{ display: "flex", fontSize: rem(14), textAlign: "center" }}>
                                        <Div css={{ width: rem(61), minWidth: rem(63), letterSpacing: `${rem(-0.56)}`, marginLeft: rem(14), marginRight: rem(50) }}>
                                            {data.title && data.title.length >= 7 ? data.title.substr(0, 7) + "..." : data.title}
                                        </Div>
                                        <div style={{ display: "flex", width: "100%", letterSpacing: `${rem(-0.56)}`, justifyContent: "space-between" }}>
                                            <Div css={{ cursor: "pointer", display: "flex" }} onClick={() => router.push(`/notice/${index}`)}>
                                                <div style={{ marginRight: '2px' }}>
                                                    {data.description.indexOf("/") > 0 ?
                                                        data.description.substr(0, data.description.indexOf("/")) + ""
                                                        :
                                                        data.description.indexOf("/") > 28 ? data.description.substr(0, 28) + "..."
                                                            :
                                                            data.description.length >= 28 ? data.description.substr(0, 28) + "..."
                                                                :
                                                                data.description
                                                    }
                                                </div>
                                                {
                                                    <div>
                                                        {
                                                            new Date(data.createAt).getTime() + 604800000 > new Date().getTime() ?
                                                                <Image priority src="/ico_new@2x.png" alt="empty" width={12} height={12} />
                                                                : ""
                                                        }
                                                    </div>
                                                }
                                            </Div>
                                            <Div css={{ marginRight: rem(14), letterSpacing: `${rem(-0.56)}`, color: "rgba(0, 0, 0, 0.3)" }}>
                                                {moment(new Date(data.createAt)).format('YYYY.MM.DD')}
                                            </Div>
                                        </div>
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
                        const test = totalDescription && totalDescription.filter((team: any) => {
                            return team.description.toLowerCase().includes(e.target.value.toLowerCase())
                        });
                        setTeams(test);
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
