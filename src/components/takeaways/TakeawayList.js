import React, { useContext, useState, useEffect } from "react"
import { TakeawayContext } from "./TakeawayProvider"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import { Takeaway } from "./Takeaway"
import { CategoryContext } from "../categories/CategoryProvider"
import { EditCategoriesForm } from "../categories/manageCategoriesModal"
import { EditSourcesForm } from "../sources/ManageSourcesModal"
import { SourceContext } from "../sources/SourceProvider"
import { TypeContext } from "../type/TypeProvider"
import { AddTakeAwayForm } from "./addTakeAwayForm"
import { TakeawaysCategoriesContext } from "../categories/TakeawaysCategoriesProvider"
import "./takeawayList.css"
import "./addTakeawayForm.css"
import { CategorySearchBar } from "../search/CategorySearBar"
import { SourceSearchBar } from "../search/SourceSearchBar"

export const TakeawayList = () => {

    const { takeaways, filterBarTakeaways, setFilterBarTakeaways } = useContext(TakeawayContext)
    const { takeawaysCategories } = useContext(TakeawaysCategoriesContext)
    const { categories, categorySearchTerms, setCategorySearchTerms } = useContext(CategoryContext)
    const { sources, sourceSearchTerms, setSourceSearchTerms } = useContext(SourceContext)
    const { types } = useContext(TypeContext)
    const activeUser = parseInt(localStorage.getItem("takeaways_user"))
    const filteredTakeaways = takeaways.filter(takeaway => takeaway.userId === activeUser)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [sourcesModal, setSourcesModal] = useState(false)
    const toggleSources = () => setSourcesModal(!sourcesModal)
    const [categoriesModal, setCategoriesModal] = useState(false)
    const toggleCategories = () => setCategoriesModal(!categoriesModal)


    useEffect(() => {
        setFilterBarTakeaways(filteredTakeaways)
    }, [])
    useEffect(() => {
        setFilterBarTakeaways(filteredTakeaways)
    }, [takeaways])

    useEffect(() => {
        setSourceSearchTerms("")
    }, [])


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
            const filteredTakeawayCategories = takeawaysCategories.filter(taca => filteredCategories.some(fc => taca.categoryId === fc.id) ? true : false) || []

            let categoryFilteredTakeaways = filteredTakeaways.filter(tak => {

                if (filteredTakeawayCategories.some(ftc => ftc.takeawayId === tak.id)) {
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
    useEffect(() => {
        if (categorySearchTerms !== "" && sourceSearchTerms !== "") {

            const filteredCategories = categories.filter((c) => c.category.toLowerCase().includes(categorySearchTerms)) || []
            const filteredTakeawayCategories = takeawaysCategories.filter(taca => filteredCategories.some(fc => taca.categoryId === fc.id) ? true : false) || []

            let categoryFilteredTakeaways = filteredTakeaways.filter(tak => {

                if (filteredTakeawayCategories.some(ftc => ftc.takeawayId === tak.id)) {
                    return true
                }
                else {
                    return false
                }
            })
            let sourceFilteredTakeaways = filteredTakeaways.filter(tak => {

                if (sources.some(s => s.source.toLowerCase().includes(sourceSearchTerms) && s.id === tak.sourceId)) {
                    return true
                }
                else {
                    return false
                }

            })

            let sourceAndCategoryFilteredTakeaways = categoryFilteredTakeaways.filter(cft => sourceFilteredTakeaways.filter(sft => sft.id === cft.id))
            setFilterBarTakeaways(sourceAndCategoryFilteredTakeaways)
        }

    },
        [categorySearchTerms, sourceSearchTerms]
    )

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
            <h2 className="listHeader">Takeaways</h2>
            <div className="buttonContainer">
                <div className="editSourcesCategoriesContainer">

                    <button className="button" id="manageCategories" onClick={() => {
                        // check if the user is authenticated
                        const userId = localStorage.getItem("takeaways_user")
                        if (userId) {

                            toggleCategories()
                        }
                    }}>Manage Categories</button>
                    <button className="button" id="manageSources" onClick={() => {
                        // check if the user is authenticated
                        const userId = localStorage.getItem("takeaways_user")
                        if (userId) {

                            toggleSources()
                        }
                    }}>Manage Sources</button>
                </div>
                <div className="addNewButtonContainer">
                    <button className="button addNewButton" id="addNew" onClick={() => {

                        // check if the user is authenticated
                        const userId = localStorage.getItem("takeaways_user")
                        if (userId) {

                            toggle()
                        }
                    }}>New Takeaway</button>
                </div>
            </div>
            <ul className="takeaways">
                {
                    filterBarTakeaways.map(takeaway => {

                        const activeUserCategories = categories.filter((category) => category.userId === activeUser) || {}
                        const matchingSource = sources.find(source => takeaway.sourceId === source.id) || {}
                        const matchingType = types.find(type => type.id === matchingSource.typeId) || {}
                        const matchingTakeawayCategories = takeawaysCategories.filter(takeawayCategory => takeawayCategory.takeawayId === takeaway.id) || []
                        const relatedCategories = matchingTakeawayCategories.map((mtc) => activeUserCategories.find((cat) => cat.id === mtc.categoryId)) || {}
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
            <Modal className="formModal" isOpen={categoriesModal} toggle={toggleCategories}>
                <ModalHeader toggle={toggleCategories}>
                    Manage Categories
                </ModalHeader>
                <ModalBody>
                    <EditCategoriesForm toggler={toggleCategories} />
                </ModalBody>
            </Modal>
            <Modal className="formModal" isOpen={sourcesModal} toggle={toggleSources}>
                <ModalHeader toggle={toggleSources}>
                    Manage Sources
                </ModalHeader>
                <ModalBody>
                    <EditSourcesForm toggler={toggleSources} />
                </ModalBody>
            </Modal>
        </>

    )
}
