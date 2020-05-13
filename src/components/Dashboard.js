import React, { useState, useEffect } from "react"
import { TakeawayProvider } from "./takeaways/TakeawayProvider"
import { TakeawayList } from "./takeaways/TakeawayList"
import { FollowingTakeawayList } from "./following/FollowingList"
import { UserList } from "./users/UserList"
import { CategoryProvider } from "./categories/CategoryProvider"
import { SourceProvider } from "./sources/SourceProvider"
import { UserProvider } from "./users/UserProvider"
import { TypeProvider } from "./type/TypeProvider"
import { TakeawaysCategoryProvider } from "./categories/TakeawaysCategoriesProvider"
import { CategorySearchBar } from "./search/CategorySearBar"
import { SourceSearchBar } from "./search/SourceSearchBar"
import "./Dashboard.css"
import { FollowingProvider } from "./following/FollowingProvider"




export const Dashboard = () => {
    const [sourceSearchTerms, setSourceSearchTerms] = useState("")
    const [categorySearchTerms, setCategorySearchTerms] = useState("")
    const [activeList, setActiveList] = useState("takeaways")
    const [components, setComponents] = useState()

    const showTakeaways = () => (


        <CategoryProvider>
            <TakeawayProvider>
                <SourceProvider>
                    <TypeProvider>
                        <TakeawaysCategoryProvider>
                            <TakeawayList sourceSearchTerms={sourceSearchTerms} categorySearchTerms={categorySearchTerms} />
                        </TakeawaysCategoryProvider>
                    </TypeProvider>
                </SourceProvider>
            </TakeawayProvider>
        </CategoryProvider>


    )
    const showFollowingTakeaways = () => (

        <FollowingProvider>
            <TakeawayProvider>
                <CategoryProvider>
                    <SourceProvider>
                        <TypeProvider>
                            <TakeawaysCategoryProvider>
                                <FollowingTakeawayList sourceSearchTerms={sourceSearchTerms} categorySearchTerms={categorySearchTerms} />
                            </TakeawaysCategoryProvider>
                        </TypeProvider>
                    </SourceProvider>
                </CategoryProvider>
            </TakeawayProvider>
        </FollowingProvider>

    )
    const showUsers = () => (

        <CategoryProvider>
            <SourceProvider>
                <FollowingProvider>
                    <UserProvider>
                        <UserList sourceSearchTerms={sourceSearchTerms} categorySearchTerms={categorySearchTerms} />
                    </UserProvider>
                </FollowingProvider>
            </SourceProvider>
        </CategoryProvider>

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

        <div className="mainContainer">
            <header className="header">
                <div className="logo"></div>
                <div className="nav">
                    <div className="nav__takeaways navHeader" onClick={() => setActiveList("takeaways")}>Takeaways</div>
                    <div className="nav__followingTakeaways navHeader" onClick={() => setActiveList("followingTakeaways")}>Following Takeaways</div>
                    <div className="nav__users navHeader" onClick={() => setActiveList("users")}>Users</div>




                </div>
            </header>
            <div className="searchContainer">
                <TakeawayProvider>

                    <div className="searchContainer__sources" >
                        <SourceProvider>
                            <SourceSearchBar setSourceSearchTerms={setSourceSearchTerms} sourceSearchTerms={sourceSearchTerms}/>

                        </SourceProvider>
                    </div>
                    <div className="searchContainer__categories" >
                        <CategoryProvider>
                            <CategorySearchBar setCategorySearchTerms={setCategorySearchTerms} />

                        </CategoryProvider>
                    </div>
                </TakeawayProvider>

            </div>
            <div className="listContainer">{components}</div>
        </div>

    )
}