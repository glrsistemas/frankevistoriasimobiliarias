import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SiOpenstreetmap } from "react-icons/si";
import { FaUserLock } from "react-icons/fa";
import Navbar from "../Navbar";
import { AiFillCamera, AiOutlineClose } from "react-icons/ai";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Typography,Grid,Box,TextField,MenuItem,FormControl,Select,InputLabel,Switch,FormLabel,FormControlLabel,FormGroup, Backdrop, CircularProgress, Avatar, IconButton} from "@mui/material";
import Axios from "axios";
import useContextApi from "../Context";
import {useDropzone} from 'react-dropzone';
import avatarDefault from "../../assets/default/avatar.jpg";
import utils from "../../utils";
import { GiModernCity } from "react-icons/gi";

const thumbsContainerEdit = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  textAlign: 'center',
  justifyContent: 'center',
  marginTop: 10
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
  zIndex: 1
};


export default function EditarImobiliaria(props) {

  let Dados = props ? props : '';
  let idImob = props.idImob ? props.idImob : "";
  const [imobById, setImobById] = React.useState([]);
  const { user, imobiliariaUsuario, isLoading, setIsLoading} = useContextApi();
  const [scroll, setScroll] = React.useState("paper");
  const [cepForm, setCepForm] = React.useState([]);
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
  const [idEndereco, setIdEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [files, setFiles] = useState([]);
  const [uri, setUri] = useState("");

  const buscaImobById = () => {
    setIsLoading(true);
    Axios.get(utils.getBaseUrl()+"imobiliaria/findById/"+idImob).then((res) => {
      let dados = res.data;
      setIsLoading(false);
      setNomeFantasia(dados.nomeFantasia);
      setRazaoSocial(dados.razaoSocial);
      setAtivo(dados.ativo);
      setCnpj(dados.cnpj);
      setCelular(dados.celular);
      setEmail(dados.email);
      setIdEndereco(dados.idEndereco.id);
      setCep(dados.idEndereco.cep);
      setNumero(dados.idEndereco.numero);
      setBairro(dados.idEndereco.bairro);
      setLogradouro(dados.idEndereco.logradouro);
      setCidade(dados.idEndereco.cidade);
      setEstado(dados.idEndereco.estado);
      setCepForm(dados.idEndereco);
      setUri(dados.uri);

    }).catch((err) => {
      console.log("Erro ao buscar Usuário");
      setIsLoading(false);
    });
  }

  function handleUpdate () {
    setIsLoading(true);
    Axios.put(utils.getBaseUrl()+"endereco/update", {
      id: idEndereco,
      cep: cep,
      bairro: bairro,
      logradouro: logradouro,
      cidade: cidade,
      numero: numero,
      complemento: complemento,
      estado: estado,
    })
      .then((end) => {
        setIsLoading(false);
        if (end.data) {
          Axios.put(
            utils.getBaseUrl()+"imobiliaria/update",
            {
                id: idImob,
                nomeFantasia: nomeFantasia,
                razaoSocial: razaoSocial,
                ativo: ativo,
                cnpj: cnpj,
                celular: celular,
                email: email,
                file: files[0]
            },
            {   headers: {
                "Content-Type": "multipart/form-data"
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
        setIsLoading(false);
        console.log(err);
      });
  }
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name ? file.name : avatarDefault}>
      <div style={thumbInner}>
        <img
          src={file.preview ? file.preview : avatarDefault}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview ? file.preview : avatarDefault) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

    buscaImobById();
  };

  const handleClose = () => {
    setOpen(false);
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
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  return (
    <div>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1301 }}
          open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
      <Button variant="contained" onClick={handleClickOpen} sx={{width: '100%'}}>
        Editar Imobiliaria
      </Button>
      <Dialog
            open={open}
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
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={3} style={thumbsContainerEdit}>
                      {!utils.isEmpty(files[0]) && 
                      thumbs
                      }
                      {utils.isEmpty(files[0]) && 
                      <Avatar
                      alt={nomeFantasia}
                      src={uri ? uri : avatarDefault}
                      sx={{ width: "200px", height: "auto", padding: "10px" }}
                      key={uri}
                    />
                      }
                      
                      <Box  {...getRootProps({className: 'dropzone dz-image-edit'})}>                    
                          <IconButton aria-label="fingerprint" sx={{color: '#f00'}}>
                            <input {...getInputProps()} />
                              <AiFillCamera />
                            </IconButton>
                            <span>Selecione ou Arraste sua Imagem ! </span>
                          </Box>
                    </Grid>
                    <Grid container spacing={2} xs={12} sm={12} md={6} lg={8} xl={9}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Nome Fantasia"
                        id="nomeFantasia"
                        value={nomeFantasia}
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
                        value={cep}
                        onChange={(e) => {
                          setCep(e.target.value);
                        }}
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
                        onChange={(e) => {
                          setLogradouro(e.target.value);
                        }}
                        value={logradouro}
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
                        value={numero}
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
                        value={complemento}
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
                        value={bairro}
                        onChange={(e) => {
                          setBairro(e.target.value);
                        }}
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
                        onChange={(e) => {
                          setCidade(e.target.value);
                        }}
                        value={cidade}
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
                        onChange={(e) => {
                          setEstado(e.target.value);
                        }}
                        value={estado}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpdate}>
                Adicionar
              </Button>
            </DialogActions>
          </Dialog>
    </div>
  );
}
