import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LogoAlt from "../assets/logoFrankeAltDark.png";
import styled from "@emotion/styled";
import Axios from "axios";
import useContextApi from "../Componentes/Context";
import {RiLoader4Line} from 'react-icons/ri';
import { Alert, AlertTitle, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import utils from '../utils';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      style={{ color: "#fff" }}
      color="text.primary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" target="_blank" href="https://glrsistemas.com.br">
        GLR Sistemas
      </Link>
      {""}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  let [toast, setToast] = React.useState(false);
  let [toastType, setToastType] = React.useState(false);
  const { setUser, setImobiliariaUsuario, isLoading, setIsLoading } = useContextApi();

  const validaLogin = () => {
    setIsLoading(true);
    const data = new FormData(document.querySelector("form"));
    Axios.get(utils.getBaseUrl() +"usuario/login", {
      params: {
        login: data.get("login"),
        senha: data.get("senha"),
      },
    })
      .then((res) => {
        setIsLoading(false);
        let usuario = res.data;
        let imobiliaria = res.data.idImobiliaria;
        localStorage.setItem("@App:user", JSON.stringify(usuario));
        localStorage.setItem("@App:imobiliaria", JSON.stringify(imobiliaria));

        setToastType('success');
        setToast(true);

        setTimeout(function () {
          window.location.href = "/home";
        }, 1500);
      })
      .catch((erro) => {
        setIsLoading(false);
        setToastType('error');
        setToast(true)
      });
  };

  const CssTextField = styled(TextField)({
    "& label": {
      color: "#fff",
    },
    "& label.Mui-focused": {
      color: "#e1a409",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#e1a409",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#e1a409",
      },
      "&:hover fieldset": {
        borderColor: "#e1a409",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e1a409",
      },
    },
  });

  return (
    <div className="fundo-background">
      <ThemeProvider theme={theme}>
          <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1301 }}
          open={isLoading}
          >
            <CircularProgress color="inherit" />
          {/* <RiLoader4Line/> */}
          </Backdrop>
        {toastType === 'error' &&
        <Snackbar
          open={toast}
          anchorOrigin={{ vertical:"top", horizontal:"center" }}
          autoHideDuration={2000}
          onClose={() => {
            setToast(false);
          }}
        >
          <Alert severity='error' variant="filled" onClose={() => {
            setToast(false);
          }}>
            <AlertTitle>Erro ao realizar Login.</AlertTitle>
            Usuário ou senha incorreta —{" "}
            <strong>Se o erro persistir contate o administrador!</strong>
          </Alert>
        </Snackbar>
        }
        {toastType === 'success' &&
        <Snackbar
          open={toast}
          anchorOrigin={{ vertical:"top", horizontal:"center" }}
          autoHideDuration={2000}
          onClose={() => {
            setToast(false);
          }}
        >
          <Alert severity='success' variant="filled" onClose={() => {
            setToast(false);
          }}>
            <AlertTitle>Login realizado com sucesso.</AlertTitle>
           Você será redirecionado para a página principal.
          </Alert>
        </Snackbar>
        }
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box className="caixa-login">
            <img src={LogoAlt} className="icon-side-logo" alt="iconside-logo" />
            <Typography component="h1" variant="body1">
              Franke Vistorias Imobiliarias
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="Login"
                name="login"
                autoComplete="off"
                className="inputLogin"
                autoFocus
              />
              <CssTextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha:"
                type="password"
                id="senha"
                autoComplete={"off"}
                className="inputLogin"
              />
              <Button
                fullWidth
                className="botao-login"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={validaLogin}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item align="center">
                  <Link
                    href="#"
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    Esqueci minha senha
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 2, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
