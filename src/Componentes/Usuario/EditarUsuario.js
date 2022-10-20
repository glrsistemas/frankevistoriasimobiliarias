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
import { AiOutlineClose } from "react-icons/ai";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Typography,Grid,Box,TextField,MenuItem,FormControl,Select,InputLabel,Switch,FormLabel,FormControlLabel,FormGroup} from "@mui/material";
import Axios from "axios";
import useContextApi from "../Context";
import {useDropzone} from 'react-dropzone';
import avatarDefault from "../../assets/default/avatar.jpg";
import utils from "../../utils";


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
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
};

export default function EditarUsuario(props) {

  let Dados = props ? props : '';
  let idUsuario = props.idUsuario ? props.idUsuario : "";
  const { user } = useContextApi();
  const [cepForm, setCepForm] = React.useState([]);
  const [userById, setUserById] = React.useState([]);
  const [todasImob, setTodasImob] = useState([]);
  let [listPerfil, setListPerfil] = useState([]);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [imobiliaria, setImobiliaria] = useState("");
  const [admin, setAdmin] = useState(false);
  const [ativo, setAtivo] = useState(true);
  const [perfilUsuario, setPerfilUsuario] = useState([]);
  const [cpf, setCpf] = useState("");
  const [perfilUsuarioSelecionado, setPerfilUsuarioSelecionado] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [avatar, setAvatar] = useState(""); 
  const [files, setFiles] = useState([]); 
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const buscaUserById = () => {
    Axios.get(utils.getBaseUrl()+"usuario/findById/"+idUsuario).then((res) => {
      let dados = res.data;

      setNome(dados.nome);
      setSobrenome(dados.sobrenome);
      setImobiliaria(dados.idImobiliaria);
      setAtivo(dados.ativo);
      setCpf(dados.cpf);
      setCelular(dados.celular);
      setEmail(dados.email);
      setLogin(dados.login);
      setSenha(dados.senha);
      setCepForm(dados.idEndereco);
      setAvatar(dados.uri);
      setPerfilUsuario(dados.idPerfilUsuario.id);

      console.log(dados.idImobiliaria.id)

    }).catch((err) => {
      console.log("Erro ao buscar Usuário");
    });
  }
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name ? file.name : avatarDefault}>
      <div style={thumbInner}>
        <img
          src={file.preview ? file.preview : (avatar ? avatar : avatarDefault)}
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

  useEffect(() => {
    let listaPerfil = [];

    Axios.get(utils.getBaseUrl()+"perfilUsuario/findAll")
      .then((res) => {
        listaPerfil = res.data;
        setListPerfil(listaPerfil);
      })
      .catch((err) => {
        console.log(err);
      });
  }, listPerfil);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

    buscaUserById();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {

  }

  const buscaCep = (e) => {
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
      <Button variant="contained" onClick={handleClickOpen} sx={{width: '100%'}}>
        Editar Usuário
      </Button>
      <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={true}
            fullWidth={true}
            scroll="paper"
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
              <DialogContent dividers={true}>
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
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} style={thumbsContainer}>
                          <Box {...getRootProps({className: 'dropzone dz-image'})}>
                            <input {...getInputProps()} />
                            <p>Selecione ou arraste sua Imagem</p>
                            {thumbs}
                          </Box>
                    </Grid>
                    <Grid container spacing={2} xs={12} sm={12} md={6} lg={8} xl={9}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        label="Nome"
                        id="nome"
                        value={nome}
                        defaultValue={nome}
                        onChange={(e) => {
                          setNome(e.target.value);
                        }}
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
                        value={sobrenome}
                        defaultValue={sobrenome}
                        onChange={(e) => {
                          setSobrenome(e.target.value);
                        }}
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
                        value={cpf}
                        defaultValue={cpf}
                        onChange={(e) => {
                          setCpf(e.target.value);
                        }}
                        name="cpf"
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
                        label="Imobiliaria"
                        fullWidth
                        id="imobiliaria"
                        type="imobiliaria"
                        value={imobiliaria.nomeFantasia}
                        defaultValue={imobiliaria.nomeFantasia}
                        disabled
                        name="imobiliaria"
                        variant="outlined"
                      />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FormControl sx={{ m: 1 }} fullWidth>
                        <InputLabel id="label-select-perfil-usuario">
                            Perfil Usuário
                          </InputLabel>
                          <Select
                            labelId="label-select-perfil-usuario"
                            id="perfil_usuario"
                            value={perfilUsuario}
                            defaultValue={perfilUsuario ? perfilUsuario : ""}
                            onChange={(e) => {
                              setPerfilUsuario(e.target.value);
                            }}
                            label="Perfil Usuário"
                            variant="outlined"
                          >
                            <MenuItem value="">Selecione</MenuItem>
                            {listPerfil.map((pu) => (
                              <MenuItem value={pu.id}>
                                {pu.id + " - " + pu.descricao}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        label="Login"
                        fullWidth
                        id="login"
                        value={login}
                        defaultValue={login}
                        onChange={(e) => {
                          setLogin(e.target.value);
                        }}
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
                        onChange={(e) => {
                          setSenha(e.target.value);
                        }}
                        required
                        name="senha"
                        value={senha}
                        defaultValue={senha}
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
                      </span>{" "}
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
                        defaultValue={cepForm.cep ? cepForm.cep : ""}
                        value={cepForm.cep}
                        type="text"
                        variant="outlined"
                        onChange={(e) => buscaCep(e)}
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
                        defaultValue={cepForm.numero ? cepForm.numero : ""}
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
                        defaultValue={cepForm.complemento ? cepForm.complemento : ""}
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
                        defaultValue={cepForm.bairro ? cepForm.bairro : ""}
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
                        defaultValue={cepForm.cidade ? cepForm.cidade : ""}
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
                        defaultValue={cepForm.estado ? cepForm.estado : ""}
                        value={cepForm.uf}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdate}>
                  Atualizar
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
    </div>
  );
}
