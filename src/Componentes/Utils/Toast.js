import React, {useState} from 'react'
import {Alert, Snackbar, AlertTitle} from "@mui/material";


export default function Toast(props){
let [open, setOpen] = useState(props.open);

let title = props.title; 
let msg = props.msg; 
let strong = props.strong;
let type = props.type; 
let color = props.color;


    return (
    <Snackbar
          open={open}
          anchorOrigin={{ vertical:"top", horizontal:"center" }}
          autoHideDuration={2000}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Alert severity={type} variant="filled" onClose={() => {
            setOpen(false);
          }}>
            <AlertTitle>{title}</AlertTitle>
                  {msg}
            <strong>{strong ? (" "+strong) : ''}</strong>
          </Alert>
        </Snackbar>
    );
}

