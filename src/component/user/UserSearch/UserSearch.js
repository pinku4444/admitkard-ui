import React,{useState} from 'react';
import './UserSearch.scss';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {API} from '../../../utils'

const UserSearch = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [isSearchStart, setIsSearchStart] = useState(false);
    const [email,setEmail] = useState('');
    const [userData, setUserData] = useState('')
    const [isErrorInData, setIsErrorInData] = useState(false)

    const inputHandler = (evt) => {
        setEmail(evt.target.value)
    }

    const searchHandler = async (evt) => {
        console.log(email)
        setIsLoading(true);
        if( !isSearchStart) {
            setIsSearchStart(true);
        }
        let headers = {
            "Content-Type": "application/json",
          };
        try {
            const data = await API.get(`/user/${email}`,{headers})
            setUserData(data.data.response.data);
            setIsErrorInData(false);
            setIsLoading(false);

        }catch(ex){
            setIsErrorInData(true);
            setIsLoading(false);
        }
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper className="search-user-wrapper">
                    <TextField label="Search User" variant="outlined" onChange={inputHandler}/>
                    <Button variant="contained" onClick={searchHandler} color="primary" className="search-user">
                        Search
                    </Button>
                    <div className = {isSearchStart ? "show user-section" : "hide"}>
                        {
                            isLoading ? 
                            <div className="user-section">
                                <h4>Searching.....</h4>
                            </div >: 
                                 isErrorInData ?  <h4>oops,Something went wrong</h4> : 
                                 userData.length === 0 ? <h4>No User Found</h4> :
                                 <div>
                                    <h4>Name : {userData.name}</h4>
                                    <h4>Email : {userData.email}</h4>
                                    <h4>contact Number : {userData.contactNumber}</h4>
                                    <h4>course Level : {userData.courseLevel}</h4>
                                    <h4>country : {userData.country}</h4>
                                    <h4>Dob : {userData.dob}</h4>
                                 </div>
                                
                            
                        }


                    </div>
                </Paper>

            </Grid>
            
        </Grid>
    );
};

export default UserSearch;