import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Navbar from "../Navbar";
import { AiOutlineUserAdd } from "react-icons/ai";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Typography,Grid,Card,CardContent, Avatar,TextField,MenuItem,FormControl,Select,InputLabel,Switch,FormLabel,FormControlLabel,FormGroup, Box} from "@mui/material";
import Axios from "axios";
import useContextApi from "../Context";
import utils from "../../utils";
import { SiOpenstreetmap } from "react-icons/si";
import { GiModernCity } from "react-icons/gi";
import thumbDefault from "../../assets/default/default.jpg";
import { useDropzone } from "react-dropzone";


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '0px 25px'
};


const thumb = {
  display: 'inline-flex',
  borderRadius: 10,
  border: '1px solid #eaeaea',
  alignItems: 'center',
  marginBottom: 8,
  marginRight: 8,
  width: 250,
  height: 250,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  width: '100%',
  height: '100%'
};

const img = {
  display: 'block',
};


export default function Imobiliaria() {

  const { user, imobiliariaUsuario, setUser } = useContextApi();
  const [openCrudImobiliaria, setOpenCrudImobiliaria] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [cepForm, setCepForm] = React.useState([]);
  const [todasImob, setTodasImob] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': []
    },
    maxFiles:1,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [cnpj, setCnpj] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [files, setFiles] = useState([]);


  console.log(files);

  useEffect(() => {
    if (!user.administrador) {
      Axios.get(utils.getBaseUrl()+"imobiliaria/findAll")
        .then((res) => {
          setTodasImob(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, todasImob);

  const dataFormatada = (timestamp) => {
    let data = new Date(timestamp);

    let dia = data.getDay();
    let mes = data.getMonth();
    let ano = data.getFullYear();
    let hora = data.getHours();
    let minuto = data.getMinutes();

    if (dia < 10) {
      dia = "0" + dia;
    }

    if (mes < 10) {
      mes = "0" + mes;
    }
    data = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto;

    return data + "";
  };

  const handleSubmit = () => {

    let formImob = new FormData();

    formImob.append("nomeFantasia", nomeFantasia);
    formImob.append("razaoSocial", razaoSocial);
    formImob.append("ativo", ativo);
    formImob.append("cnpj", cnpj);
    formImob.append("celular", celular);
    formImob.append("email", email);
    formImob.append("file", files[0]);

    Axios.post(utils.getBaseUrl()+"endereco/save", {
      cep: cep,
      bairro: bairro,
      logradouro: logradouro,
      cidade: cidade,
      numero: numero,
      complemento: complemento,
      estado: estado,
    })
      .then((end) => {
        if (end.data) {
          Axios.post(
            utils.getBaseUrl()+"imobiliaria/save",
            formImob,
            {   headers: {
                  "Content-Type": "multipart/form-data",
                }               
            },
          )
            .then((usuario) => {
              console.log("Sucesso ao criar !");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    let buscaCep = e.target.value;

    if (buscaCep.length === 8) {
      Axios.get("https://viacep.com.br/ws/" + buscaCep + "/json/")
        .then((res) => {
          let dado = res.data;
          setCep(dado.cep);
          setBairro(dado.bairro);
          setLogradouro(dado.logradouro);
          setCidade(dado.localidade);
          setEstado(dado.uf);
          setCepForm(dado);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleClickOpen = () => () => {
    setOpenCrudImobiliaria(true);
    setScroll("paper");
  };

  const handleClose = () => {
    setCepForm([]);
    setOpenCrudImobiliaria(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openCrudImobiliaria) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openCrudImobiliaria]);

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name ? file.name : thumbDefault}>
      <div style={thumbInner}>
        <img
          src={file.preview ? file.preview : thumbDefault}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview ? file.preview : thumbDefault) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <Navbar />
      {openCrudImobiliaria && (
        <div>
          <Dialog
            open={openCrudImobiliaria}
            onClose={handleClose}
            fullScreen={true}
            fullWidth={true}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            sx={{ width: "90vw", margin: "5vw" }}
          >
            <DialogTitle id="scroll-dialog-title">
              Cadastro de Imobiliaria
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
                        <GiModernCity />
                      </span>
                      Dados da Empresa!
                    </Typography>
                  </Grid>
                  <Grid mt={1} container spacing={2} sm={12} md={12} lg={12} xl={12}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={3} style={thumbsContainer}>
                          <Box {...getRootProps({className: 'dropzone dz-image'})}>
                            <input {...getInputProps()} />
                            <p>Selecione ou arraste sua Imagem</p>
                            {thumbs}
                            {}
                          </Box>
                    </Grid>
                    <Grid container spacing={2} xs={12} sm={12} md={6} lg={8} xl={9}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Nome Fantasia"
                        id="nomeFantasia"
                        value={nomeFantasia}
                        defaultValue={nomeFantasia}
                        onChange={(e) => {
                          setNomeFantasia(e.target.value);
                        }}
                        required
                        name="nomeFantasia"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Razão Social"
                        id="razaoSocial"
                        value={razaoSocial}
                        defaultValue={razaoSocial}
                        onChange={(e) => {
                          setRazaoSocial(e.target.value);
                        }}
                        required
                        name="razaoSocial"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="CNPJ"
                        id="cnpj"
                        value={cnpj}
                        required
                        defaultValue={cnpj}
                        onChange={(e) => {
                          setCnpj(e.target.value);
                        }}
                        name="cnpj"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Celular"
                        id="celular"
                        value={celular}
                        defaultValue={celular}
                        onChange={(e) => {
                          setCelular(e.target.value);
                        }}
                        name="celular"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        label="E-mail"
                        fullWidth
                        id="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        value={email}
                        defaultValue={email}
                        required
                        validate
                        name="email"
                        variant="outlined"
                      />
                    </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <FormControl
                          component="fieldset"
                          sx={{ m: 0, textAlign: "center" }}
                          fullWidth
                        >
                          <FormLabel component="legend">
                            Imobiliaria
                          </FormLabel>
                          <FormGroup sx={{ alignItems: "center" }}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={ativo}
                                  justifyContent="center"
                                  onChange={(e) => {
                                    setAtivo(e.target.checked);
                                  }}
                                  inputProps={{ "aria-label": "Ativo" }}
                                  name="ativo"
                                />
                              }
                              label={ativo ? "Ativo" : "Inativo"}
                            />
                          </FormGroup>
                        </FormControl>
                      </Grid>
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
                  <Grid mt={1}container spacing={2} sm={12} md={12} lg={12} xl={12}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="CEP"
                        id="cep"
                        required
                        name="cep"
                        defaultValue={cepForm.cep}
                        value={cepForm.cep}
                        type="text"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Logradouro"
                        id="logradouro"
                        required
                        name="logradouro"
                        defaultValue={cepForm.logradouro}
                        value={cepForm.logradouro}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Número"
                        onChange={(e) => {
                          setNumero(e.target.value);
                        }}
                        id="numero"
                        required
                        name="numero"
                        defaultValue={""}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Complemento"
                        id="complemento"
                        name="complemento"
                        onChange={(e) => {
                          setComplemento(e.target.value);
                        }}
                        defaultValue={""}
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
                        defaultValue={cepForm.bairro}
                        value={cepForm.bairro}
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
                        defaultValue={cepForm.localidade}
                        value={cepForm.localidade}
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
                        defaultValue={cepForm.uf}
                        value={cepForm.uf}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>
                Adicionar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      <div className="ui-container">
        <Grid2 container  className="ui-linha-superior-grid">
          <Grid2 sm={6} md={8}>
            <Typography variant="h6" gutterBottom component="div">
              Imobiliarias
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
        {/* GRID DE USUÁRIO */}
        <Grid
          container
          spacing={0}
          
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          {todasImob.map((imob) => (
            <Grid item  sm={12} md={4} lg={3} xl={3}>
            <Card>
              <CardContent>
                <Grid  md={12} xl={12}>
                  <Grid item>
                    <Avatar
                      alt={imob.nomeFantasia}
                      variant="rounded"
                      src={imob.uri ? imob.uri : thumbDefault}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Grid>
                  <Grid item mt={1} sx={{padding: "0px 5px", color: "#000"}}>
                    <Grid className="nome-imobiliaria">{imob.nomeFantasia}</Grid>
                  </Grid>
                  <Grid item>
                    <Grid className="linha-dados"> <span className="dados-imobiliaria">Código:</span>{imob.id}</Grid>
                    <Grid className="linha-dados"> <span className="dados-imobiliaria">Cidade:</span>Cascavel-PR</Grid>
                    <Grid className="linha-dados"> <span className="dados-imobiliaria">Atendimentos:</span> 0</Grid>
                    <Grid className="linha-dados"> <span className="dados-imobiliaria">Data de Criação:</span>{dataFormatada(imob.dhRegistro)}</Grid>
                  </Grid>
                  <Grid  mt={2} item sx={{fontSize: "12px"}}>
                 <Button variant="contained"
              sx={{width: "100%"}}>Editar</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
