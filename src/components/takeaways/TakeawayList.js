import React, { useContext, useState } from "react"
import { TakeawayContext } from "./TakeawayProvider"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import { Takeaway } from "./Takeaway"
import { CategoryContext } from "../categories/CategoryProvider"
import { SourceContext } from "../sources/SourceProvider"
import { TypeContext } from "../type/TypeProvider"
import { AddTakeAwayForm } from "./addTakeAwayForm"
import { TakeawaysCategoriesContext } from "../categories/TakeawaysCategoriesProvider"

export const TakeawayList = () => {
    const { takeaways } = useContext(TakeawayContext)
    const { takeawaysCategories } = useContext(TakeawaysCategoriesContext)
    const { categories } = useContext(CategoryContext)
    const { sources } = useContext(SourceContext)
    const { types } = useContext(TypeContext)
    const activeUser = parseInt(localStorage.getItem("takeaways_user"))
    const filteredTakeaways = takeaways.filter(takeaway => takeaway.userId === activeUser)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <>
            <h2>Takeaways</h2>

            <Button onClick={() => {
                // check if the user is authenticated
                const userId = localStorage.getItem("takeaways_user")
                if (userId) {
                    // If the user is authenticated, show the animal form
                    toggle()
                }
            }}>Add New</Button>
            <ul className="takeaways">
                {
                    filteredTakeaways.map(takeaway => {

                        const activeUserCategories = categories.filter((category)=> category.userId === activeUser) || {}
                        const matchingSource = sources.find(source => takeaway.sourceId === source.id) || {}
                        const matchingType = types.find(type => type.id === matchingSource.id) || {}
                        const matchingTakeawayCategories = takeawaysCategories.filter(takeawayCategory => takeawayCategory.takeawayId === takeaway.id) || {}
                        const relatedCategories = matchingTakeawayCategories.map((mtc)=> activeUserCategories.find((cat)=> cat.id === mtc.categoryId ))  || []
                        console.log(matchingTakeawayCategories)

                        return <Takeaway 
                        key={takeaway.id} 
                        takeaway={takeaway} 
                        categories={relatedCategories} 
                        source={matchingSource} 
                        type={matchingType}
                         />
                    })
                }
            </ul>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Add New Takeaway
                </ModalHeader>
                <ModalBody>
                    <AddTakeAwayForm toggler={toggle} />
                </ModalBody>
            </Modal>
        </>

    )
}
