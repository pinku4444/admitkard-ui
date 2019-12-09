import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './AddUser.scss';
import UserForm from './UserForm'
const AddUser = () => {
    const courseList = [
        {
            value: 'UG',
            label: 'UG',
        },
        {
            value: 'PG',
            label: 'PG',
        }
    ];

    const countryList = [
        {
            value: 'USA',
            label: 'USA',
        },
        {
            value: 'Australia',
            label: 'Australia',
        },
        {
            value: 'New-Zealand',
            label: 'New-Zealand',
        },
        {
            value: 'Canada',
            label: 'Canada',
        },
        {
            value: 'UK',
            label: 'UK',
        },
        {
            value: 'Ireland',
            label: 'Ireland',
        },
        {
            value: 'Germany',
            label: 'Germany',
        },
    ];

    return (
        <Grid container spacing={3}>
            <Grid item sm={3} xs={12}>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Paper className="paper" >
                    <h2>User Form :</h2>
                    <UserForm courseList={courseList} countryList={countryList} />
                </Paper>
            </Grid>
            <Grid item sm={3} xs={12}>
            </Grid>
        </Grid>
    );
};

export default AddUser;