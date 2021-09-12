import React, { useEffect } from 'react';
import {Link,Redirect, Route, Switch, useParams} from  'react-router-dom'
import clsx from 'clsx'
import {connect}  from 'react-redux'
import {TableContainer, Table, TableHead,TableRow, TableCell,TableBody, Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Container, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import axios from 'axios'
import { setUserData, setRepos, setCommits } from'../actions/actionCreator'

const styles = makeStyles((theme) => ({

    card:{
        minHeight:'95%',
        minWidth:'95%',
        marginBottom:20
    },
    image:{
        border:'5px solid #64b5f6'
    }

}))

function UserDetails(props){
    const {username} = useParams()
    const user_url = `https://api.github.com/users/${username}`
    const repo_url = `https://api.github.com/users/${username}/repos`
    const classes = props.styles()
    const style = styles()

    useEffect(()=>{
        axios.get(user_url)
             .then((res)=>{
                console.log("User Data :: ",res)
                props.setUserData(res.data)
             })
        axios.get(repo_url)
             .then((res)=>{
                 console.log("Repo data : ",res)
                 props.setRepos(res.data)
                 return res.data
             })
             .then((res)=>{
                let repoNames = []
                let promises = []
                let commits = {}
                 if (res.length) {
                     res.map((repo, i) => {
                         let url = repo.commits_url.slice(0, -6)
                         repoNames.push(repo.name)
                         promises.push(axios.get(url))
                     })
                 }
                 Promise.all(promises)
                        .then((res)=>{
                        console.log(res);
                        res.map((commit,index)=>{
                            commits[repoNames[index]] = commit.data.length
                        })
                        props.setCommits(commits)
                        })
             }).catch((err)=>{
                 console.log("Error :: ",err)
             })
    },[])

    return(
        <div className={clsx(classes.content, { [classes.contentShift]: props.drawerOpen })}>
                <Container maxWidth="lg" >
                    <Grid container>
                        <Card className={style.card} variant="elevation" elevation={6}>
                            <CardContent>
                                <div style={{display:'flex', flexDirection:'row'}}>
                                    <div style={{width:'30%', height:'95%', justifyContent:'center'}}>
                                        <img src={props.userData.avatar_url} className={style.image} style={{borderRadius:'50%',height:150,width:150,marginTop:15}}/>
                                        <div style={{color:'gray', marginTop:20}}>
                                            
                                            <h5>@ {props.userData.login}</h5>

                                        </div>
                                    </div>
                                    <div style={{width:'70%', height:'95%',borderLeft:'2px solid #64b5f6'}}>
                                        <div style={{borderBottom:'2px solid #64b5f6',paddingBottom:10}}>
                                            <Typography>Information</Typography>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'row', }}>
                                            <div style={{margin:10,width:'50%',borderRight:'2px solid #64b5f6'}}>
                                                <div style={{margin:5}}>
                                                    <Typography>Full Name</Typography>
                                                </div>
                                                <div>
                                                    <Typography>{props.userData.name}</Typography>
                                                </div>
                                            </div>
                                            <div style={{margin:10,width:'50%'}}>
                                                <div style={{margin:5}}>
                                                    <Typography>Location</Typography>
                                                </div>
                                                <div>
                                                    <Typography>{props.userData.location?props.userData.location:'Not Available'}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'row', }}>
                                            <div style={{margin:10,width:'50%',borderRight:'2px solid #64b5f6'}}>
                                                <div style={{margin:5}}>
                                                    <Typography>Email</Typography>
                                                </div>
                                                <div>
                                                    <Typography>{props.userData.email?props.userData.email:'Not Available'}</Typography>
                                                </div>
                                            </div>
                                            <div style={{margin:10,width:'50%'}}>
                                                <div style={{margin:5}}>
                                                    <Typography>Twitter</Typography>
                                                </div>
                                                <div>
                                                    <Typography>{props.userData.twitter_username?props.userData.twitter_username:'Not Available'}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'row', }}>
                                            <div style={{margin:10,width:'50%',borderRight:'2px solid #64b5f6'}}>
                                                <div style={{margin:5}}>
                                                    <Typography>Followers</Typography>
                                                </div>
                                                <div>
                                                    <Typography>{props.userData.followers?props.userData.followers:0}</Typography>
                                                </div>
                                            </div>
                                            <div style={{margin:10,width:'50%'}}>
                                                <div style={{margin:5}}>
                                                    <Typography>Following</Typography>
                                                </div>
                                                <div>
                                                    <Typography>{props.userData.following?props.userData.following:0}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Container>
                <Container maxWidth="lg" style={{marginTop:20}}>
                    <Grid container>
                        <Card className={style.card} variant="elevation" elevation={6}>
                            <CardContent>
                                <TableContainer>
                                    <Table>
                                        <TableHead >
                                            <TableRow>
                                                <TableCell>
                                                    <b>Repository</b>
                                                </TableCell>
                                                <TableCell>
                                                    <b>Commits</b>
                                                </TableCell>
                                                <TableCell>
                                                    <b>Forks</b>
                                                </TableCell>
                                                <TableCell>
                                                    <b>Issues</b>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {props.repos.map((rep,i)=>(
                                                <TableRow key={i}>
                                                    <TableCell>{rep.name}</TableCell>
                                                    <TableCell>{props.commits[rep.name]}</TableCell>
                                                    <TableCell>{rep.forks}</TableCell>
                                                    <TableCell>{rep.open_issues_count}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Container>
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
    setUserData,
    setRepos,
    setCommits
  }
export default connect(mapStateToProps,mapDispatchToProps)(UserDetails)