import { useCombobox } from "downshift";
import { rem } from "polished";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { Div, Input, Li, Span, SettingsEditButton, Ul } from "~/components";
import { Hospital, HospitalSearchResponse } from "~/interfaces";
import { api } from "~/woozooapi";

export function AutocompleteHospitalSearch({
  hospitalUserId,
  handleSelect,
}: {
  hospitalUserId?: number;
  handleSelect: (hospital: Hospital) => void;
}) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [items, setItems] = useState<HospitalSearchResponse["data"]>([]);

  const { getMenuProps, getInputProps, getComboboxProps, getItemProps } =
    useCombobox({
      isOpen: true,
      items,
      itemToString: (item) => item?.name ?? "",
      onInputValueChange: async ({ inputValue: keyword }) => {
        setKeywords((keywords) =>
          !!keyword ? [...keywords, keyword] : keywords
        );

        try {
          const data = hospitalUserId
            ? await api.hospital.searchByNameWithUserId(
                keyword ?? "",
                hospitalUserId
              )
            : await api.hospital.searchByName(keyword ?? "");

          setItems(data.data);

          if (!keyword) {
            setItems([]);
            setKeywords([]);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      },
    });

  return (
    <Div>
      {/* <Label {...getLabelProps()}>병원 등록</Label> */}
      <Div {...getComboboxProps()}>
        <Input
          css={{
            width: "100%",
            borderColor: "$gray01",
            boxShadow: `0 ${rem(3)} ${rem(3)} 0 rgba(140, 140, 140, 0.3);`,
          }}
          placeholder="병원 이름, 전화번호로 검색"
          {...getInputProps()}
        />
      </Div>
      {!!items.length ? (
        <Div
          role="status"
          css={{
            color: "$gray03",
            paddingTop: rem(20),
            paddingBottom: rem(3),
            borderBottom: "1px solid $gray03",
            data: {
              marginLeft: rem(4),
              color: "$primary",
              fontWeight: "bold",
            },
          }}
        >
          검색 결과 <data>{items.length}</data>
        </Div>
      ) : (
        <Div css={{ height: rem(46) }} />
      )}
      <Ul
        css={{
          height: rem(360),
          maxHeight: rem(360),
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        {...getMenuProps()}
      >
        {items?.map((item, index) => (
          <Li
            css={{
              borderBottom: "1px dashed $gray05",
              paddingTop: rem(20),
              paddingBottom: rem(18),
              display: "grid",
              gridTemplateColumns: "1fr 80px",
            }}
            key={`${item}-${index}`}
            {...getItemProps({ item, index })}
          >
            <Span
              css={{
                padding: `${rem(8)} 0`,
                gridColumn: "1/2",
                fontSize: rem(16),
                fontWeight: "bold",
                "&.active": {
                  color: "$primary",
                },
              }}
            >
              <Highlighter
                activeIndex={0}
                activeStyle={{
                  color: "#eb541e",
                  padding: 0,
                  backgroundColor: "transparent",
                }}
                searchWords={keywords}
                textToHighlight={item.name}
              />
            </Span>
            <SettingsEditButton
              css={{ gridColumn: "2/3", gridRow: "1/3" }}
              onClick={() => handleSelect(item)}
            >
              선택
            </SettingsEditButton>
            <Span
              css={{ gridColumn: "1/2", color: "$gray01", fontSize: rem(14) }}
            >
              {item.phone}
            </Span>
            <Span
              css={{
                paddingTop: rem(10),
                gridColumn: "1/3",
                color: "$gray01",
                fontSize: rem(14),
              }}
            >
              {item.address1}
            </Span>
          </Li>
        ))}
      </Ul>
    </Div>
  );
}
