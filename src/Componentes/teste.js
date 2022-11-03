import * as React from 'react';
import Button from '@mui/material/Button';
import Toast from './Utils/Toast';


export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [rendered, setRendered] = React.useState(false);

  const handleClickOpen = () => {
    setRendered(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {rendered &&
      <Toast type="success" msg="Sucesso de Toast!" title="Parabéns" open={false}  strong={"Você realizou um componente"} color="green"/> 
      }
      <Button variant="outlined" sx={{mt:5, ml:5}} onClick={handleClickOpen}>
        Clica ai
      </Button>
    </div>
  );
}
