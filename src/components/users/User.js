import React, { useContext, useState, useEffect } from "react"
import { FollowingContext } from "../following/FollowingProvider"
import { UserModal } from "./UserProfileModal"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import "./User.css"


export const User = ({ user }) => {
    const { following, addFollowing, deleteFollowing } = useContext(FollowingContext)

    const activeUser = parseInt(localStorage.getItem("takeaways_user"))
    const [userModal, setUserModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(user)
    const toggleUserModal = () => setUserModal(!userModal)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followToBeDeleted, setFollowToBeDeleted] = useState({})
    const [userToBeUnfollowed, setUserToBeUnfollowed] = useState()

    const addNewFollowRelationship = () => {
        const newRelationship = {
            followerId: activeUser,
            followedId: user.id
        }
        addFollowing(newRelationship)
    }

    const amIFollowingThisPerson = () => {

        if (following.find(fol => fol.followedId === user.id && fol.followerId === activeUser)) {
            setIsFollowing(true)
        }
        else{
            setIsFollowing(false)
        }
    }

    useEffect(() => {
        amIFollowingThisPerson()
    }, [following])

    useEffect(() => {
        deleteFollowing(followToBeDeleted.id)
    }, [followToBeDeleted])

    const findFollowingRelationship = () => {
        const followingRelationship = following.find(fol => fol.followedId === user.id && fol.followerId === activeUser)
        setFollowToBeDeleted(followingRelationship)
    }

    const followButton = () => {
        if (!isFollowing) {
            return (
                <button
                    onClick={
                        evt => {
                            evt.preventDefault()
                            addNewFollowRelationship()
                            
                        }
                    }
                    className="button">
                    Follow
                </button>
            )
        }
        else {
            return (
                <button
                    onClick={
                        evt => {
                            evt.preventDefault()
                            findFollowingRelationship()
                        }
                    }
                    className="button">
                    Unfollow
                </button>
            )
        }

    }
    return (
        <>
            <section className="user">
                <div className="user__name">{user.name}</div>
                <div className="userButtonContainer">

                <button
                    onClick={
                        evt => {
                            evt.preventDefault()
                            setSelectedUser(user)
                            toggleUserModal()
                        }
                    }
                    className="button">
                    User Profile
                             </button>
                {followButton()}
                    </div>

            </section>
            <Modal className="formModal" isOpen={userModal} toggle={toggleUserModal}>
                <ModalHeader toggle={toggleUserModal}>
                    User Info
                    </ModalHeader>
                <ModalBody>
                    <UserModal user={selectedUser} toggler={toggleUserModal} />
                </ModalBody>
            </Modal></>
    )
}