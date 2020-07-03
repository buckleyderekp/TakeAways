// The puspose of this component is to interact with the user portion of the database. 

import React, { useState, useEffect } from "react"


export const UserContext = React.createContext()



export const UserProvider = (props) => {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [filteredUsers, setFilteredUsers] = useState([])


    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const addUser = user => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then((res) => {
                const createdUser = res
                getUsers()
                return createdUser
            })
    }

    const deleteUser = userId => {
        return fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE"
        })
            .then(getUsers)
    }

    const updateUser = user => {
        return fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }


    useEffect(() => {
        getUsers()
    }, [])


    return (
        <UserContext.Provider value={
            {
                users,
                addUser,
                deleteUser,
                updateUser,
                currentUser,
                setCurrentUser,
                filteredUsers,
                setFilteredUsers
            }
        }>
            {props.children}
        </UserContext.Provider>
    )
}
