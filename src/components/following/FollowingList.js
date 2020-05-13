import React, { useContext, useState, useEffect } from "react"
import { TakeawayContext } from "../takeaways/TakeawayProvider"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import { FollowingTakeaway } from "./FollowingTakeaway"
import { CategoryContext } from "../categories/CategoryProvider"
import { SourceContext } from "../sources/SourceProvider"
import { TypeContext } from "../type/TypeProvider"
import { TakeawaysCategoriesContext } from "../categories/TakeawaysCategoriesProvider"
import { FollowingContext } from "./FollowingProvider"

export const FollowingTakeawayList = ({ sourceSearchTerms, categorySearchTerms, followingRelationships }) => {

    const { takeaways, filterBarTakeaways, setFilterBarTakeaways } = useContext(TakeawayContext)
    const { takeawaysCategories } = useContext(TakeawaysCategoriesContext)
    const { categories } = useContext(CategoryContext)
    const { sources } = useContext(SourceContext)
    const { types } = useContext(TypeContext)
    const activeUser = parseInt(localStorage.getItem("takeaways_user"))
    const { following } = useContext(FollowingContext)
    const peopleIFollow = following.filter(fol=> fol.followerId === activeUser)

    const filteredTakeawaysFollowing = takeaways.filter(takeaway => peopleIFollow.some(pif=> pif.followedId === takeaway.userId) ? true : false)
  



    // useEffect(() => {
    //     setFilterBarTakeaways(filteredTakeaways)
    // }, [])
    // useEffect(() => {
    //     setFilterBarTakeaways(filteredTakeaways)
    // }, [takeaways])


    // useEffect(() => {
    //     if (sourceSearchTerms !== "") {
    //         let sourceFilteredTakeaways = filteredTakeaways.filter(tak => {

    //             if (sources.some(s => s.source.toLowerCase().includes(sourceSearchTerms) && s.id === tak.sourceId)) {
    //                 return true
    //             }
    //             else {
    //                 return false
    //             }

    //         })
    //         console.log(filterBarTakeaways)
    //         setFilterBarTakeaways(sourceFilteredTakeaways)

    //     }
    //     else {
    //         setFilterBarTakeaways(filteredTakeaways)
    //     }
    // },
    //     [sourceSearchTerms]
    // )
    // useEffect(() => {
    //     if (categorySearchTerms !== "") {

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
    //         setFilterBarTakeaways(categoryFilteredTakeaways)
    //     }
    //     else {
    //         setFilterBarTakeaways(filteredTakeaways)
    //     }
    // },
    //     [categorySearchTerms]
    // )
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

    if(filteredTakeawaysFollowing === []){
        return (
            <div className="notFollowingMessage">You are not currently following anyone. Checkout our users page to find people to follow!</div>
        )
    }

    else {

    return (
        <>
            <h2 className="listHeader">Following Takeaways</h2>

            <ul className="followingTakeaways">
                {
                    filteredTakeawaysFollowing.map(takeaway => {

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
                        />
                    })
                }
            </ul>

        </>

    )
            }
}
