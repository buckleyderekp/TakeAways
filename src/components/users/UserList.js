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
    const { categories, categorySearchTerms } = useContext(CategoryContext)
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
    // useEffect(() => {
    //     if (categorySearchTerms !== "" && sourceSearchTerms !== "") {

    //         const filteredCategories = categories.filter((c) => c.category.toLowerCase().includes(categorySearchTerms)) || []
    //         const filteredTakeawayCategories = takeawaysCategories.filter(taca => filteredCategories.some(fc => taca.categoryId === fc.id) ? true : false)  || []

    //         let categoryFilteredTakeaways = filteredTakeaways.filter(tak => {

    //             if (filteredTakeawayCategories.some(ftc => ftc.takeawayId  === tak.id)) {
    //                 return true
    //             }
    //             else {
    //                 return false
    //             }
    //         })
    //         let sourceFilteredTakeaways = filteredTakeaways.filter(tak => {

    //             if (sources.some(s => s.source.toLowerCase().includes(sourceSearchTerms) && s.id === tak.sourceId)) {
    //                 return true
    //             }
    //             else {
    //                 return false
    //             }

    //         })

    //         let sourceAndCategoryFilteredTakeaways = categoryFilteredTakeaways.filter(cft=> sourceFilteredTakeaways.filter(sft=> sft.id === cft.id))
    //         setFilterBarTakeaways(sourceAndCategoryFilteredTakeaways)
    //     }

    // },
    //     [categorySearchTerms, sourceSearchTerms]
    // )


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