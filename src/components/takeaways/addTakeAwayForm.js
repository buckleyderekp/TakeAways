import React, { useContext, useRef, useState } from "react"
import { TypeContext } from "../type/TypeProvider"
import { SourceContext } from "../sources/SourceProvider"
import { TakeawayContext } from "./TakeawayProvider"
import { CategoryContext } from "../categories/CategoryProvider"




export const AddTakeAwayForm = () => {

    const { sources, addSource, currentSource, setCurrentSource } = useContext(SourceContext)
    const { categories, addCategory, currentCategory, setCurrentCategory } = useContext(CategoryContext)
    const { addTakeaway } = useContext(TakeawayContext)
    const { types } = useContext(TypeContext)
    const [sourceInput, setSourceInput] = useState(false)
    const [categoryInput, setCategoryInput] = useState(false)

    const takeaway = useRef()
    const category = useRef()
    const type = useRef()
    const source = useRef()
    const newSource = useRef()
    const newCategory = useRef()
    const userId = localStorage.getItem("takeaways_user")

    const addNewSourceToAPI = () => {
        if (sourceInput) {

            const newSourceObject = {
                source: newSource.current.value,
                typeId: type.current.value
            }

            addSource(newSourceObject).then((res) => {
                setCurrentSource(res)
                console.log(res)
            })
        }
        else {
            const currentSource = sources.find(source => source.id === source.current.value) || {}
            setCurrentSource(currentSource)
        }
        console.log(currentSource)
    }

    const constructNewTakeAway = () => {
        let currentActiveCategory = 0

        if (categoryInput) {
            currentActiveCategory = currentSource.id
        }
        else {
            currentActiveCategory = source
        }
        const newTakeawayObject = {
            userId: userId,
            sourceId: currentSource.id,
            categoryId: currentActiveCategory,
            takeaway: takeaway.current.value
        }
        console.log(newTakeawayObject)
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
            </div>
                                <label htmlFor="category">Choose a Type  </label>
                                <select
                                    defaultValue=""
                                    name="category"
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
                                </select>
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
                        defaultValue=""
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
                    <button
                        onClick={
                            evt => {
                                evt.preventDefault()
                                setSourceInput(true)
                            }
                        }
                        className="btn btn-primary">
                        Add New Source
            </button>
                    {checkSourceInput()}
                    <label htmlFor="category">Choose an Existing Category</label>
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
                    <button
                        onClick={
                            evt => {
                                evt.preventDefault()
                                setCategoryInput(true)
                            }
                        }
                        className="btn btn-primary">
                        Add New Category
            </button>
                    {checkCategoryInput()}

                </div>
                <div className="form-group">
                    <label htmlFor="takeaway">Takeaway: </label>
                    <input
                        type="text"
                        id="takeaway"
                        ref={takeaway}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="I learned..."
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault()
                        addNewSourceToAPI()
                        // addNewCategoryToAPI()
                        constructNewTakeAway()
                        console.log(currentCategory, currentSource)
                    }
                }
                className="btn btn-primary">
                Save
            </button>
        </form>
    )
}