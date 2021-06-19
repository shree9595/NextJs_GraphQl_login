import React, { Fragment } from "react";

import { signout, isAutheticated } from "../components/Helper";
import Link from "next/link";



const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            {isAutheticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning">
                        <Link href="/">
                            Home

                        </Link>
                    </span>
                </li>

            )}
            {!isAutheticated() && (
                <Fragment>
                    <li className="nav-item">

                        <span
                            className="nav-link text-warning"

                        >
                            <Link href="/signup">
                                SignUp

                            </Link>
                        </span>

                    </li>
                    <li className="nav-item">
                        <span
                            className="nav-link text-warning"

                        >
                            <Link href="/signin">
                                SignIn

                            </Link>
                        </span>
                    </li>
                </Fragment>
            )}
            {isAutheticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link text-warning"
                        onClick={
                            signout
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
);

export default (Menu);
