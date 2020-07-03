// The purpose of this component is to control which list is displayed on the screen based off of user interaction


import React, { useState, useEffect, useContext } from "react"
import { TakeawayProvider } from "./takeaways/TakeawayProvider"
import { TakeawayList } from "./takeaways/TakeawayList"
import { FollowingTakeawayList } from "./following/FollowingList"
import { UserList } from "./users/UserList"
import { CategoryProvider } from "./categories/CategoryProvider"
import { SourceProvider, SourceContext } from "./sources/SourceProvider"
import { UserProvider } from "./users/UserProvider"
import { TypeProvider } from "./type/TypeProvider"
import { TakeawaysCategoryProvider } from "./categories/TakeawaysCategoriesProvider"
import "./Dashboard.css"
import { FollowingProvider } from "./following/FollowingProvider"




export const Dashboard = () => {

    const [activeList, setActiveList] = useState("takeaways")


    const [components, setComponents] = useState()

    const showTakeaways = () => (
        <TakeawayList />
    )


    const showFollowingTakeaways = () => (
        <FollowingTakeawayList />
    )


    const showUsers = () => (
        <UserList />
    )


    useEffect(() => {
        if (activeList === "takeaways") {
            setComponents(showTakeaways)
        }
        else if (activeList === "followingTakeaways") {
            setComponents(showFollowingTakeaways)
        }
        else if (activeList === "users") {
            setComponents(showUsers)
        }
    }, [activeList])

    return (
        <CategoryProvider>
            <FollowingProvider>
                <SourceProvider>
                    <TypeProvider>
                        <TakeawaysCategoryProvider>
                            <FollowingProvider>
                                <UserProvider>
                                    <TakeawayProvider>
                                        <div className="mainContainer">
                                            <header className="header">
                                                <div className="logo"></div>
                                                <div className="nav">
                                                    <div className="nav__takeaways navHeader" onClick={() => setActiveList("takeaways")}>Takeaways</div>
                                                    <div className="nav__followingTakeaways navHeader" onClick={() => setActiveList("followingTakeaways")}>Following Takeaways</div>
                                                    <div className="nav__users navHeader" onClick={() => setActiveList("users")}>Users</div>
                                                </div>
                                            </header>
                                            <div className="listContainer">{components}</div>
                                        </div>
                                    </TakeawayProvider>
                                </UserProvider>
                            </FollowingProvider>
                        </TakeawaysCategoryProvider>
                    </TypeProvider>
                </SourceProvider>
            </FollowingProvider>
        </CategoryProvider>
    )
}