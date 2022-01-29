import React from 'react';
import { makeStyles } from "@mui/styles"
import { Button, styled, Slide, Snackbar, SlideProps } from '@mui/material';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

function Transition(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

const useStyles = makeStyles({
  main: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#EDE6DB',
  },
});
const CSSButton = styled(Button)({
  border: 'none',
  outline: 'none',
  padding: 10,
  color: 'white',
  backgroundColor: '#9F886A',
  margin: "20px 0px",
  width: '200px',
  boxShadow: '0px 0px 6px #e2e2e2',
  borderRadius: 10,
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: '#9F886Ad0',
  }
})
const Dashboard: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [user, setUser] = React.useState<any>();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState('');

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  React.useEffect(() => {
    (async () => {
      let user = null;
      try {
        user = await Auth.currentAuthenticatedUser();
        if (user) {
          setUser(user.attributes.email);
        } else {
          setUser('');
        }
      } catch (e) {
        console.log(e);
        setUser('');
      }
    })();
  }, []);
  
  const signOut = async () => {
    try {
      await Auth.signOut();
      setOpenSnackBar(true);
      setSnackMsg('Successfully signed out');
      setTimeout(() => {
        navigate('/signin')
      }, 1500)
    } catch (error) {
      setOpenSnackBar(true);
      setSnackMsg('Error signing out');
    }
  }
  return (
    <div className={classes.main}>
      Hi, {user}
      <br />
      <CSSButton onClick={signOut}>Logout</CSSButton>
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

export default Dashboard;
