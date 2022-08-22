import './configureAmplify'
import React, {useEffect, useState} from "react";
import {API} from "aws-amplify";
import {listPosts} from "./graphql/queries";

export default function Home() {

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

    return (
        <div>
            <h1 className="text-sky-800 text-3xl font-bold underline">
                MY POST
            </h1>
            {
                posts.map((post, app) => (
                    <p key={app}>{post.title}
                    </p>
                ))
            }
        </div>
    )

}
