// This component is responsible for the adding new takeaway form

import React, { useContext, useRef, useState, useEffect } from "react"
import { TypeContext } from "../type/TypeProvider"
import { SourceContext } from "../sources/SourceProvider"
import { TakeawayContext } from "./TakeawayProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { TakeawaysCategoriesContext } from "../categories/TakeawaysCategoriesProvider"
import { Button, Input } from "reactstrap"
import "./addTakeawayForm.css"


export const AddTakeAwayForm = (props) => {

    const { sources, addSource, currentSource, setCurrentSource, getSources } = useContext(SourceContext)
    const { categories, addCategory, currentCategory, setCurrentCategory, getCategories } = useContext(CategoryContext)
    const { takeaways, addTakeaway } = useContext(TakeawayContext)
    const { addTakeawaysCategory } = useContext(TakeawaysCategoriesContext)
    const { types } = useContext(TypeContext)
    const [sourceInput, setSourceInput] = useState(false)
    const [categoryInput, setCategoryInput] = useState(false)
    const [categorySelected, setCategorySelected] = useState(false)
    const [sourceDropdownSelection, setSourceDropdownSelection] = useState(0)
    const [currentTakeawayId, setCurrentTakeawayId] = useState(0)
    const [categoryDropdownSelection, setCategoryDropdownSelection] = useState(0)
    const [takeawaysCategories, setTakeawaysCategories] = useState([])
    const categoriesForThisTakeaway = takeawaysCategories.map((tak) => categories.find((cat) => cat.id === tak)) || []

    const takeaway = useRef()
    const category = useRef()
    const type = useRef()
    const source = useRef()
    const newSource = useRef()
    const newCategory = useRef()
    const userId = parseInt(localStorage.getItem("takeaways_user"))

    const sourcesForThisUser = sources.filter(s => s.userId === userId)
    const categoriesForThisUser = categories.filter(c => c.userId === userId)
    // this watches for changes in the state of sources and when there is a state change runs the function that sets the 
    // value of the dropdown equal to the state variable
    useEffect(() => {
        putNewSourceInDropdown()
    }, [sources])

    // this watches for changes in the state of categories and when there is a state change runs the function that sets the 
    // value of the dropdown equal to the state variable
    useEffect(() => {
        putNewCategoriesRelationship()
    }, [takeaways])

    // this function sets the value of the dropdown equal to the value stored in the state variable
    const putNewSourceInDropdown = () => {
        source.current.value = sourceDropdownSelection
    }

    // this function maps over the array of categories the user has selected for a takeaway object
    // and for each item in the array constructs an object and puts the relationship in to the api
    const putNewCategoriesRelationship = () => {
        takeawaysCategories.map((takcat) => {
            const newTakeCatObj = {
                takeawayId: parseInt(currentTakeawayId),
                categoryId: takcat
            }
            addTakeawaysCategory(newTakeCatObj)
        })
    }



    const putCategoryintoCategoryArray = () => {
        // copy the state variable with slice
        const copy = takeawaysCategories.slice()
        //  push new value in to the copy

        copy.push(parseInt(category.current.value))
        // call setter function and pass in array as an argument
        setTakeawaysCategories(copy)
        console.log(takeawaysCategories)

    }

    // this function builds a new source object and puts it in to the api
    // and sets the state variable for the dropdown selection as the id of the newly created source
    const addNewSourceToAPI = () => {
        if (sourceInput) {

            const newSourceObject = {
                source: newSource.current.value,
                typeId: parseInt(type.current.value),
                userId: parseInt(localStorage.getItem("takeaways_user"))
            }
            console.log(newSourceObject)
            addSource(newSourceObject)
                .then((res) => {
                    setSourceDropdownSelection(res.id)

                })

        }
    }

    // this function listens for changes in state in the categories provider 
    // then runs a function that puts the newly created category in to the dropdown
    useEffect(() => {
        putNewCategoryInDropdown()
    }, [categories])

    // this function puts the newly created category in to the category dropdown
    const putNewCategoryInDropdown = () => {
        category.current.value = categoryDropdownSelection
    }

    // this function builds a category object and puts it in to the api 
    // and sets the state variable for the category dropdown as the id of the newly created source
    const addNewCategoryToAPI = () => {
        if (categoryInput) {

            const newCategoryObject = {
                category: newCategory.current.value,
                userId: userId
            }

            addCategory(newCategoryObject)
                .then((res) => {
                    setCategoryDropdownSelection(res.id)

                })

        }
    }

    // this function constructs a new takeaway object, puts it in to the api, sets the state variable of currentTakeawayId equal to the id 
    // of the newly created takeaway and then closes the modal
    const constructNewTakeAway = () => {

        const newTakeawayObject = {
            userId: userId,
            sourceId: parseInt(source.current.value),
            takeaway: takeaway.current.value
        }
        addTakeaway(newTakeawayObject)
            .then((res) => {
                setCurrentTakeawayId(res.id)
            })
            .then(props.toggler)
    }

    // this function listens for the state of source input and when the user clicks "add new source" and the state variable
    // changes to true the additional inputs appear to enter a new source
    const checkSourceInput = () => {
        if (sourceInput) {
            return (<div className="form-group">
                <label htmlFor="newSource">New Source: </label>
                <input
                    type="text"
                    id="newSource"
                    ref={newSource}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="New Source"
                />
                <label htmlFor="category">Choose a Type  </label>
                <select
                    type="select"
                    defaultValue=""
                    name="type"
                    ref={type}
                    id="sourceType"
                    className="form-control"
                >
                    <option value="0">- Select Type -</option>
                    {types.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.type}
                        </option>

                    ))}
                </select>
                <button className="button" type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            addNewSourceToAPI()
                            setSourceInput(false)
                        }
                    }
                >
                    Save Source
            </button>
            </div>
            )
        }
    }

    // this function listens for the state of category input and when the user clicks "add new category" and the state variable
    // changes to true the additional inputs appear to enter a new source
    const checkCategoryInput = () => {
        if (categoryInput) {
            return (<div className="form-group">
                <label htmlFor="newCategory">New Category: </label>
                <input
                    type="text"
                    id="newCategory"
                    ref={newCategory}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="New Category"
                />
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            addNewCategoryToAPI()
                            setCategoryInput(false)
                        }
                    }
                    className="button">
                    Save Category
            </button>
            </div>
            )
        }
    }

    // here is the actual form
    return (
        <form className="takeawayForm">

            <fieldset>
                <div className="form-group">
                    <label htmlFor="source">Choose an Existing Source  </label>
                    <select
                        name="source"
                        ref={source}
                        id="takeawaySource"
                        className="form-control"
                    >
                        <option value="0">- Select a source -</option>
                        {sourcesForThisUser.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.source}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={
                            evt => {
                                evt.preventDefault()
                                setSourceInput(true)
                            }
                        }
                        className="button">
                        Add New Source
                        </button>

                    {checkSourceInput()}
                    <div className="form-group">

                        <label htmlFor="category">Choose an Existing Category</label>
                        <div className="category__categoriesList">{categoriesForThisTakeaway.map((cat) => {
                            return `${cat.category}` || ""
                        }).join(", ")
                        }</div>
                        <select
                            defaultValue=""
                            name="category"
                            ref={category}
                            id="takeawayCategory"
                            className="form-control"
                        >
                            <option value="0">- Select a Category -</option>
                            {categoriesForThisUser.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.category}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    putCategoryintoCategoryArray()
                                    setCategorySelected(true)
                                }
                            }
                            className="button">
                            Add Category to Takeaway
            </button>
                        <button
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    setCategoryInput(true)

                                }
                            }
                            className="button">
                            Create New Category
            </button>
                    </div>
                    {checkCategoryInput()}

                </div>
                <div className="form-group">
                    <label htmlFor="takeaway">Takeaway: </label>
                    <Input
                        type="textarea"
                        id="takeawayInput"
                        innerRef={takeaway}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="I learned..." />

                </div>
            </fieldset>

            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault()
                        constructNewTakeAway()
                    }
                }
                className="button">
                Save
            </button>
        </form >
    )
}