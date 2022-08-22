import './configureAmplify'
import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import {API, Auth, Hub} from "aws-amplify";
import {listPosts} from "./graphql/queries";

export default function App() {
    const [posts, setPosts] = useState([])

    async function fetchPosts() {
        const postData = await API.graphql({
            query: listPosts
        })
        setPosts(postData?.data?.listPosts.items)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const [signedUser, setSignedUser] = useState(false);
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
        } catch (err) {
        }

        return (
            <div>

                <Routes>
                    <Route path='/' element={<Navbar home={Home}/>}>
                        <Route index element={<Home posts={posts}/>}/>
                        }
                        />
                        <Route path='profile' element={<Profile/>}/>
                        {signedUser && (
                            <Route
                                path='my-post'
                                element={<MyPost posts={posts}/>
                                }
                            />
                        )}
                    </Route>
                </Routes>
            </div>
        )
    }
}

