import {useState, useEffect} from "react"
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import PhishingIcon from '@mui/icons-material/Phishing';
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; 
import {debounce} from 'lodash'
import {useDispatch} from "react-redux";
import {callAPI2} from "../app/searchSlice"
import {Link} from "react-router-dom"

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${ theme.spacing(4) })`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchField() {
  const dispatch2 = useDispatch();


  const [recipeSearch, setRecipeSearch] = useState("")

  useEffect(() => {
    dispatch2(callAPI2(recipeSearch))

  }, [recipeSearch])


  const handlerDebounce = debounce((value) => {

    setRecipeSearch(value)

  }, 1500)

  

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" >
        <Toolbar>
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{mr: 2}}

            >
               <PhishingIcon /> 
            </IconButton>
          </Link>
          <Search>
            <SearchIconWrapper>
             <ManageSearchIcon />
            </SearchIconWrapper>
            <StyledInputBase

              type="text"
              onChange={(e) => {handlerDebounce(e.target.value)}}
              placeholder="Search here"
              inputProps={{'aria-label': 'search'}}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}