import React, { useEffect, useState } from "react";
import { rem } from "polished";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CheckboxLabels from "~/components/CheckBox/MuiCheckBox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { setTutorialArrayState, selectTutorialWorkWeekState, setTutorialWorkWeekDay, setTutorialWorkWeekState, selectTutorialWorkWeekDay, selectTutorialArrayState } from "~/store/settingsSlice";

interface IDateProps {
  date?: string[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f7f7f7",
  ...theme.typography.body2,
  height: 54,
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 60,
  fontSize: 22,
  padding: "12.3px 19.4px 17.2px 19.3px"
}));

export default function MuiGrid(props: IDateProps) {
  const dispatch = useDispatch()
  const selectWeekstate = useSelector(selectTutorialWorkWeekState);
  const [selectDay, setSelectDay] = useState<any>([]);
  // const sortData: number[] = selectDay.slice().sort((a: number, b: number) => a - b)
  const [itemState, setItemState] = useState(false);
  const [itemState1, setItemState1] = useState(false);
  const [itemState2, setItemState2] = useState(false);
  const [itemState3, setItemState3] = useState(false);
  const [itemState4, setItemState4] = useState(false);
  const [itemState5, setItemState5] = useState(false);
  const [itemState6, setItemState6] = useState(false);
  const index = [0, 1, 2, 3, 4, 5, 6]
  const [weekState, setWeekState] = useState(false)


  if (selectDay.length === 0) {
    dispatch(setTutorialArrayState("null"))
  } else {
    dispatch(setTutorialArrayState("notnull"))
  }

  useEffect(() => {
    dispatch(setTutorialWorkWeekDay(selectDay))

    if (itemState5 || itemState6) {
      dispatch(setTutorialWorkWeekState("weekEnd"));
    } else {
      dispatch(setTutorialWorkWeekState("weekDay"));
    }
  })


  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={0}
        style={{ marginTop: "2vh", justifyContent: "space-between" }}
      >
        <Grid item xs={1.5} onClick={() => { setItemState(!itemState), setSelectDay([...selectDay, index[0]]) }}>
          <Item style={itemState ? { background: "#eb541e", color: "#fff", cursor: "pointer" } : { background: "#f7f7f7", cursor: "pointer" }}>월</Item>
        </Grid>
        <Grid item xs={1.5} onClick={() => { setItemState1(!itemState1), setSelectDay([...selectDay, index[1]]) }}>
          <Item style={itemState1 ? { background: "#eb541e", color: "#fff", cursor: "pointer" } : { background: "#f7f7f7", cursor: "pointer" }}>화</Item>
        </Grid>
        <Grid item xs={1.5} onClick={() => { setItemState2(!itemState2), setSelectDay([...selectDay, index[2]]) }}>
          <Item style={itemState2 ? { background: "#eb541e", color: "#fff", cursor: "pointer" } : { background: "#f7f7f7", cursor: "pointer" }}>수</Item>
        </Grid>
        <Grid item xs={1.5} onClick={() => { setItemState3(!itemState3), setSelectDay([...selectDay, index[3]]) }}>
          <Item style={itemState3 ? { background: "#eb541e", color: "#fff", cursor: "pointer" } : { background: "#f7f7f7", cursor: "pointer" }}>목</Item>
        </Grid>
        <Grid item xs={1.5} onClick={() => { setItemState4(!itemState4), setSelectDay([...selectDay, index[4]]) }}>
          <Item style={itemState4 ? { background: "#eb541e", color: "#fff", cursor: "pointer" } : { background: "#f7f7f7", cursor: "pointer" }}>금</Item>
        </Grid>
        <Grid item xs={1.5} onClick={() => { setItemState5(!itemState5), setSelectDay([...selectDay, index[5]]) }}>
          <Item style={itemState5 ? { background: "#eb541e", color: "#fff", cursor: "pointer" } : { background: "#f7f7f7", cursor: "pointer" }}>토</Item>
        </Grid>
        <Grid item xs={1.5} onClick={() => { setItemState6(!itemState6), setSelectDay([...selectDay, index[6]]) }}>
          <Item style={itemState6 ? { background: "#eb541e", color: "#fff", cursor: "pointer" } : { background: "#f7f7f7", cursor: "pointer" }}>일</Item>
        </Grid>
      </Grid>
      {selectWeekstate !== "" ? (
        <>
          <p style={{ fontSize: rem(22), padding: rem(19), margin: 0, paddingTop: rem(93) }}>
            진료를 쉬는 점심 시간은 어떻게 되나요?
          </p>
          <CheckboxLabels day={selectWeekstate}></CheckboxLabels>
        </>
      ) : null}
    </Box>
  );
}
