import React, { useContext, useState, useEffect } from "react"
import { TakeawayContext } from "./TakeawayProvider"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import { Takeaway } from "./Takeaway"
import { CategoryContext } from "../categories/CategoryProvider"
import { SourceContext } from "../sources/SourceProvider"
import { TypeContext } from "../type/TypeProvider"
import { AddTakeAwayForm } from "./addTakeAwayForm"
import { TakeawaysCategoriesContext } from "../categories/TakeawaysCategoriesProvider"

export const TakeawayList = ({ sourceSearchTerms, categorySearchTerms }) => {

    const { takeaways, filterBarTakeaways, setFilterBarTakeaways } = useContext(TakeawayContext)
    const { takeawaysCategories } = useContext(TakeawaysCategoriesContext)
    const { categories } = useContext(CategoryContext)
    const { sources } = useContext(SourceContext)
    const { types } = useContext(TypeContext)
    const activeUser = parseInt(localStorage.getItem("takeaways_user"))
    const filteredTakeaways = takeaways.filter(takeaway => takeaway.userId === activeUser)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)


    useEffect(() => {
        setFilterBarTakeaways(filteredTakeaways)
    }, [])
    useEffect(() => {
        setFilterBarTakeaways(filteredTakeaways)
    }, [takeaways])


    useEffect(() => {
        if (sourceSearchTerms !== "") {
            let sourceFilteredTakeaways = filteredTakeaways.filter(tak => {

                if (sources.some(s => s.source.toLowerCase().includes(sourceSearchTerms) && s.id === tak.sourceId)) {
                    return true
                }
                else {
                    return false
                }

            })
            console.log(filterBarTakeaways)
            setFilterBarTakeaways(sourceFilteredTakeaways)

        }
        else {
            setFilterBarTakeaways(filteredTakeaways)
        }
    },
        [sourceSearchTerms]
    )
    useEffect(() => {
        if (categorySearchTerms !== "") {
            let categoryFilteredTakeaways = filteredTakeaways.filter(tak => {

                if (categories.some(c => takeawaysCategories.some((tc)=> c.category.toLowerCase().includes(sourceSearchTerms) && tak.Id === tc.takeawayId))) {
                    return true
                }
                else {
                    return false
                }

            })
            
            setFilterBarTakeaways(categoryFilteredTakeaways)

        }
        else {
            setFilterBarTakeaways(filteredTakeaways)
        }
    },
        [categorySearchTerms]
    )

    return (
        <>
            <h2>Takeaways</h2>

            <Button onClick={() => {
                // check if the user is authenticated
                const userId = localStorage.getItem("takeaways_user")
                if (userId) {

                    toggle()
                }
            }}>Add New</Button>
            <ul className="takeaways">
                {
                    filterBarTakeaways.map(takeaway => {

                        const activeUserCategories = categories.filter((category) => category.userId === activeUser) || {}
                        const matchingSource = sources.find(source => takeaway.sourceId === source.id) || {}
                        const matchingType = types.find(type => type.id === matchingSource.id) || {}
                        const matchingTakeawayCategories = takeawaysCategories.filter(takeawayCategory => takeawayCategory.takeawayId === takeaway.id) || {}
                        const relatedCategories = matchingTakeawayCategories.map((mtc) => activeUserCategories.find((cat) => cat.id === mtc.categoryId)) || []

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
