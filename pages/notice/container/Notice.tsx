import React, { useEffect, useState, useRef } from "react";
import { Divider } from "antd";
import { useRouter } from "next/router";
import { DiagnosisStatus } from "~/interfaces";
import { rem } from "polished";
import { api } from "~/woozooapi";
import { useDispatch, useSelector } from "react-redux";
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
import { selectNoticeCount, selectNoticeDescription } from "~/store/settingsSlice";

interface INoticeProps {
    data?: [] | undefined;
}


function Notice(props: INoticeProps) {
    const totalCount = useSelector(selectNoticeCount);
    const totalDescription = useSelector(selectNoticeDescription);
    const [teams, setTeams] = useState<any>();
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState<any>("전체");
    const [tempState, setTempState] = useState<boolean>();
    const router = useRouter();
    const [reservationList, setReservationList] =
        useState<PrivateDiagnosisReservationListResponse>();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (teams === undefined) {
            setTeams(totalDescription)
        }
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
            setSelect("전체")
        }
    }, [search])

    return (
        <>
            <Div
                css={{
                    width: rem(294),
                    height: rem(50),
                    position: "relative",
                    flex: "auto",
                    display: "flex",
                    svg: {},
                }}
            >
                <Input placeholder='검색어를 입력해 주세요'
                    css={{
                        flex: "auto",
                        width: "100%",
                        border: "1px solid $gray01",
                        boxShadow: "$button",
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
                <Div
                    role="button"
                    css={{
                        position: "absolute",
                        right: rem(27),
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                    }}
                >
                    <SearchIcon />
                </Div>
            </Div>
            <Div
                style={{ display: "flex", justifyContent: "space-between", marginTop: rem(20) }}
                css={{
                    height: rem(44),
                    ".react-select__control": {
                        fontSize: rem(14),
                        width: rem(152),
                        minHeight: rem(44),
                        height: rem(44),
                        backgroundColor: "$white",
                    },
                }}
            >
                <Div css={{ fontSize: rem(16), display: "flex", alignItems: "center" }}>
                    총
                    <Span
                        css={{ fontWeight: "bold", color: "$primary", marginLeft: rem(8) }}
                    >
                        {teams && teams.length}
                    </Span>
                    <Span css={{ color: "$gray03", marginLeft: rem(3) }}>건</Span>
                </Div>
                <Div>
                    <Dropdown
                        instanceId="status-dropdown"
                        defaultValue={{ label: "전체", value: "전체" }}
                        value={{ label: select, value: select }}
                        onChange={e => {
                            const selet = props.data && props.data.filter((team: any) => {
                                if (e?.value === "전체") {
                                    setSelect("전체")
                                    return team.title === team.title
                                } else {
                                    setSelect(e?.value)
                                    return team.title === e?.value
                                }
                            })
                            setTeams(selet)
                        }}
                        options={[
                            { label: "전체", value: "전체" },
                            { label: "점검안내", value: "점검안내" },
                            { label: "서비스안내", value: "서비스안내" },
                            { label: "약관안내", value: "약관안내" },
                        ]}
                        styles={{
                            option: (provided) => ({
                                ...provided,
                                display: "flex",
                                alignItems: "center",
                                fontSize: rem(14),
                                height: rem(47),
                                paddingLeft: rem(20),
                            }),
                        }}
                    />
                </Div>
            </Div>
            {
                tempState ?
                    <Details style={{ marginTop: rem(30) }}>
                        <div style={{ fontWeight: "bold", display: "flex", justifyContent: "space-between", margin: `0 ${rem(30)} 0 ${rem(30)}` }}>
                            <div>분류</div>
                            <div>제목</div>
                            <div>작성일</div>
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
                                            <Div css={{ cursor: "pointer" }} onClick={() => router.push(`/notice/${index}`)}>
                                                {data.description.indexOf("/") > 0 ?
                                                    data.description.substr(0, data.description.indexOf("/")) + ""
                                                    :
                                                    data.description.indexOf("/") > 28 ? data.description.substr(0, 28) + "..."
                                                        :
                                                        data.description.length >= 28 ? data.description.substr(0, 28) + "..."
                                                            :
                                                            data.description
                                                }
                                                {
                                                    new Date(data.createAt).getTime() + 604800000 > new Date().getTime() ?
                                                        <Image priority src="/ico_new@2x.png" alt="empty" width={12} height={12} />
                                                        : ""
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
                    <div style={{ textAlign: "center", paddingTop: "20vh" }}>
                        <Image priority src="/empty.png" alt="empty" width={40} height={40} />
                        <div style={{ textAlign: "center" }}>
                            검색어와 일치하는 결과가 없습니다.
                        </div>
                    </div>
            }

        </>
    );
}

export default Notice;
