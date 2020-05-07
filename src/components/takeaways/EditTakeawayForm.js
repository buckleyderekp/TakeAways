import React, { useContext, useRef, useState, useEffect } from "react"
import { TypeContext } from "../type/TypeProvider"
import { SourceContext } from "../sources/SourceProvider"
import { TakeawayContext } from "./TakeawayProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { TakeawaysCategoriesContext } from "../categories/TakeawaysCategoriesProvider"
import { Button } from "reactstrap"
import "./addTakeawayForm.css"





export const EditTakeAwayForm = ({ takeawayObject, toggler }) => {

    const { sources, addSource, currentSource, setCurrentSource, getSources } = useContext(SourceContext)
    const { categories, addCategory, currentCategory, setCurrentCategory, getCategories } = useContext(CategoryContext)
    const { takeaways, addTakeaway, updateTakeaway } = useContext(TakeawayContext)
    const { addTakeawaysCategory } = useContext(TakeawaysCategoriesContext)
    const { types } = useContext(TypeContext)
    const [sourceInput, setSourceInput] = useState(false)
    const [categoryInput, setCategoryInput] = useState(false)
    const [categorySelected, setCategorySelected] = useState(false)
    const [sourceDropdownSelection, setSourceDropdownSelection] = useState(0)
    const [currentTakeawayId, setCurrentTakeawayId] = useState(0)
    const [categoryDropdownSelection, setCategoryDropdownSelection] = useState(0)
    const [takeawaysCategories, setTakeawaysCategories] = useState([])
    const categoriesForThisTakeaway = takeawaysCategories.map((tak) => categories.find((cat) => cat.id === tak))
    
    const takeaway = useRef()
    const category = useRef()
    const source = useRef()
    
    const userId = parseInt(localStorage.getItem("takeaways_user"))
    const sourcesForThisUser = sources.filter(s => s.userId === userId)
    const categoriesForThisUser = categories.filter(c => c.userId === userId)
    
  const constructAndUpdateTakeaway = () => {
       const updatedTakeawayObject = {
        id: takeawayObject.id,
        userId: takeawayObject.userId,
        sourceId: takeawayObject.sourceId,
        takeaway: takeaway.current.value
 }  

 updateTakeaway(updatedTakeawayObject)
}

    // here is the actual form
    return (
        <form className="takeawayForm">

            <fieldset>

            <div className="form-group">
                <label htmlFor="takeaway">Takeaway: </label>
                <input
                    type="textarea"
                    id="takeawayInput"
                    ref={takeaway}
                    required
                    autoFocus
                    className="form-control"
                    defaultValue={takeawayObject.takeaway}></input>

            </div>
            </fieldset>

        <button type="submit"
            onClick={
                evt => {
                    evt.preventDefault()
                    constructAndUpdateTakeaway()
                    toggler()
                }
            }
            className="button">
            Save
            </button>
        </form >
    )
}