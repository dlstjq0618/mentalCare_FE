import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { rem } from 'polished'
import styled, { css } from 'styled-components';
import { useFormContext } from "react-hook-form";
import { useSelector } from 'react-redux';
import { selectCounselingInfoData } from '~/store/calendarDetailSlice';

interface IStyled {
  button?: boolean;
}


const Item = styled.div<IStyled>`
  border: 1px solid lightgray;
  text-align: center;
  height: ${rem(35)};
  padding: ${rem(4.5)};
  border-radius: 35px;
  ${(props) =>
    props.button &&
    css`
        color: #eb541e;
        border: 1px solid #eb541e;
    `}
`;

export function RowAndColumnSpacing() {
  const { register, setValue, setError, trigger, getValues, formState, watch } =
    useFormContext();
  const infoData = useSelector(selectCounselingInfoData);

  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [users, setUsers] = useState<any>([]);

  const findData = (data: any) => {
    return data.name === '대인관계'
  }
  const findData1 = (data: any) => {
    return data.name === '가족/육아'
  }
  const findData2 = (data: any) => {
    return data.name === '진로/직장'
  }
  const findData3 = (data: any) => {
    return data.name === '트라우마'
  }
  const findData4 = (data: any) => {
    return data.name === '고민상담'
  }
  const findData5 = (data: any) => {
    return data.name === '연애/결혼'
  }
  const findData6 = (data: any) => {
    return data.name === '청소년'
  }
  const findData7 = (data: any) => {
    return data.name === '불안/우울'
  }
  const findData8 = (data: any) => {
    return data.name === '자존감'
  }

  const onCreate = (value: string) => {
    const user = {
      name: value,
    }

    setUsers([...users, user]);
  }

  const onRemove = (name: string) => {
    setUsers(users.filter((user: { name: string; }) => user.name !== name));
  };

  const handleCheckControlls = (name: number) => {
    if (name === 1 && !checked) {
      onCreate("대인관계")
    } else if (name === 1 && checked) {
      onRemove("대인관계")
    }
  }
  const handleCheckControlls2 = (name: number) => {
    if (name === 2 && !checked1) {
      onCreate("가족/육아")
    } else if (name === 2 && checked1) {
      onRemove("가족/육아")
    }
  }
  const handleCheckControlls3 = (name: number) => {
    if (name === 3 && !checked2) {
      onCreate("진로/직장")
    } else if (name === 3 && checked2) {
      onRemove("진로/직장")
    }
  }
  const handleCheckControlls4 = (name: number) => {
    if (name === 4 && !checked3) {
      onCreate("트라우마")
    } else if (name === 4 && checked3) {
      onRemove("트라우마")
    }
  }
  const handleCheckControlls5 = (name: number) => {
    if (name === 5 && !checked4) {
      onCreate("고민상담")
    } else if (name === 5 && checked4) {
      onRemove("고민상담")
    }
  }
  const handleCheckControlls6 = (name: number) => {
    if (name === 6 && !checked5) {
      onCreate("연애/결혼")
    } else if (name === 6 && checked5) {
      onRemove("연애/결혼")
    }
  }
  const handleCheckControlls7 = (name: number) => {
    if (name === 7 && !checked6) {
      onCreate("청소년")
    } else if (name === 7 && checked6) {
      onRemove("청소년")
    }
  }
  const handleCheckControlls8 = (name: number) => {
    if (name === 8 && !checked7) {
      onCreate("불안/우울")
    } else if (name === 8 && checked7) {
      onRemove("불안/우울")
    }
  }
  const handleCheckControlls9 = (name: number) => {
    if (name === 9 && !checked8) {
      onCreate("자존감")
    } else if (name === 9 && checked8) {
      onRemove("자존감")
    }
  }

  useEffect(() => {
    setValue('counseling_subject', users)
  }, [users])

  useEffect(() => {
    if (infoData.counselingSubject !== null) {
      setUsers(infoData.counselingSubject)
    } else {
      setUsers([])
    }
  }, [infoData])


  useEffect(() => {
    infoData.counselingSubject?.find(findData) !== undefined ? setChecked(true) : setChecked(false);
    infoData.counselingSubject?.find(findData1) !== undefined ? setChecked1(true) : setChecked1(false)
    infoData.counselingSubject?.find(findData2) !== undefined ? setChecked2(true) : setChecked2(false)
    infoData.counselingSubject?.find(findData3) !== undefined ? setChecked3(true) : setChecked3(false)
    infoData.counselingSubject?.find(findData4) !== undefined ? setChecked4(true) : setChecked4(false)
    infoData.counselingSubject?.find(findData5) !== undefined ? setChecked5(true) : setChecked5(false)
    infoData.counselingSubject?.find(findData6) !== undefined ? setChecked6(true) : setChecked6(false)
    infoData.counselingSubject?.find(findData7) !== undefined ? setChecked7(true) : setChecked7(false)
    infoData.counselingSubject?.find(findData8) !== undefined ? setChecked8(true) : setChecked8(false)
  }, [infoData.counselingSubject])


  return (
    <Box sx={{ width: '100%', cursor: 'pointer', marginTop: "1.84375rem" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Item button={checked} onClick={() => { setChecked(!checked), handleCheckControlls(1) }}>대인관계</Item>
        </Grid>
        <Grid item xs={4}>
          <Item button={checked1} onClick={() => { setChecked1(!checked1), handleCheckControlls2(2) }}>가족/육아</Item>
        </Grid>
        <Grid item xs={4}>
          <Item button={checked2} onClick={() => { setChecked2(!checked2), handleCheckControlls3(3) }}>진로/직장</Item>
        </Grid>
        <Grid item xs={4}>
          <Item button={checked3} onClick={() => { setChecked3(!checked3), handleCheckControlls4(4) }}>트라우마</Item>
        </Grid>
        <Grid item xs={4}>
          <Item button={checked4} onClick={() => { setChecked4(!checked4), handleCheckControlls5(5) }}>고민상담</Item>
        </Grid>
        <Grid item xs={4}>
          <Item button={checked5} onClick={() => { setChecked5(!checked5), handleCheckControlls6(6) }}>연애/결혼</Item>
        </Grid>
        <Grid item xs={4}>
          <Item button={checked6} onClick={() => { setChecked6(!checked6), handleCheckControlls7(7) }}>청소년</Item>
        </Grid>
        <Grid item xs={4}>
          <Item button={checked7} onClick={() => { setChecked7(!checked7), handleCheckControlls8(8) }}>불안/우울</Item>
        </Grid>
        <Grid item xs={4}>
          <Item button={checked8} onClick={() => { setChecked8(!checked8), handleCheckControlls9(9) }}>자존감</Item>
        </Grid>
      </Grid>
    </Box>
  );
}