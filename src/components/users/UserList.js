import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { SourceContext } from "../sources/SourceProvider"
import { User } from "./User"
import "./UserList.css"
import { CategorySearchBar }  from "../search/CategorySearBar"
import { SourceSearchBar }  from "../search/SourceSearchBar"
import { CategoryContext } from "../categories/CategoryProvider"



export const UserList = () => {

    const { users, filteredUsers, setFilteredUsers } = useContext(UserContext)
    const { sources, sourceSearchTerms, setSourceSearchTerms } = useContext(SourceContext)
    const { categories, categorySearchTerms, setCategorySearchTerms } = useContext(CategoryContext)
    const activeUser = parseInt(localStorage.getItem("takeaways_user"))

    const usersToDisplay = users.filter(user => {
        if (user.id === activeUser) {
            return false
        }
        else {
            return true
        }
    })


    useEffect(() => {
        setFilteredUsers(usersToDisplay)
    }, [])

    useEffect(() => {
        setSourceSearchTerms("")
    }, [])

    useEffect(() => {
        setCategorySearchTerms("")
    }, [])

    useEffect(() => {
        if (sourceSearchTerms !== "") {
            let sourceFilteredUsers = usersToDisplay.filter(utd => {

                if (sources.some(s => s.source.toLowerCase().includes(sourceSearchTerms) && s.userId === utd.id)) {
                    return true
                }
                else {
                    return false
                }

            })
            setFilteredUsers(sourceFilteredUsers)
        }
        else {
            setFilteredUsers(usersToDisplay)
        }
    },
        [sourceSearchTerms]
    )

    useEffect(() => {
        if (categorySearchTerms !== "") {

          

            let categoryFilteredUsers = usersToDisplay.filter(utd => {

                if (categories.some(c => c.category.toLowerCase().includes(categorySearchTerms) && c.userId === utd.id)) {
                    return true
                }
                else {
                    return false
                }

            })
            setFilteredUsers(categoryFilteredUsers)
        }
        else {
            setFilteredUsers(usersToDisplay)
        }
    },
        [categorySearchTerms]
    )




    return (
        <>
            <div className="searchContainer">
                <div className="searchContainer__sources" >
                    <SourceSearchBar />
                </div>
                <div className="searchContainer__categories" >
                    <CategorySearchBar />
                </div>
            </div>
            <h2 className="listHeader">Users</h2>

            <ul className="Users">
                {
                    filteredUsers.map(user => {

                        return <User
                            key={user.id}
                            user={user}
                        />
                    })
                }
            </ul>
        </>
    )
}