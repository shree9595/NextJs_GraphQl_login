import React, { useState, useEffect } from "react";
import Base from "../components/Base";

import Router from "next/router";
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../components/GraphQl';
import { authenticate, isAutheticated } from "../components/Helper";
import Link from "next/link";





const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",

        
    });

    useEffect(() => {
        isAutheticated() && Router.push("/")
    }, [])


    const [error, setError] = useState('');

    const [signup] = useMutation(SIGN_UP);


    const { name, email, password } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };



    const validate = () => {
        if (!name || !email || !password) {
            return 'All fields are required';
        }


        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(String(email).toLowerCase())) {
            return 'Enter a valid email address.';
        }



        if (password.length < 6) {
            return 'Password min 6 characters';
        }

        return false;
    };


    const onSubmit = async event => {
        event.preventDefault();



        const error = validate();
        if (error) {
            setError(error);
            return false;
        }



        try {
            const response = await signup({
                variables: { input: { name, email, password } },
            });

            authenticate(response.data.signup.token, () => {
                Router.push("/");
            });
        } catch (error) {
            console.log(error)
            setError(error.graphQLErrors[0].message);

        }
    };

    console.log(error);
    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                                className="form-control"
                                onChange={handleChange("name")}
                                type="text"
                                value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                className="form-control"
                                onChange={handleChange("email")}
                                type="email"
                                value={email}
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                                onChange={handleChange("password")}
                                className="form-control"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };

   

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Base title="Sign up page" description="A page for user to sign up!">
           
            {errorMessage()}
            {signUpForm()}

        </Base>
    );
};

export default Signup;
