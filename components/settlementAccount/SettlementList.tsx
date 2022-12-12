import { Divider } from "antd";
import { rem } from "polished";
import { useState, useEffect } from "react";
import { Grid, List, Flex, Title, Year, ListCard } from "./styles";
import { api } from "~/woozooapi";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { selectCounselorId } from "~/store/doctorInfoForChangeSlice";

const Subtitle = styled.span`
  height: 17px;
  flex-grow: 0;
  margin: 3px 102px 25px 0;
  font-family: NotoSansCJKKR;
  font-size: 12px;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: -0.36px;
  text-align: left;
`

const Prev = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m18 8-6 7 6 7" stroke="#333" strokeLinecap="round" />
  </svg>
);

const Next = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m12 8 6 7-6 7" stroke="#333" strokeLinecap="round" />
  </svg>
);

export const SettlementList = () => {
  const currentYear = new Date().getFullYear();
  const [list, setList] = useState<any>();
  const [year, setYear] = useState<number>(currentYear);
  const [current, setCurrent] = useState(0);
  const userid = useSelector(selectCounselorId);
  const month = [
    {
      name: "apr",
      value: list?.apr,
    },
    {
      name: "aug",
      value: list?.aug,
    },
    {
      name: "dec",
      value: list?.dec,
    },
    {
      name: "feb",
      value: list?.feb,
    },
    {
      name: "jan",
      value: list?.jan,
    },
    {
      name: "jul",
      value: list?.jul,
    },
    {
      name: "jun",
      value: list?.jun,
    },
    {
      name: "mar",
      value: list?.mar,
    },
    {
      name: "may",
      value: list?.may,
    },
    {
      name: "nov",
      value: list?.nov,
    },
    {
      name: "oct",
      value: list?.oct,
    },
    {
      name: "sep",
      value: list?.sep,
    },
  ]
  /*
    useEffect(() => {
    api.settlementAccount.getSettlementList(year).then((response) => {
      setList(response[year]);
      // Object.keys(list?[year]).forEach((key)=> {
      //   console.log(key)
      // })
    });
  }, [year]);
   */

  useEffect(() => {
    if (userid) {
      api.counselor.calculate(userid, current).then((res) => {
        console.log("list?", res.data)
        setList(res.data)
      })
    }
  }, [userid, current])

  console.log("u")



  const handlePrevious = () => {
    setCurrent(current - 1);
    setYear(year - 1);
  };
  const handleNext = () => {
    setYear(year + 1);
    setCurrent(current + 1);
  };

  useEffect(() => {

    console.log("current", current);
  })
  return (
    <Flex
      css={{
        flexDirection: "column",
        gap: rem(0),
      }}
    >
      <Title>예상 정산 금액</Title>
      <Subtitle style={{ color: "#eb541e", marginBottom: `${rem(25)}` }}>카드 수수료를 제외한 예상 정산 금액이며, 수동 정산 등으로 금액이 다소 상이 할 수 있습니다.</Subtitle>
      <Grid
        css={{
          width: "100%",
          height: "fit-content",
          minHeight: "200px",
          borderRadius: rem(20),
          backgroundColor: "$white",
          padding: `0 ${rem(29)} 0 ${rem(30)}`,
        }}
      >
        <Year>
          <span>{year}</span>
          <Flex
            css={{ justifyContent: "left", gap: rem(6), marginLeft: rem(-9) }}
          >
            <button onClick={handlePrevious}>
              <Prev />
            </button>
            <button
              onClick={handleNext}
              disabled={year === currentYear ? true : false}
              className={year === currentYear ? "disabled" : undefined}
            >
              <Next />
            </button>
          </Flex>
        </Year>
        <List>
          {
            month.map((res: any, index: number) => {
              return <>
                <ListCard key={index}>
                  <span className="month">{index + 1}월</span>
                  <span className="amount">{res.value?.toLocaleString()}원</span>
                </ListCard>
                {<Divider />}
              </>
            })
          }
        </List>
        {/* <List>
          <ListCard>
            <span className="month">11월</span>
            <span className="amount">5,000,000원</span>
          </ListCard>
          <Divider />
        </List> */}
      </Grid>
    </Flex >
  );
};
