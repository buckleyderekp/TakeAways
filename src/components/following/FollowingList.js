//This component lists the takeaways posted by other users that the current user has followed

import React, { useContext, useEffect } from "react"
import { TakeawayContext } from "../takeaways/TakeawayProvider"
import { FollowingTakeaway } from "./FollowingTakeaway"
import { CategoryContext } from "../categories/CategoryProvider"
import { SourceContext } from "../sources/SourceProvider"
import { TypeContext } from "../type/TypeProvider"
import { TakeawaysCategoriesContext } from "../categories/TakeawaysCategoriesProvider"
import { FollowingContext } from "./FollowingProvider"
import { CategorySearchBar } from "../search/CategorySearBar"
import { SourceSearchBar } from "../search/SourceSearchBar"
import { UserContext } from "../users/UserProvider"


export const FollowingTakeawayList = () => {

    const { takeaways, filteredTakeawaysFollowing, setFilteredTakeawaysFollowing } = useContext(TakeawayContext)
    const { takeawaysCategories } = useContext(TakeawaysCategoriesContext)
    const { categories, categorySearchTerms, setCategorySearchTerms } = useContext(CategoryContext)
    const { sources, sourceSearchTerms, setSourceSearchTerms } = useContext(SourceContext)
    const { users, } = useContext(UserContext)
    const { types } = useContext(TypeContext)
    const activeUser = parseInt(localStorage.getItem("takeaways_user"))
    const { following } = useContext(FollowingContext)
    const peopleIFollow = following.filter(fol => fol.followerId === activeUser)

    const takeawaysFollowing = takeaways.filter(takeaway => peopleIFollow.some(pif => pif.followedId === takeaway.userId) ? true : false)



    useEffect(() => {
        setSourceSearchTerms("")
    }, [])

    useEffect(() => {
        setCategorySearchTerms("")
    }, [])

    useEffect(() => {
        setFilteredTakeawaysFollowing(filteredTakeawaysFollowing)
    }, [])

    useEffect(() => {
        setFilteredTakeawaysFollowing(filteredTakeawaysFollowing)
    }, [takeaways])

    // this effect hook watched for changes in the sourceSearchTerms and filters the takeaways displayed based on user input
    useEffect(() => {
        if (sourceSearchTerms !== "") {
            let sourceFilteredTakeawaysFollowing = filteredTakeawaysFollowing.filter(ftf => {

                if (sources.some(s => s.source.toLowerCase().includes(sourceSearchTerms) && s.id === ftf.sourceId)) {
                    return true
                }
                else {
                    return false
                }

            })
            setFilteredTakeawaysFollowing(sourceFilteredTakeawaysFollowing)

        }
        else {
            setFilteredTakeawaysFollowing(takeawaysFollowing)
        }
    },
        [sourceSearchTerms]
    )

    // this effect hook wathes for changes in category search terms and filters  takeaway objects based on user input
    useEffect(() => {
        if (categorySearchTerms !== "") {

            const filteredCategories = categories.filter((c) => c.category.toLowerCase().includes(categorySearchTerms)) || []
            const filteredTakeawayCategories = takeawaysCategories.filter(taca => filteredCategories.some(fc => taca.categoryId === fc.id) ? true : false) || []

            let categoryFilteredTakeawaysFollowing = takeawaysFollowing.filter(tak => {

                if (filteredTakeawayCategories.some(ftc => ftc.takeawayId === tak.id)) {
                    return true
                }
                else {
                    return false
                }
            })
            setFilteredTakeawaysFollowing(categoryFilteredTakeawaysFollowing)
        }
        else {
            setFilteredTakeawaysFollowing(takeawaysFollowing)
        }
    },
        [categorySearchTerms]
    )

    // this displays a message that no users are being followed if the array of takeaways is empty
    if (!takeawaysFollowing.length) {
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
                <h2 className="listHeader">Following Takeaways</h2>
                <div className="notFollowingMessage">You are not currently following anyone. Checkout our users page to find people to follow!</div>
            </>
        )
    }

    else {
        // displays list of takeaway objects on the screen
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
                <h2 className="listHeader">Following Takeaways</h2>

                <ul className="followingTakeaways">
                    {
                        filteredTakeawaysFollowing.map(takeaway => {
                            const userForThisTakeAway = users.find(user => user.id === takeaway.userId)
                            const followedUserCategories = categories.filter((category) => category.userId === takeaway.userId) || {}
                            const matchingSource = sources.find(source => takeaway.sourceId === source.id) || {}
                            const matchingType = types.find(type => type.id === matchingSource.typeId) || {}
                            const matchingTakeawayCategories = takeawaysCategories.filter(takeawayCategory => takeawayCategory.takeawayId === takeaway.id) || {}
                            const relatedCategories = matchingTakeawayCategories.map((mtc) => followedUserCategories.find((cat) => cat.id === mtc.categoryId)) || []
                            return <FollowingTakeaway
                                key={takeaway.id}
                                takeaway={takeaway}
                                categories={relatedCategories}
                                source={matchingSource}
                                type={matchingType}
                                user={userForThisTakeAway}
                            />
                        })
                    }
                </ul>

            </>

        )
    }
}
