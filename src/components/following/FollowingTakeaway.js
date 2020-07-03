// This purpose of this component is to hold the representation of one takeaway object for someone the user is following

import React, { useContext, useState, useEffect } from "react"
import { FollowingContext } from "./FollowingProvider"



export const FollowingTakeaway = ({ takeaway, source, type, categories, user }) => {

    const [followToBeDeleted, setFollowToBeDeleted] = useState({})
    const { following, deleteFollowing } = useContext(FollowingContext)
    const activeUser = parseInt(localStorage.getItem("takeaways_user"))

    const findFollowingRelationship = () => {
        const followingRelationship = following.find(fol => fol.followedId === user.id && fol.followerId === activeUser)
        setFollowToBeDeleted(followingRelationship)
    }

    useEffect(() => {
        deleteFollowing(followToBeDeleted.id)
    }, [followToBeDeleted])


    return (
        <section className="takeaway">
            <div className="takeaway__user takeawayText">{user.name}                 <button
                onClick={
                    evt => {
                        evt.preventDefault()
                        findFollowingRelationship()
                    }
                }
                className="button">
                Unfollow
                </button></div>
            <div className="takeaway__source takeawayText">{source.source}</div>
            <div className="takeaway__sourceType takeawayText">Source Type: {type.type}</div>
            <div className="takeaway__categories takeawayText">Category: {categories.map((cat) => {

                return `${cat.category}` || ""
            }).join(", ")
            }

            </div>
            <div className="takeaway__text takeawayText">Takeaway:  {takeaway.takeaway}</div>


        </section>
    )
}