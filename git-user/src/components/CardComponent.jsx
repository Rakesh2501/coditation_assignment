import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from  'react-router-dom'
import clsx from 'clsx'
import {connect}  from 'react-redux'
import { setDrawerOpen } from '../actions/actionCreator'
import {Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions} from '@material-ui/core'
import { getThemeProps, makeStyles } from '@material-ui/styles';
// import { Button } from 'bootstrap';

const cardStyles = makeStyles({
    root: {
      maxWidth: 360,
    //   maxHeight: 400
    flex:1,
    flexDirection:'column',
    alignContents:'center',
    padding:25,
    borderRadius: 25
    },
    media: {
      height: 120,
      width: 120,
      borderRadius:'50%',
      border:'5px solid #64b5f6'
    },
    button:{
        textAlign:'center'
    }
  });

function CardComponent(props){

    const user = props.user
    const styles = props.styles()
    const style = cardStyles()
    const history = useHistory()

    const handleClick = () =>{
        history.push(`/user/${user.login}`)
    }

    return(
        <React.Fragment>
            <Card className={style.root} elevation={10}>
                <CardActionArea  >
                    <img src={user.avatar_url} className={style.media}/>
                </CardActionArea>
                <CardContent>
                    <Typography variant="h6" style={{color:'gray'}}>@{user.login}</Typography>
                </CardContent>
                <Button variant="contained" size="small" color="primary" onClick={handleClick}>
                    Details
                </Button>
            </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    return {
      userData: state.userData,
      repos: state.repos,
      commits: state.commits,
      drawerOpen: state.drawerOpen,
      searchedUsers: state.searchedUsers
    }
  }
  
  const mapDispatchToProps = {
    
  }

export default connect(mapStateToProps,mapDispatchToProps)(CardComponent)