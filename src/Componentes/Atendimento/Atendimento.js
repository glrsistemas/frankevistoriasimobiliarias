import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import Navbar from "../Navbar/index";
import { styled } from "@mui/material/styles";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ImageList,
  ImageListItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AiOutlineUserAdd } from "react-icons/ai";
import Grid2 from "@mui/material/Unstable_Grid2";
import { SiOpenstreetmap } from "react-icons/si";
import { FaUserLock } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { MdModeEditOutline } from "react-icons/md";

const rows = [
  {
    id: 1,
    descricao: "Snow",
    imovel: "Jon",
    contestacao: "Sim",
    editar: <Button>Editar</Button>,
  },
  {
    id: 2,
    descricao: "Lannister",
    imovel: "Cersei",
    contestacao: "Não",
    editar: <Button>Editar</Button>,
  },
  {
    id: 3,
    descricao: "Lannister",
    imovel: "Jaime",
    contestacao: "Sim",
    editar: <Button>Editar</Button>,
  },
  {
    id: 4,
    descricao: "Stark",
    imovel: "Arya",
    contestacao: "Não",
    editar: <Button>Editar</Button>,
  },
  {
    id: 5,
    descricao: "Targaryen",
    imovel: "Daenerys",
    contestacao: "Sim",
    editar: <Button>Editar</Button>,
  },
  {
    id: 6,
    descricao: "Melisandre",
    imovel: null,
    contestacao: "Sim",
    editar: <Button>Editar</Button>,
  },
  {
    id: 7,
    descricao: "Clifford",
    imovel: "Ferrara",
    contestacao: "Não",
    editar: <Button>Editar</Button>,
  },
  {
    id: 8,
    descricao: "Frances",
    imovel: "Rossini",
    contestacao: "Não",
    editar: <Button>Editar</Button>,
  },
  {
    id: 9,
    descricao: "Roxie",
    imovel: "Harvey",
    contestacao: "Sim",
    editar: <Button>Editar</Button>,
  },
];

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>Nenhum atendimento encontrado</Box>
    </StyledGridOverlay>
  );
}

const handleSubmit = () => {};

export default function DataGridDemo() {
  const [tamanhoPagina, setTamanhoPagina] = useState(5);
  const [openCrudAtendimento, setOpenCrudAtendimento] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [isLoading, setIsLoading] = useState(false);

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];


  const columns = [
    {
      field: "images",
      headerName: "",
      renderCell:  (params)=>{
        return ((
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ))},
    },
    {
      field: "id",
      headerName: "Código",
    },
    {
      field: "descricao",
      headerName: "Descrição",
      editable: false,
    },
    {
      field: "imovel",
      headerName: "Imóvel",
      editable: false,
    },
    {
      field: "contestacao",
      headerName: "Contestação",
      filterable: false,
    },
    {
      field: "editar",
      headerName: "Editar",
      filterable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = true;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<MdModeEditOutline />}
              label="Save"
              onClick={() => {
                handleEdit(10);
              }}
            />,
            <GridActionsCellItem
              icon={<TiCancel />}
              label="Cancel"
              className="textPrimary"
              // onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
      },
    },
  ];

  const handleEdit = function (num) {
    setOpenCrudAtendimento(true);
    alert(num);
  };

  const handleClickOpen = () => () => {
    setOpenCrudAtendimento(true);
  };

  const handleClose = () => {
    setOpenCrudAtendimento(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openCrudAtendimento) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openCrudAtendimento]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1301 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
        {/* <RiLoader4Line/> */}
      </Backdrop>
      <Navbar />
      {openCrudAtendimento && (
        <div>
          <Dialog
            open={openCrudAtendimento}
            onClose={handleClose}
            fullScreen={true}
            fullWidth={true}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            className="dialog-container"
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              autoComplete="new-password"
            >
              <DialogTitle id="scroll-dialog-title">
                Cadastro de usuário
              </DialogTitle>
              <DialogContent dividers={scroll === "paper"}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <Grid
                    container
                    spacing={0}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Typography variant="h6" gutterBottom component="div">
                      <span className="icon-form-default">
                        <FaUserLock />
                      </span>{" "}
                      Dados Pessoais!
                    </Typography>
                  </Grid>
                  <Grid container spacing={2} sm={12} md={12} lg={12} xl={12}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Nome"
                        id="nome"
                        required
                        name="nome"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Sobrenome"
                        id="sobrenome"
                        required
                        name="sobrenome"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="CPF"
                        id="cpf"
                        name="cpf"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Celular"
                        id="celular"
                        name="celular"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        label="E-mail"
                        fullWidth
                        id="email"
                        type="email"
                        required
                        validate
                        name="email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        label="Login"
                        fullWidth
                        id="login"
                        required
                        name="login"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Senha:"
                        id="senha"
                        required
                        name="senha"
                        type="password"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                      <FormControl
                        component="fieldset"
                        sx={{ m: 1, textAlign: "center" }}
                        fullWidth
                      >
                        <FormLabel component="legend">
                          Usuário Ativo ?{" "}
                        </FormLabel>
                        <FormGroup sx={{ alignItems: "center" }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={true}
                                justifyContent="center"
                                inputProps={{ "aria-label": "Ativo" }}
                                name="ativo"
                              />
                            }
                            label={"Ativo"}
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                      <FormControl
                        component="fieldset"
                        sx={{ m: 1, textAlign: "center" }}
                        fullWidth
                      >
                        <FormLabel component="legend">Admin ?</FormLabel>
                        <FormGroup sx={{ alignItems: "center" }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={true}
                                justifyContent="center"
                                inputProps={{ "aria-label": "Administrador" }}
                                name="admin"
                              />
                            }
                            label={"Sim"}
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={0}
                    mt={2}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Typography variant="h6" gutterBottom component="div">
                      <span className="icon-form-default">
                        <SiOpenstreetmap />
                      </span>
                      Endereço
                    </Typography>
                  </Grid>
                  <Grid container spacing={2} sm={12} md={12} lg={12} xl={12}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="CEP"
                        id="cep"
                        required
                        name="cep"
                        type="text"
                        variant="outlined"
                        // onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Logradouro"
                        id="logradouro"
                        required
                        name="logradouro"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Número"
                        id="numero"
                        required
                        name="numero"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Complemento"
                        id="complemento"
                        name="complemento"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Bairro"
                        id="bairro"
                        required
                        name="bairro"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Cidade"
                        id="cidade"
                        required
                        name="cidade"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Estado"
                        id="estado"
                        required
                        name="estado"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Adicionar
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </div>
      )}

      <div className="ui-container">
        <Grid2 container className="ui-linha-superior-grid">
          <Grid2 sm={6} md={8}>
            <Typography variant="h6" gutterBottom component="div">
              Atendimentos
            </Typography>
          </Grid2>
          <Grid2 sm={6} md={4} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4E0F1E" }}
              onClick={handleClickOpen()}
            >
              <AiOutlineUserAdd />
            </Button>
          </Grid2>
        </Grid2>

        <Box sx={{ height: 400, width: "100%" }} mt={2}>
          <DataGrid
            className="grid-button"
            components={{
              Toolbar: GridToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 1000, background: "red" },
              },
            }}
            rows={rows}
            columns={columns}
            pageSize={tamanhoPagina}
            onPageSizeChange={(newPageSize) => setTamanhoPagina(newPageSize)}
            rowsPerPageOptions={[5, 10, 20, 30, 50]}
            pagination
            // disableSelectionOnClick
            onCellClick={(e) => {
              console.log(e.id);
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
    </>
  );
}
