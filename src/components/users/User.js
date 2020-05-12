import React, { useContext, useState } from "react"
import { FollowingContext } from "../following/FollowingProvider"
import { UserModal } from "./UserProfileModal"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"


export const User = ({ user }) => {
    const { addFollowing } = useContext(FollowingContext)

    const activeUser = parseInt(localStorage.getItem("takeaways_user"))
    const [userModal, setUserModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(user)
    const toggleUserModal = () => setUserModal(!userModal)
  
const addNewFollowRelationship = () => {
    const newRelationship ={
        followerId: activeUser,
        followedId: user.id
    }
addFollowing(newRelationship )
}

    return (
        <>
        <section className="user">
            <div className="user__name">{user.name}</div>
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