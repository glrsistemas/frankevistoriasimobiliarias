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
import { AiOutlineUserAdd } from "react-icons/ai";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Typography,
  Card,
  Grid,
  CardContent,
  Avatar,
  Box,
  Divider,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Switch,
  FormLabel,
  FormControlLabel,
  FormGroup,
  useRadioGroup,
} from "@mui/material";
import Axios from "axios";
import useContextApi from "../Context";
import avatarDefault from "../../assets/default/avatar.jpg";
import EditarUsuario from "./EditarUsuario";

export default function Usuario() {
  const { user, imobiliariaUsuario } = useContextApi();
  const [openCrudUsuario, setOpenCrudUsuario] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [cepForm, setCepForm] = React.useState([]);
  const [todasImob, setTodasImob] = useState([]);
  let [listUsuario, setListUsuario] = useState([]);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [imobiliaria, setImobiliaria] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [nivel, setNivel] = useState(1);
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

  useEffect(() => {
    if (user.nivel === 0) {
      Axios.get("http://localhost:8080/imobiliaria/findAll")
        .then((res) => {
          setTodasImob(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, todasImob);

  useEffect(() => {
    let listaUsuario = [];

    Axios.get("http://localhost:8080/usuario/findAll")
      .then((res) => {
        listaUsuario = res.data;
        setListUsuario(listaUsuario);
        console.log(listaUsuario);
      })
      .catch((err) => {
        console.log(err);
      });
  }, listUsuario);

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
    if (
      imobiliaria !== "" ||
      imobiliaria !== undefined ||
      imobiliaria !== null
    ) {
      Axios.get("http://localhost:8080/imobiliaria/findById/" + imobiliaria)
        .then((res) => {
          let imobiliariaSelecionada =
            user.nivel === 0 ? res.data : imobiliariaUsuario;

          if (imobiliariaSelecionada) {
            if (nivel === "" || nivel === undefined || nivel === null) {
              setNivel(1);
            }

            Axios.post("http://localhost:8080/usuario/save", {
              nome: nome,
              sobrenome: sobrenome,
              idImobiliaria: imobiliariaSelecionada,
              ativo: ativo,
              nivel: nivel,
              cpf: cpf,
              email: email,
              celular: celular,
              login: login,
              senha: senha,
            })
              .then((usuario) => {
                let idUsuCadastrado = usuario.data;

                if (idUsuCadastrado) {
                  Axios.get(
                    "http://localhost:8080/usuario/findById/" + idUsuCadastrado
                  )
                    .then((usuEnd) => {
                      let usuarioCadastrado = usuEnd.data;
                      if (usuarioCadastrado) {
                        Axios.post("http://localhost:8080/endereco/save", {
                          cep: cep,
                          bairro: bairro,
                          logradouro: logradouro,
                          cidade: cidade,
                          numero: numero,
                          complemento: complemento,
                          estado: estado,
                          idUsuario: usuarioCadastrado,
                        })
                          .then((success) => {
                            console.log("Sucesso ao criar !");
                          })
                          .catch((error) => {
                            console.log(
                              "Erro ao adicionar o Endereço, verifique novamente mais tarde !"
                            );
                          });
                      }
                    })
                    .catch((error) => {
                      console.log(
                        "Usuário Cadastrado, porém com algumas inconsistências!"
                      );
                    });
                }
              })
              .catch((error) => {
                console.log("Erro ao cadastrar Usuário");
              });
          }
        })
        .catch((err) => {
          console.log("Erro ao buscar Imobiliaria");
        });
    }
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
    setOpenCrudUsuario(true);
    setScroll("paper");
  };

  const handleClose = () => {
    setCepForm([]);
    setOpenCrudUsuario(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openCrudUsuario) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openCrudUsuario]);

  return (
    <>
      <Navbar />
      {openCrudUsuario && (
        <div>
          <Dialog
            open={openCrudUsuario}
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
                        onChange={(e) => {
                          setCelular(e.target.value);
                        }}
                        name="celular"
                        variant="outlined"
                      />
                    </Grid>
                    {user.nivel === 0 && (
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FormControl sx={{ m: 1 }} fullWidth>
                          <InputLabel id="label-select-imobiliaria">
                            Imobiliaria
                          </InputLabel>
                          <Select
                            labelId="label-select-imobiliaria"
                            id="imobiliaria"
                            value={imobiliaria}
                            defaultValue={""}
                            onChange={(e) => {
                              setImobiliaria(e.target.value);
                            }}
                            label="Imobiliaria"
                            variant="outlined"
                          >
                            <MenuItem value="">Selecione</MenuItem>
                            {todasImob.map((imob) => (
                              <MenuItem value={imob.id}>
                                {imob.id + " - " + imob.nomeFantasia}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                    {user.nivel === 0 && (
                      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FormControl sx={{ m: 1 }} fullWidth>
                          <InputLabel id="label-select-nivel">
                            Nível Usuário
                          </InputLabel>
                          <Select
                            labelId="label-select-nivel"
                            id="nivel"
                            value={nivel}
                            defaultValue={""}
                            onChange={(e) => {
                              setNivel(e.target.value);
                            }}
                            label="Nível Usuário"
                            variant="outlined"
                          >
                            <MenuItem value="">Selecione</MenuItem>
                            <MenuItem value={0}> 0 - Administrador</MenuItem>
                            <MenuItem value={1}> 1 - Usuário Gestor</MenuItem>
                            <MenuItem value={2}> 2 - Usuário Comum</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <TextField
                        label="E-mail"
                        fullWidth
                        id="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
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
                        type="password"
                        variant="outlined"
                      />
                    </Grid>
                    {user.nivel === 0 && (
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
                    )}
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
                        defaultValue={""}
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
                        defaultValue={""}
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
                        defaultValue={""}
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
                        defaultValue={""}
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
                        defaultValue={""}
                        value={cepForm.uf}
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
              Usuários
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
        <Grid container spacing={0} sm={12} md={12} lg={12} xl={12}>
          {listUsuario.map((usu) => (
            <Grid item sm={12} md={4} lg={3} xl={3}>
              <Card className="card-grid-white" elevation={3}>
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={0}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Grid item sm={6}>
                      <Avatar
                        alt={usu.nome + usu.sobrenome}
                        src={avatarDefault}
                        sx={{ width: "100%", height: "100%", padding: "10px" }}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <Grid className="linha-dados">
                        <span className="dados-imobiliaria">
                          {usu.nome + " " + usu.sobrenome}
                        </span>
                      </Grid>
                      <Grid className="linha-dados">
                        <span className="dados-imobiliaria">Código:</span>
                        {usu.id}
                      </Grid>
                    </Grid>
                  </Stack>
                  <Grid item sx={{ fontSize: "13px" }} mt={1} mb={2}>
                    <Grid className="linha-dados">
                      <span className="dados-imobiliaria">Atendimentos:</span>{" "}
                      {usu.atendimento ? usu.atendimento : 0}
                    </Grid>
                    <Grid className="linha-dados">
                      <span className="dados-imobiliaria">
                        Data de Criação:
                      </span>
                      {dataFormatada(usu.dhRegistro)}
                    </Grid>
                  </Grid>
                  <Divider mt={2} />
                  <Grid mt={2} item sx={{ fontSize: "12px" }}>
                   <EditarUsuario idUsuario={usu.id} />
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
