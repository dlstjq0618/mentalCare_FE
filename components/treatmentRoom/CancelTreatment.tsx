import { rem } from "polished";
import React, { FC, useEffect, useState } from "react";
import {
  Article,
  Heading,
  Dropdown,
  DropdownOnChange,
  Div,
  P,
  Input,
  RoundedButton,
} from "~/components";
import { CANCEL_REASON_DROPDOWN_DATA } from "~/utils/constants";
import { useDispatch } from "react-redux";
import { setCancelReason } from "~/store/settingsSlice";

interface Props {
  onChangeCancelCallReason: DropdownOnChange;
  cancelCall: () => void;
}

export const CancelTreatment: FC<Props> = ({
  onChangeCancelCallReason,
  cancelCall,
}) => {
  const [reason, setReason] = useState<string>("");
  const dispatch = useDispatch()

  useEffect(() => {
    if (reason !== "") {
      dispatch(setCancelReason(true))
    } else {
      dispatch(setCancelReason(false))
    }
  })
  const showInput = reason === "other";

  const handleReasonChange: DropdownOnChange = (reason, actionMeta) => {
    setReason(reason?.value ?? "");
    if (onChangeCancelCallReason) {
      onChangeCancelCallReason(reason, actionMeta);
    }
  };

  return (
    <Article
      css={{
        width: "100%",
        borderRadius: `0 0 ${rem(20)} ${rem(20)}`,
        textAlign: "left",
        ".react-select__single-value": {
          color: "$gray03",
        },
        ".react-select__indicators": {
          stroke: "$gray03",
        },
      }}
    >
      <Heading as="p" css={{ fontSize: rem(15) }}>
        진료 취소
      </Heading>
      <Div css={{ height: rem(10) }} />
      <Div
        css={{
          padding: rem(30),
          backgroundColor: "$white",
          borderRadius: rem(20),
        }}
      >
        <Div
          css={{
            display: "flex",
            gap: rem(14),
            '[class*="react-select"]': {
              fontSize: rem(14),
            },
          }}
        >
          <Div css={{ flex: 1 }}>
            <Dropdown
              options={CANCEL_REASON_DROPDOWN_DATA}
              onChange={handleReasonChange}
              placeholder="취소 항목을 선택해주세요."
              id="cancelReason"
              aria-label="진료 취소 사유 선택"
            />
            {showInput && (
              <Div css={{ paddingTop: rem(10), flex: 1, input: { flex: 1 } }}>
                <Input
                  css={{
                    width: "100%",
                    fontSize: "inherit",
                    "&::placeholder": {
                      fontSize: "inherit",
                    },
                  }}
                  type="text"
                  placeholder="사유를 입력해주세요"
                  onChange={(e) => {
                    if (onChangeCancelCallReason)
                      //TODO: remove meaningless actionMeta
                      onChangeCancelCallReason(
                        {
                          value: e.target.value,
                          label: e.target.value,
                        },
                        {
                          action: "select-option",
                          option: {
                            label: e.target.value,
                            value: e.target.value,
                          },
                        }
                      );
                  }}
                />
              </Div>
            )}
          </Div>
          <RoundedButton
            onClick={cancelCall}
            color="black"
            css={{
              minWidth: rem(110),
              height: rem(44),
              "@bp1": { width: rem(140) },
            }}
          >
            진료취소
          </RoundedButton>
        </Div>
        <P css={{ color: "$gray04", fontSize: rem(13), paddingTop: rem(10) }}>
          *취소 사유는 고객에게 전달됩니다.
        </P>
      </Div>
    </Article>
  );
};
