import React from 'react'
import { Grid, Card, Typography, CardContent, Box, Button, IconButton, Slide, Snackbar, SlideProps, styled} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useNavigate } from "react-router-dom"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Auth } from 'aws-amplify'

function Transition(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

const useStyles = makeStyles({
  root: {
    height: '100vh',
    backgroundColor: '#EDE6DB',
    boxSizing: 'border-box'
  },
  container: {
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    width: '100%', 
    flexGrow:1, 
    justifyContent: 'center'
  },
  inputBox: {
    height: '35px',
    padding: 5,
    margin: "20px 0px",
    width: '100%',
    boxShadow: '0px 0px 6px #e2e2e2',
    borderRadius: 10,
    display: 'flex', 
    alignItems: 'center',
  },
  inputF: {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: 14,
    padding: 10,
  },
})

const CSSButton = styled(Button)({
  border: 'none',
  outline: 'none',
  padding: 10,
  color: 'white',
  backgroundColor: '#9F886A',
  margin: "20px 0px",
  width: '100%',
  boxShadow: '0px 0px 6px #e2e2e2',
  borderRadius: 10,
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: '#9F886Ad0',
  }
})

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState<String | any>();
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState({
    text: '',
    show: false
  })
  const [phone, setPhone] = React.useState('')

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const signUpUser = async () => {
    try {
      await Auth.signUp({
        username: email,
        password: password.text,
      });
      setOpenSnackBar(true);
      setSnackMsg('Successfully created a new user')
      setTimeout(() => {
        navigate('/confirmation');
      }, 1500)
    } catch (error: any) {
      setOpenSnackBar(true);
      setSnackMsg(error.message);
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={0} columns={9}>
          <Grid item xs={3}>
            <div className={classes.container}>
              {/* <img src={edusignin} alt="edu" height={300} width={300} /> */}
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.container}>
              <Card variant="outlined" style={{width: '100%', padding: 20, borderRadius: 20}}>
                <CardContent>
                  <Typography gutterBottom variant='h5'>Sign Up</Typography>
                    <Box className={classes.inputBox}>
                      <input 
                        name='username'
                        placeholder='Username'
                        value={username}
                        className={classes.inputF}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Box>
                    <Box className={classes.inputBox}>
                      <input 
                        name='email'
                        placeholder='Email'
                        value={email}
                        className={classes.inputF}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Box>
                    <Box className={classes.inputBox}>
                      <input 
                        name='password'
                        placeholder='Password'
                        type={password.show ? 'text' : 'password'}
                        value={password.text}
                        className={classes.inputF}
                        onChange={(e) => setPassword({...password, text: e.target.value})}
                      />
                      <IconButton size="small" onClick={() => setPassword({...password, show: !password.show})}>
                        {password.show ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </Box>
                    <Box className={classes.inputBox}>
                      <input
                        name='phone'
                        placeholder='Phone'
                        value={phone}
                        className={classes.inputF}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Box>
                    <CSSButton
                      disabled = {email === '' || password.text === ''}
                      onClick={signUpUser}  
                    >SignUp</CSSButton>
                      <Typography>Already have an account? <span onClick={() => navigate('/signin')} style={{cursor: 'pointer', color: '#9F886A'}}>Sign In</span></Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{height: '100%'}}></div>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={openSnackBar}
        onClose={handleClose}
        autoHideDuration={1500}
        TransitionComponent={Transition}
        message={snackMsg}
      />
    </div>
  );
};

export default Signup;
