import React, { useState } from 'react';
import { Arricle, Button, Ul, Li } from "../../pages/notice/container/Notice";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Input } from "~/components";
import { rem } from "polished";
import { NOTICE_FILTER } from '~/utils/constants';

function TitleInput() {
    const [check, setCheck] = useState(false)
    const [type, setType] = useState("카테고리");
    return (
        <Arricle style={{ justifyContent: "flex-start", marginBottom: 10 }}>
            <div>
                <Button select onClick={() => setCheck(!check)}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>{type}</div><KeyboardArrowDownIcon />
                </Button>
                {
                    check &&
                    <Ul style={{ zIndex: 10, position: "fixed" }}>
                        {
                            NOTICE_FILTER.map((res: { label: string, value: string }, index: number) => {
                                return <Li style={{ zIndex: 10 }} check onClick={() => {
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
                placeholder='제목을 입력해주세요.'
                css={{
                    width: "100%",
                    marginLeft: rem(8),
                    borderRadius: "10px",
                    paddingLeft: rem(24),
                    "&::placeholder": {
                        fontSize: rem(14),
                    },
                }}
            />
        </Arricle>
    );
}

export default TitleInput 