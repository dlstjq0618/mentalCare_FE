import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import MuiTextField from "@mui/material/TextField";


export default function TextField(props: ITextfield) {

  useEffect(() => {
    console.log(props.value)
  })

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <MuiTextField
        sx={{ fontSize: 20, textAlignLast: "center" }}
        id="standard-basic"
        variant="standard"
        type="number"
        color="warning"
        InputProps={{ inputProps: { min: 0, max: 10 } }}
        value={props.value}
      />
      원
    </Box>
  );
}

interface ITextfield {
  value?: any;
}
