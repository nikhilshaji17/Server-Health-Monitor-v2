import React, { Component } from "react";
import axios from "axios";
import {navigate, Link} from "@reach/router";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import DnsIcon from '@material-ui/icons/Dns';
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from '@material-ui/icons/Add';



class Profile extends Component {
  state = {
    username: this.props.username,
    password: this.props.password,
    servers: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .post("/users/getservers", {
        username: this.state.username,
        password: this.state.password,
      })
      .then(({ data }) => {
        // console.log(this.state.username);
        // console.log(this.state.password);
        console.log(data);
        if (typeof data === "string") {
          alert(data);
        } else {
          this.setState({ servers: data, loading: false });
        }
      });
  }
  

  

  render() {
    if (this.state.loading) {
      return (
        <div>
          <CircularProgress/>
        </div>
      );
    } 
    
    else {
      const { servers } = this.state;
     
      function createData(col1,col2,col3, col4){
        return{col1, col2, col3, col4}
      }
      const rows=[]
      servers.map(({serverName, ipAddr, sshKey, user, password})=>{
        const newRow = createData(serverName, user, ipAddr, password);
        rows.push(newRow);
      });
      
       
      return (
        <div className="main-body">
          <h2 className="center">{this.state.username}'s Servers</h2>
          
         <TableContainer component={Paper}>
          <Table  size="small" style={{minWidth:"650", background:"lightblue"}}>
            <TableHead>
              <TableRow>
                <TableCell>Server Name</TableCell>
                <TableCell>User</TableCell>
                <TableCell>IP Address</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {rows.map((row)=>(
                <TableRow key={row.col1}>
                  <TableCell component="th" scope="row">
                  {row.col1}
                  
                      <Link key={row.col1} to={`/serverdetails/${this.state.username}/${row.col1}/${row.col2}/${row.col3}/${this.state.password}`} style={{ textDecoration: "none", color: "white" }}>
                      <ListItem button>
                        <ListItemIcon>
                          <DnsIcon/>
                        </ListItemIcon>
                      </ListItem>
                      </Link>
                      
                  </TableCell>
                  <TableCell>{row.col2}</TableCell>
              <TableCell>{row.col3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
            </TableContainer>

         <Button
         variant="contained"
         color="primary"
         startIcon={<AddIcon/>}
         onClick={()=>{navigate("addserver")}}
         ></Button>
        </div>
      );
    }
  }
}

export default Profile;
