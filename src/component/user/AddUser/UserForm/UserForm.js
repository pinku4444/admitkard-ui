import React, { useState } from 'react';
import "./UserForm.scss";
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import {API} from '../../../../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const UserForm = (props) => {

    const { courseList, countryList } = props;

    let schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Enter Valid email").required("Email is required"),
        contactNumber: yup.string().required("Contact Number is required"),
        courseLevel: yup.string().required("Course level Is required"),
        country: yup.string().required("Country is required")
      });

    const [buttontext,setButtonText] = useState("Submit");
    const [userForm, setUserForm] = useState({
        'name': '',
        'email': '',
        'contactNumber': '',
        'courseLevel': '',
        'country': [],
        "dob": new Date('2014-08-18T21:11:54')

    });

    const [formError, setFormError] = useState({
        nameError : '',
        emailError : '',
        contactNumberError : '',
        courseLevelError : '',
        countryError : '',

    });

    const formChangeHandler = (evt) => {
        console.log('evt: ', evt);
        setUserForm({ ...userForm, [evt.target.name]: evt.target.value });
    }

    const courseChangehandler = (evt) => {
        setUserForm({ ...userForm, courseLevel: evt.value });
    }
    const dateChangeHandler = (evt) => {
        console.log('evt: ', evt);
        setUserForm({ ...userForm, dob: evt });
    }


    const contryChangehandler = (evt) => {
        let data = [];
        if (evt !== null) {
            data = evt.map(country => (
                country.value
            ));
        }
        setUserForm({ ...userForm, country: data });

    }

    const formSubmitHandler = async (evt) => {
        
        evt.preventDefault();
        let tempFormError = {
            nameError : '',
            emailError : '',
            contactNumberError : '',
            courseLevelError : '',
            countryError : '',
    
        };
        setFormError(tempFormError);
        try {
            
            await schema.validate(userForm, { abortEarly: false, stripUnknown: true });
            submitHandler();
        }catch(ValidationError) {
            console.log("errors", ValidationError);
            if (ValidationError.inner !== undefined) {
                const errors = ValidationError.inner;
                errors.map((error) => {
                  let key = `${[error.path]}Error`;
                  tempFormError = { ...tempFormError, [key]: error.message }
                });
                setFormError({...tempFormError});
                
            }
            
        }
        
    }

    const submitHandler = async () => {
        try {
            setButtonText("submitting");
            let headers = {
                "Content-Type": "application/json",
              };
            const data = await API.post('/user',userForm,{headers: headers});
            setUserForm({
                'name': '',
                'email': '',
                'contactNumber': '',
                'courseLevel': '',
                'country': [],
                "dob": new Date('2014-08-18T21:11:54')
            });
            toast.success("User added Successfully");
            setButtonText("Submit");

            

        }catch(ex) {
            console.log('ex: ', ex);
            toast.error("Oops, Something went wrong !");
            
        }
    }

    let { name, email, contactNumber, dob } = userForm;
    const {nameError, emailError, contactNumberError, countryError, courseLevelError} = formError;

    return (
        <div className="form-wrapper">
            <form onSubmit={formSubmitHandler} autocomplete="off">
                <TextField
                    label="Name *"
                    name="name"
                    value={name}
                    margin="normal"
                    variant="outlined"
                    className="user-form"
                    onChange={formChangeHandler}
                />
                {nameError !== '' ? (<p className="errorMsg">{nameError}</p>) : null}
                <TextField
                    id="outlined-helperText"
                    label="Email *"
                    name="email"
                    margin="normal"
                    value={email}
                    variant="outlined"
                    className="user-form"
                    onChange={formChangeHandler}
                />
                {emailError !== '' ? (<p className="errorMsg">{emailError}</p>) : null}
                <TextField
                    id="outlined-helperText"
                    label="Contact Number *"
                    margin="normal"
                    value={contactNumber}
                    name="contactNumber"
                    variant="outlined"
                    className="user-form"
                    onChange={formChangeHandler}
                />
                {contactNumberError !== '' ? (<p className="errorMsg">{contactNumberError}</p>) : null}
                <Select
                    options={courseList}
                    placeholder="select course"
                    name="courseLevel"
                    className="user-form margin-bottom-20"
                    onChange={courseChangehandler}
                />
                {courseLevelError !== '' ? (<p className="errorMsg">{courseLevelError}</p>) : null}

                <Select
                    options={countryList}
                    placeholder="select Country"
                    className="user-form margin-bottom-20"
                    isMulti
                    onChange={contryChangehandler}
                />
                {countryError !== '' ? (<p className="errorMsg">{countryError}</p>) : null}

                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Dob"
                        value={dob}
                        name={dob}
                        className="user-form margin-bottom-20"
                        onChange={dateChangeHandler}
                    />
                </MuiPickersUtilsProvider>

                <Button onClick={formSubmitHandler} className="submit-button" variant="contained" color="primary">
                    {buttontext}
                </Button>


            </form>
            <ToastContainer />
        </div>
    );
};

export default UserForm;