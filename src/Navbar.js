import React from "react";
import './configureAmplify'
import {useEffect, useState} from "react";
import {Auth, Hub} from "aws-amplify";
import {Link, Outlet} from "react-router-dom";
// import {data} from "autoprefixer";

const Navbar = () => {
    const[signedUser, setSignedUser] = useState(false);
    useEffect(() => {
        authListener();
    }, [])

    async function authListener() {
        Hub.listen("auth", (data) => {
            // eslint-disable-next-line default-case
            switch (data.payload.event) {
                case "signIn":
                    return setSignedUser(true)
                case "signOut":
                    return setSignedUser(false)
            }
        })
        try {
            await Auth.currentAuthenticatedUser()
            setSignedUser(true)
        }catch (err) {}
    }

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/create-post'>Create-post</Link>
                    </li>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    {signedUser && (
                        <li>
                            <Link to='/my-post'>My Post</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;
