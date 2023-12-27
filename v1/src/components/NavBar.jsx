import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logoBonna from "../assets/img/logobonna_w.png"
import { CardMedia, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { IoIosLogOut } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import useAuthCall from '../hooks/useAuthCall';
import { SiGooglehome } from "react-icons/si";


const pages = [
  {
    title: "Ana Sayfa",
    url: "/"
  },
  {
    title: "Rapor",
    url: "/reports"
  },

];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {


  const { logout } = useAuthCall()
  const { currentUser } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  return (

    <AppBar position="static" sx={{ backgroundColor: '#1F2937' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 5 }} >
            <img
              src={logoBonna}
              alt="bonnaLogo"
              width='130px'
            />
          </Box>


          {/* mobile PAGE MENU */}

          {
            currentUser &&
            (
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem key={index} onClick={() => {
                      navigate(page.url)
                      handleCloseNavMenu()
                    }}>
                      <ListItemButton sx={{ textTransform: 'none' }}>
                        <ListItemText sx={{ textTransform: 'none' }}>{page.title}</ListItemText>
                      </ListItemButton>

                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )
          }


          {/* PAGES MENU */}

          {
            currentUser &&
            (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      navigate(page.url)
                      handleCloseNavMenu()
                    }}
                    sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                  >
                    {page.title}
                  </Button>
                ))}
              </Box>
            )
          }


          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1, mr: 1 }}>

            {
              currentUser && (<Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 3, mr: 1 }}>
                <Typography>{currentUser || null}</Typography>
                <IoIosLogOut size={25} color='#B31312' cursor='pointer' onClick={() => logout()} />

              </Box>)
            }

          </Box>

          {
            currentUser ? ("")
              :
              (<Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <IoHomeOutline size={25} color='#527853' onClick={() => navigate('/')} cursor='pointer' />
            </Box>)
          }


        </Toolbar>

      </Container>



      <Box>
        <Outlet />
      </Box>


    </AppBar>

  )
}

export default NavBar