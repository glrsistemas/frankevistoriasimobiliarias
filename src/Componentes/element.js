import { Autocomplete, TextField } from '@mui/material';
import React,{useState} from 'react'

export default function Element(props){

   const [options,setOptions] = useState({});

    if(props.data){
        setOptions(props.data);
    }

    let typeInput = props.typeInput ? props.typeInput : "text";
    let labelInput = props.labelInput ? props.labelInput : "Selecione";
    let idComponent = props.idComponent ? props.idComponent : "";

    return(
<div>
    {typeInput === "complete" &&
    <>
     <Autocomplete
      disablePortal
      id={idComponent}
      options={options}
      renderInput={(params) => <TextField {...params} label={labelInput} />}
    />
    </>
    }
</div>
    );

}