import './App.css'
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom'
import {createTheme,ThemeProvider,makeStyles} from '@material-ui/core/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
// import white from '@material-ui/core/colors'
import clsx from 'clsx'
import UserDetails from './components/UserDetails'

const themes = createTheme({
  palette:{
    primary:{
      main:'#64b5f6',
      contrastText:'#ffebee',
    },
    secondary:{
      main:'#e3f2fd',
      light:'#42a5f5'
    }
  }
})

const styles = makeStyles((theme) => ({
  drawerWidth:{
    width:200
  },
  topDivider:{
    height:63
  },
  appBar:{
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift:{
    width:`calc(100% - 200px)`,
    marginLeft:200,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
    })
  },
  drawerClose:{
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    width: theme.spacing(7) + 1
  },
  content:{
    marginLeft:100,
    marginRight:40,
    marginTop:80,
    height:'55vh',
    transition:theme.transitions.create(['margin','width'],{
      easing:theme.transitions.easing.sharp,
    })
  },
  contentShift:{
    marginLeft:220,
    width:`100% - 180px`,
    transition: theme.transitions.create(['margin','width'], {
      easing: theme.transitions.easing.easeOut,
    })
  },
  paper:{
    background:'#e3f2fd'
  },
  search:{
    width:400,
    // backgroundColor:'rgba(62,131,243)',
    backgroundColor: theme.palette.secondary.light,
    borderRadius:15,
    // height:50,
    marginLeft:30
  },
  text:{
    color:theme.palette.primary.contrastText
  },
  iconColor:{
    color: theme.palette.secondary
  },
  borderColor:{
    color: theme.palette.primary
  }
}))

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={themes}>
        <Router>
          <Navbar styles={styles}/>
          <Switch>
            <Route exact path='/' render={()=><Home styles={styles}/>}/>
            <Route path='/dashboard' render={()=><Home styles={styles}/>}/>
            <Route path="/user/:username" render={()=><UserDetails styles={styles}/>}/>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
