import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom'
import clsx from 'clsx'
import 'redux'
import {connect}  from 'react-redux'
import { setDrawerOpen } from '../actions/actionCreator'
import CardComponent from './CardComponent';
import { CardActionArea, CardMedia, Typography,Card } from '@material-ui/core';

function Home(props){

    const classes = props.styles()
    const [users,setUsers] = useState([])
    // useEffect(()=>{
    //     console.log("Props :", props.searchedUsers)
    //     setUsers(props.searchedUsers)
    // })

    return(
        <div className="container" className={clsx(classes.content, { [classes.contentShift]: props.drawerOpen })}>
            <div className="row">
                
                    {
                        props.searchedUsers.map((user,i)=>{
                            return(
                                // <CardComponent user={user}/>
                                // <p>{i}</p>
                            <div className="col-lg-3" style={{marginBottom:10}}>
                                {/* <Card>
                                    <CardActionArea>
                                        <p>{user.login}</p>
                                    </CardActionArea>
                                </Card> */}
                                <CardComponent styles={props.styles} user={user}/>
                            </div>
                            )
                        })
                    }
                {/* </div> */}
            </div>
        </div>
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
    setDrawerOpen
  }

export default connect(mapStateToProps,mapDispatchToProps)(Home);