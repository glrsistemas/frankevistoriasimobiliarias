import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "./index.css";
import Logo from '../../assets/logoFranke.png';
import {Link} from 'react-router-dom';
import {AiOutlineFileSearch, AiOutlineUser} from "react-icons/ai"; 
import {BsUiChecks} from "react-icons/bs"; 
import {MdChevronLeft,MdChevronRight,MdMenu,MdExitToApp} from "react-icons/md";
import { Avatar, Grid } from '@mui/material';
import useContextApi from "../Context";


const drawerWidth = 240;
const deslogar = () => {
}
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  display: 'none',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1301,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

function Home() {
  const { user, imobiliariaUsuario} = useContextApi();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
 
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="sidebar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="titulo-sidebar">
          <img src={Logo} width="50px" style={{verticalAlign: 'middle'}} alt="logo-franke-vistorias"></img> Franke Vistorias Imobiliarias
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader  sx={{ height: '200px' }}>
          <Grid container spacing={2} sm={10} className="header-sidebar">
            <Grid >
          <Avatar  src={user.uri ? user.uri : ''} className={"header-avatar"}/>
            </Grid>
          <Grid sx={{width: '100%'}}>
          <Typography className="header-name" >
          {user.nome + " " + user.sobrenome}  
          </Typography>
          <Divider className="divider-header-marsalla"/>
          <Typography variant="body2" className="header-imob center">
          {imobiliariaUsuario.nomeFantasia}
          </Typography>
          </Grid>
          </Grid>
          <Grid container spacing={2} sm={2}>
          <IconButton onClick={handleDrawerClose} sm={4}>
            {theme.direction === 'rtl' ? <MdChevronRight /> : <MdChevronLeft />}
          </IconButton>
          </Grid>
        </DrawerHeader>
        <Divider className="divider-header"/>
        <List>
            <Link to="/Atendimento" className="link-sidebar">
            <ListItemButton
              key="Atendimento"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              className="link-texto"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
                className="link-icon"
              >
                <BsUiChecks/>
              </ListItemIcon>
              <ListItemText primary="Atendimento" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>
            {/* <Link to="/relatorios" className="link-sidebar">
            <ListItemButton
              key="Relatórios"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              className="link-texto"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
                className="link-icon"
              >
                <AiOutlineFileSearch/>
              </ListItemIcon >
              <ListItemText primary="Relatórios" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link> */}
        </List>
        <>
        <Divider />
        <List>
            <Link to="/usuario" className="link-sidebar">
            <ListItemButton
              key="Usuario"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              className="link-texto"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
                className="link-icon"
              >
                <AiOutlineUser/>
              </ListItemIcon>
              <ListItemText primary="Usuario" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>
            <Link to="/imobiliaria" className="link-sidebar">
            <ListItemButton
              key="Imobiliária"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              className="link-texto"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
                className="link-icon"
              >
                <AiOutlineFileSearch/>
              </ListItemIcon >
              <ListItemText primary="Imobiliária" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>
        </List>
        </>
        <Divider />
        <List>
          <Link to="/login" className="link-sidebar">
            <ListItemButton
              key="Sair"
              onClick={deslogar}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              className="link-texto"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
                className="link-icon"
              >
               <MdExitToApp/>
              </ListItemIcon>
              <ListItemText primary="Sair" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>
        </List>
      </Drawer>
     </Box>
  );
}

export default Home;