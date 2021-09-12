import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch,Link} from  'react-router-dom'
import { Paper,AppBar, Divider, Drawer, IconButton, makeStyles, Toolbar, Typography,List,ListItem,ListItemText, ListItemIcon, InputBase, TextField } from '@material-ui/core'
import { Menu, Search, ChevronLeft, Dashboard, People, LocalActivity } from '@material-ui/icons'
// import {  } from '@material-ui/icons';
import clsx from 'clsx'
import {connect}  from 'react-redux'
import { setDrawerOpen, setSearchUsers } from '../actions/actionCreator'
import axios from 'axios'



function Navbar(props){

    const classes = props.styles()
    const [searchKey,setSearhKey] = useState("")

    const handleDrawer = () => {
        props.setDrawerOpen(!props.drawerOpen)
      }
    
      const handleSubmit = (e) =>{
        console.log("Submitted")
        e.preventDefault()
        axios.get(`https://api.github.com/search/users?q=${searchKey}`)
             .then((res)=>{
                console.log("Searched users : ",res)
                props.setSearchUsers(res.data.items)
             })
      }

      const handleChange=(e) =>{
        console.log("handlechange :: ",e.target.value)
        setSearhKey(e.target.value)
      }

    return(
        <div>
            <AppBar position="sticky" className={clsx(classes.appBar,{[classes.appBarShift]:props.drawerOpen})} >
                <Toolbar>
                    <IconButton edge = "start" onClick={handleDrawer}>
                        <Menu style={{color:'white'}}/>
                    </IconButton>
                    <Typography variant="h6" style={{marginLeft:30}}>
                        {/* <Link to="/dashboard">GitAPI</Link> */}
                        GitAPI
                    </Typography>
                    <div style={{marginLeft:40}} className={classes.search} style={{}}>
                        <form onSubmit={handleSubmit}>
                        <IconButton type="submit" >
                            <Search color="secondary"/>
                        </IconButton>
                        <InputBase className={classes.text} name="searchKey" value={searchKey} onChange={handleChange} placeholder="Search Github Users"/>
                        </form>
                    </div>

                </Toolbar>
            </AppBar>
            <Drawer open={props.drawerOpen} 
                variant="permanent"
                anchor="left" className={clsx({[classes.drawerClose]:!props.drawerOpen})}
                classes={{ paper: clsx({[classes.drawerClose]: !props.drawerOpen,})}}>
            <div className={clsx(classes.drawerWidth, classes.topDivider)}
                  style = {{display:'flex',flexDirection:'row-reverse'}}>
                <IconButton onClick={handleDrawer}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button component={Link} to="/dashboard">
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItem>
              <ListItem button>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                <ListItemText>Accounts</ListItemText>
              </ListItem>
              <ListItem button>
                  <ListItemIcon>
                    <LocalActivity />
                  </ListItemIcon>
                <ListItemText>Activity</ListItemText>
              </ListItem>
            </List>
        </Drawer>
        </div>
    )
}

const mapStateToProps = (state) =>{
  return {
    drawerOpen: state.drawerOpen
  }
}

const mapDispatchToProps = {
  setDrawerOpen,
  setSearchUsers
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)