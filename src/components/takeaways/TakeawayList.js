import React, { useContext, useState, useEffect } from "react"
import { TakeawayContext } from "./TakeawayProvider"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import { Takeaway } from "./Takeaway"
import { CategoryContext } from "../categories/CategoryProvider"
import { SourceContext } from "../sources/SourceProvider"
import { TypeContext } from "../type/TypeProvider"
import { AddTakeAwayForm } from "./addTakeAwayForm"
import { TakeawaysCategoriesContext } from "../categories/TakeawaysCategoriesProvider"
import "./takeawayList.css"

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

            const filteredCategories = categories.filter((c) => c.category.toLowerCase().includes(categorySearchTerms)) || []
            const filteredTakeawayCategories = takeawaysCategories.filter(taca => filteredCategories.some(fc => taca.categoryId === fc.id) ? true : false)  || []

            let categoryFilteredTakeaways = filteredTakeaways.filter(tak => {

                if (filteredTakeawayCategories.some(ftc => ftc.takeawayId  === tak.id)) {
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
            <h2 className="listHeader">Takeaways</h2>
        <div className="buttonContainer">

            <button className ="button" id="addNew" onClick={() => {
                // check if the user is authenticated
                const userId = localStorage.getItem("takeaways_user")
                if (userId) {
                    
                    toggle()
                }
            }}>New</button>
            </div>
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
            <Modal className="formModal" isOpen={modal} toggle={toggle}>
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
