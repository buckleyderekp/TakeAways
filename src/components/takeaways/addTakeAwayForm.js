import React, { useContext, useRef, useState, useEffect } from "react"
import { TypeContext } from "../type/TypeProvider"
import { SourceContext } from "../sources/SourceProvider"
import { TakeawayContext } from "./TakeawayProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { Input, Button } from "reactstrap"
import "./addTakeawayForm.css"




export const AddTakeAwayForm = (props) => {

    const { sources, addSource, currentSource, setCurrentSource, getSources } = useContext(SourceContext)
    const { categories, addCategory, currentCategory, setCurrentCategory, getCategories } = useContext(CategoryContext)
    const { addTakeaway } = useContext(TakeawayContext)
    const { types } = useContext(TypeContext)
    const [sourceInput, setSourceInput] = useState(false)
    const [categoryInput, setCategoryInput] = useState(false)
    const [categorySelected, setCategorySelected] = useState(false)
    const [sourceDropdownSelection, setSourceDropdownSelection] = useState(0)
    const [categoryDropdownSelection, setCategoryDropdownSelection] = useState(0)
    let currentCategoriesForThisTakeaway = []

    const takeaway = useRef()
    const category = useRef()
    const type = useRef()
    const source = useRef()
    const newSource = useRef()
    const newCategory = useRef()
    const userId = parseInt(localStorage.getItem("takeaways_user"))

    useEffect(() => {
        putNewSourceInDropdown()
    }, [sources])

    const putNewSourceInDropdown = () => {
        source.current.value = sourceDropdownSelection
    }

    // const displayCategories = () => {

    //     if (categorySelected){
         
    //      }).join(", ")
    //     }
    //     else {
    //         return ("")
    //     }
    // }


        const putCategoryintoCategoryArray = () => {
            currentCategoriesForThisTakeaway.push(parseInt(category.current.value))
            console.log(currentCategoriesForThisTakeaway)
    }

    const addNewSourceToAPI = () => {
        if (sourceInput) {

            const newSourceObject = {
                source: newSource.current.value,
                typeId: parseInt(type.current.value)
            }

            addSource(newSourceObject)
                .then((res) => {
                    setSourceDropdownSelection(res.id)

                })

        }
    }
    useEffect(() => {
        putNewCategoryInDropdown()
    }, [categories])

    const putNewCategoryInDropdown = () => {
        category.current.value = categoryDropdownSelection
    }

    const addNewCategoryToAPI = () => {
        if (categoryInput) {

            const newCategoryObject = {
                category: newCategory.current.value
            }

            addCategory(newCategoryObject)
                .then((res) => {
                    setCategoryDropdownSelection(res.id)

                })

        }
    }

    const constructNewTakeAway = () => {

        const newTakeawayObject = {
            userId: userId,
            sourceId: parseInt(source.current.value),
            categoryId: parseInt(category.current.value),
            takeaway: takeaway.current.value
        }
        addTakeaway(newTakeawayObject).then(props.toggler)
    }

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
                <Input
                    type="select"
                    defaultValue=""
                    name="type"
                    ref={type}
                    id="takeawayCategory"
                    className="form-control"
                >
                    <option value="0">- Select Type -</option>
                    {types.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.type}
                        </option>
                    ))}
                </Input>
                <Button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            addNewSourceToAPI()
                            setSourceInput(false)
                        }
                    }
                    className="btn btn-primary">
                    Save Source
            </Button>
            </div>
            )
        }
    }
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
                <Button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            addNewCategoryToAPI()
                            setCategoryInput(false)
                        }
                    }
                    className="btn btn-primary">
                    Save Category
            </Button>
            </div>
            )
        }
    }
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
                        {sources.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.source}
                            </option>
                        ))}
                    </select>
                    <Button
                        onClick={
                            evt => {
                                evt.preventDefault()
                                setSourceInput(true)
                            }
                        }
                        className="btn btn-primary">
                        Add New Source
                        </Button>

                    {checkSourceInput()}
                    <div className="form-group">

                        <label htmlFor="category">Choose an Existing Category</label>
                        <div className="currentSelectedCategories">
                            {
                                currentCategoriesForThisTakeaway.map((cat) => `${cat}`)                           
                            }
                        </div>
                        <select
                            defaultValue=""
                            name="category"
                            ref={category}
                            id="takeawayCategory"
                            className="form-control"
                        >
                            <option value="0">- Select a Category -</option>
                            {categories.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.category}
                                </option>
                            ))}
                        </select>
                        <Button
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    putCategoryintoCategoryArray()
                                    setCategorySelected(true)
                                }
                            }
                            className="btn btn-primary">
                            Add Category to Takeaway
            </Button>
                        <Button
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    
                                }
                            }
                            className="btn btn-primary">
                            Create New Category
            </Button>
                    </div>
                    {checkCategoryInput()}

                </div>
                <div className="form-group">
                    <label htmlFor="takeaway">Takeaway: </label>
                    <input
                        type="textarea"
                        id="takeaway"
                        ref={takeaway}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="I learned..."></input>
                    
                </div>
            </fieldset>

            <Button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault()
                        constructNewTakeAway()
                    }
                }
                className="btn btn-primary">
                Save
            </Button>
        </form>
    )
}