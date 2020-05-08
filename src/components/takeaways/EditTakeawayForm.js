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
    const { takeawaysCategories, addTakeawaysCategory } = useContext(TakeawaysCategoriesContext)
    const { types } = useContext(TypeContext)
    const [sourceInput, setSourceInput] = useState(false)
    const [categoryInput, setCategoryInput] = useState(false)
    const [categorySelected, setCategorySelected] = useState(false)
    const [displayExistingTakeawayCategories, setDisplayExistingTakeawayCategories] = useState(false)
    const [sourceDropdownSelection, setSourceDropdownSelection] = useState(0)
    const [currentTakeawayId, setCurrentTakeawayId] = useState(0)
    const [categoryDropdownSelection, setCategoryDropdownSelection] = useState(0)
    const [editTakeawaysCategories, setEditTakeawaysCategories] = useState([])
    const existingTakeawayCategories = takeawaysCategories.filter(tac => takeawayObject.id === tac.takeawayId) || []
    const existingCategories = categories.filter(cat => existingTakeawayCategories.some(etc => cat.id === etc.categoryId) ? true : false)

    const categoriesForThisTakeaway = editTakeawaysCategories.map((tak) => categories.find((cat) => cat.id === tak)) || []
    
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
        sourceId: parseInt(source.current.value),
        takeaway: takeaway.current.value
 }  

 updateTakeaway(updatedTakeawayObject)
}

const renderExistingTakeawayCategories = () =>{

  if(displayExistingTakeawayCategories === true){
      console.log(existingCategories)
      existingCategories.map(etc =>{
          return `${etc.category}`

      } ) 

  }
}

const putNewCategoriesRelationship = () => {
    editTakeawaysCategories.map((takcat) => {
        const   newTakeCatObj = {
                      takeawayId: takeawayObject.id, 
                      categoryId: takcat
                  }
              addTakeawaysCategory(newTakeCatObj)
              }) 
}


const putCategoryintoCategoryArray = () => {
    // copy the state variable with slice
    const copy = editTakeawaysCategories.slice()
    //  push new value in to the copy

    copy.push(parseInt(category.current.value))
    // call setter function and pass in array as an argument
    setEditTakeawaysCategories(copy)
    console.log(editTakeawaysCategories)

}

    // here is the actual form
    return (
        <form className="takeawayForm">
                    <label className="formInputLabel" htmlFor="source">Change Source  </label>
                    <select
                        name="source"
                        ref={source}
                        id="takeawaySource"
                        className="form-control"
                        defaultValue={takeawayObject.sourceId}
                    >
                        <option value="0">- Select a source -</option>
                        {sourcesForThisUser.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.source}
                            </option>
                        ))}
                    </select>
            <fieldset>
            <label className="formInputLabel" htmlFor="category">Add a New Category</label>   
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
                            }
                        }
                        className="button">
                        Add Category to Takeaway
            </button>
            {renderExistingTakeawayCategories()}
                    <button
                        onClick={
                            evt => {
                                evt.preventDefault()
                                setDisplayExistingTakeawayCategories(true)
                            }
                        }
                        className="button">
                        Remove Existing Categories
            </button>
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
                    putNewCategoriesRelationship()
                    toggler()
                }
            }
            className="button">
            Save
            </button>
        </form >
    )
}