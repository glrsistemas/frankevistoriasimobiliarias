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
import {Typography,Grid,Box,TextField,MenuItem,FormControl,Select,InputLabel,Switch,FormLabel,FormControlLabel,FormGroup, Backdrop, CircularProgress, IconButton, Avatar} from "@mui/material";
import Axios from "axios";
import useContextApi from "../Context";
import {useDropzone} from 'react-dropzone';
import avatarDefault from "../../assets/default/avatar.jpg";
import utils from "../../utils";
import { GiFingerPrint } from "react-icons/gi";


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

export default function EditarUsuario(props) {

  let Dados = props ? props : '';
  let idUsuario = props.idUsuario ? props.idUsuario : "";
  const { user, isLoading, setIsLoading } = useContextApi();
  const [cepForm, setCepForm] = React.useState([]);
  let [listPerfil, setListPerfil] = useState([]);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [imobiliaria, setImobiliaria] = useState("");
  const [admin, setAdmin] = useState(false);
  const [ativo, setAtivo] = useState(true);
  const [perfilUsuario, setPerfilUsuario] = useState([]);
  const [cpf, setCpf] = useState("");
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
  const [idEndereco, setIdEndereco] = useState(null);
  const [idImobiliaria, setIdImobiliaria] = useState(null);
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

    setIsLoading(true);
    let listaPerfil = [];

    Axios.get(utils.getBaseUrl()+"perfilUsuario/findAll")
      .then((res) => {
        listaPerfil = res.data;
        setListPerfil(listaPerfil);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(utils.getBaseUrl()+"usuario/findById/"+idUsuario).then((res) => {
      let dados = res.data;
      setIsLoading(false);
      setNome(dados.nome);
      setSobrenome(dados.sobrenome);
      setImobiliaria(dados.idImobiliaria);
      setAtivo(dados.ativo);
      setCpf(dados.cpf);
      setAdmin(dados.administrativo);
      setCelular(dados.celular);
      setEmail(dados.email);
      setLogin(dados.login);
      setSenha(dados.senha);
      setCep(dados.idEndereco.cep);
      setNumero(dados.idEndereco.numero);
      setCidade(dados.idEndereco.cidade);
      setEstado(dados.idEndereco.estado);
      setBairro(dados.idEndereco.bairro);
      setComplemento(dados.idEndereco.complemento);
      setLogradouro(dados.idEndereco.logradouro);
      setAvatar(dados.uri);
      setPerfilUsuario(dados.idPerfilUsuario.id);
      setIdEndereco(dados.idEndereco.id);
      setIdImobiliaria(dados.idImobiliaria.id);

      files[0].preview = dados.uri;

      console.log(dados.idImobiliaria.id)
    }).catch((err) => {
      console.log("Erro ao buscar Usu??rio");
      setIsLoading(false);
    });
  }
  let thumbs = files.map(file => (
    <div style={thumb} key={file.name ? file.name : avatarDefault}>
      <div style={thumbInner}>
        <img
          src={file.preview ? file.preview :  avatarDefault}
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

    buscaUserById();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    
    try {
      Axios.put(utils.getBaseUrl()+"endereco/update", {
        id: idEndereco,
        cep: cep,
        bairro: bairro,
        logradouro: logradouro,
        cidade: cidade,
        numero: numero,
        complemento: complemento,
        estado: estado
      }).then((end) => {
        Axios.put(utils.getBaseUrl()+"usuario/update", {
              id: idUsuario,
              nome: nome,
              sobrenome: sobrenome,
              imobiliariaEntity: idImobiliaria,
              perfilUsuario: perfilUsuario,
              ativo: ativo,
              cpf: cpf,
              email: email,
              celular: celular,
              login: login,
              endereco: idEndereco,
              senha: senha,
              administrativo: admin,
              file:files[0],
        }, { headers: {"Content-Type": "multipart/form-data"}}).then((data) => {
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      
    }

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
       <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1301 }}
          open={isLoading}
          >
            <CircularProgress color="inherit" />
          {/* <RiLoader4Line/> */}
          </Backdrop>
      <Button variant="contained" onClick={handleClickOpen} sx={{width: '100%'}}>
        Editar Usu??rio
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
                Cadastro de usu??rio
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
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3} style={thumbsContainerEdit}>
                      {!utils.isEmpty(files[0]) && 
                      thumbs
                      }
                      {utils.isEmpty(files[0]) && 
                      <Avatar
                      alt={nome + sobrenome}
                      src={avatar ? avatar : avatarDefault}
                      sx={{ width: "200px", height: "auto", padding: "10px" }}
                      key={avatar}
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
                        label="Nome"
                        id="nome"
                        value={nome}
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
                        disabled
                        name="imobiliaria"
                        variant="outlined"
                      />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FormControl sx={{ m: 1 }} fullWidth>
                        <InputLabel id="label-select-perfil-usuario">
                            Perfil Usu??rio
                          </InputLabel>
                          <Select
                            labelId="label-select-perfil-usuario"
                            id="perfil_usuario"
                            value={perfilUsuario}
                            onChange={(e) => {
                              setPerfilUsuario(e.target.value);
                            }}
                            label="Perfil Usu??rio"
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
                            Usu??rio Ativo ?{" "}
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
                      Endere??o
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
                        value={cep}
                        onChange={(e) => {
                          setCep(e.target.value);
                        }}
                        type="text"
                        variant="outlined"
                        //onChange={(e) => buscaCep(e)}
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
                        label="N??mero"
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
                  Atualizar
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
    </div>
  );
}
