import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import { loginWithGoogle, auth, onAuthStateChanged, handleLogout } from "../../config/firebase"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import Login from "../../views/Login"
import Badge from '@mui/material/Badge';
import { BsHandbagFill } from 'react-icons/bs'
import CartDrawer from '../Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const drawerWidth = 240;
const navItems = ['Home'];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const cart = useSelector(state => state.cart)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        OLX
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText onClick={() => navigate('/')} primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: 'center' }}
              >
                <ListItemText primary={user.email} />
              </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout} sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/postad')} sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Sell" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpen(true)} sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Cart" />
                </ListItemButton>
              </ListItem>
            </>
            ) : (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/login')} sx={{ textAlign: 'center' }}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
        )}
          </List>
    </Box>
  );

  // const SearchBtn = (
  //   <Search>
  //     <SearchIconWrapper>
  //       <SearchIcon />
  //     </SearchIconWrapper>
  //     <StyledInputBase
  //       placeholder="Search…"
  //       inputProps={{ 'aria-label': 'search' }}
  //     />
  //   </Search>
  // )

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', background: '#fff', color: 'black' }}>
      <CssBaseline />

      <CartDrawer open={open} onClose={setOpen} />
      {/* (theme) => theme.zIndex.drawer + 1 */}
      <AppBar position="fixed" sx={{ zIndex: 999, background: '#fff', color: 'black' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src='https://blog.olx.com.pk/wp-content/uploads/2019/08/Blue-Logo-800x800-01.png' width={'78px'} />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: 'black' }}>
                {item}
              </Button>
            ))}
            {user ? (
              <>
                <Button onClick={() => navigate('/postad')} sx={{ color: 'black' }}>
                  Sell
                </Button>
                <Button
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ color: 'black' }}
                >
                  {user.email}
                </Button>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleLogout} sx={{ color: 'black' }}>
                    Logout
                  </MenuItem>
                </Menu>
                <IconButton className='cart-con' aria-label="cart" onClick={() => setOpen(true)}>
                  <StyledBadge badgeContent={cart.length} color="primary">
                    <BsHandbagFill size='22' color='#252525' />
                  </StyledBadge>
                </IconButton>
              </>
            ) : (
              <Button onClick={() => navigate('/login')} sx={{ color: 'black' }}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;