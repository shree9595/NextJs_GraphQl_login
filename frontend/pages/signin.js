import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import { SIGN_IN, SIGN_UP } from '../components/GraphQl';
import { useMutation } from '@apollo/client';
import { authenticate, isAutheticated } from "../components/Helper";
import Router from "next/router";


const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        loading: false,
      
    });

    useEffect(() => {
        isAutheticated() && Router.push("/")
    }, [])

    const { email, password, loading,  } = values;
   
    const [error, setError] = useState('');

    const [signin] = useMutation(SIGN_IN);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('All fields are required');
            return;
        }
        console.log(error);
        setError('');
        try {
            const response = await signin({
                variables: { input: { email, password } },
            });

            authenticate(response.data.signin.token, () => {
                Router.push("/");
            });



        } catch (error) {
            console.log(error);
            setError(error.graphQLErrors[0].message);

        }
    };

    console.log(error);

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
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

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                onChange={handleChange("email")}
                                value={email}
                                className="form-control"
                                type="email"
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                                onChange={handleChange("password")}
                                value={password}
                                className="form-control"
                                type="password"
                            />
                        </div>
                        <button onClick={handleSubmit} className="btn btn-success btn-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="Sign In page" description="A page for user to sign in!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}


            
        </Base>
    );
};

export default Signin;
