import {useState} from "react";
import{
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery, 
}from "@mui/material";

import{
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
}from "@mui/icons-material";

import {useDispatch,useSelector} from "react-redux";
import {setMode,setLogout} from "state";
import {useNavigate} from "react-router-dom";
import FlexBetween from "components/FlexBetween";


const Navbar=()=>{
const[isMobileMenuToggled,setIsMobileMenuToggled]=useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();
const user=useSelector((state)=>state.user);
const theme=useTheme();
const isNonMobileScreens=useMediaQuery("(min-width:1000px");

const neutralLight=theme.palette.neutral.light;
const dark=theme.palette.neutral.dark;
const background=theme.palette.background.default;
const primaryLight=theme.palette.primary.light;
const alt=theme.palette.background.alt;

const fullName=`${user.firstName} ${user.lastName}`; 

/* const fullName="Rohitha"; */

    return(
        <>
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                 fontWeight="bold"
                 fontSize=/* "clamp(7rem,2 rem,7.25rem) " */"22px"
                 color="primary"
                 onClick={()=>navigate("/home")}
                 sx={{
                    "&:hover":{
                        color:primaryLight,
                        cursor:"pointer",
                    },
                 }}
                >
                    Sociopedia
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search...."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                     </FlexBetween>

                )}
            </FlexBetween> 

            {/* desktop nav */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={()=>dispatch(setMode())}>
                        {theme.palette.mode==="dark" ? (
                            <DarkMode sx={{fontSize:"25px"}}/>
                        ):(
                            <LightMode sx={{color:dark,fontSize:"25px"}}/>
                        )}
                        
                    </IconButton>
                    <Message sx={{fontSize:"25px"}}/>
                    <Notifications sx={{fontSize:"25px"}}/>
                    <Help sx={{fontSize:"25px"}}/>
                    <FormControl Variant="standard" value={fullName}>
                        <Select
                        value={fullName}
                         /* sx={{
                            backgrounColor:neutralLight,
                            width:"150px",
                            borderRadius:"0.25rem",
                            p:"0.25rem 1 rem",
                            "& .MuiSvgIcon-root":{
                                pr:"0.25rem",
                                width:"3rem"
                            },
                            "& .MuiSelect-select:focus":{
                                backgroundColor:neutralLight
                            }
                        }}  */
                       input={<InputBase/>} 
                        >
                          <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                          </MenuItem>
                          <MenuItem onClick={()=>dispatch(setLogout())}>
                            LogOut
                            </MenuItem>
                        </Select>
                    </FormControl>


                </FlexBetween>
            ):(
                <IconButton
                  onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
                  <Menu/>
                </IconButton>
            )} 
            {/* mobile nav */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box 
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
                >
                    {/*close icon */}
                    <Box display="flex" justifyContentent="flex-end" p="1rem">
                    <IconButton
                  onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
                  <Close/>
                </IconButton>

                {/* Menu Items*/}
                     
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" gap="3rem">
                    <IconButton onClick={()=>dispatch(setMode())}>
                        {theme.palette.mode==="dark" ? (
                            <DarkMode sx={{fontSize:"25px"}}/>
                        ):(
                            <LightMode sx={{color:dark,fontSize:"25px"}}/>
                        )}
                        
                    </IconButton>
                    <Message sx={{fontSize:"25px"}}/>
                    <Notifications sx={{fontSize:"25px"}}/>
                    <Help sx={{fontSize:"25px"}}/>
                    <FormControl Variant="standard" value={fullName}>
                        <Select
                        value={fullName}
                        sx={{
                            backgrounColor:neutralLight,
                            width:"150px",
                            borderRadius:"0.25rem",
                            p:"0.25rem 1 rem",
                            "& .MuiSvgIcon-root":{
                                pr:"0.25rem",
                                width:"3rem"
                            },
                            "& .MuiSelect-select:focus":{
                                backgroundColor:neutralLight
                            }
                        }}
                        input={<InputBase/>}
                        >
                          <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                          </MenuItem>
                          <MenuItem onClick={()=>dispatch(setLogout())}>
                            LogOut
                            </MenuItem>
                        </Select>
                    </FormControl>


                </FlexBetween>
                    </Box>
                </Box>
            )}

        </FlexBetween>
        </>
    );
};

export default Navbar;