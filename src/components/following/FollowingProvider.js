//This component interacts with the following setion of the database which is responsible for storing the relationship of one user to another based on 
// a user clicking the "Follow" button on their profile

import React, { useState, useEffect } from "react"

export const FollowingContext = React.createContext()


export const FollowingProvider = (props) => {

    const [following, setFollowing] = useState([])


    const getFollowing = () => {
        return fetch("http://localhost:8088/following")
            .then(res => res.json())
            .then(setFollowing)
    }

    const addFollowing = following => {
        return fetch("http://localhost:8088/following", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(following)
        })
            .then(res => res.json())
            .then((res) => {
                const createdFollowing = res
                getFollowing()
                return createdFollowing
            })
    }

    const deleteFollowing = followingId => {
        return fetch(`http://localhost:8088/following/${followingId}`, {
            method: "DELETE"
        })
            .then(getFollowing)
    }




    useEffect(() => {
        getFollowing()
    }, [])

    return (
        <FollowingContext.Provider value={
            {
                following,
                setFollowing,
                addFollowing,
                deleteFollowing
            }
        }>
            {props.children}
        </FollowingContext.Provider>
    )
}