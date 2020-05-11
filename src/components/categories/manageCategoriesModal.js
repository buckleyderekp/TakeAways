import React, { useContext, useState, useEffect, useRef } from "react"
import { CategoryContext } from "../categories/CategoryProvider"

export const EditCategoriesForm = (props) => {

    const userId = parseInt(localStorage.getItem("takeaways_user"))
const [editCategory, setEditCategory] = useState(false)
const [categoryToBeEdited, setCategoryToBeEdited] = useState({})
const { categories, deleteCategory, updateCategory } = useContext(CategoryContext)
const categoryInput = useRef()
const categoriesForThisUser = categories.filter(c => c.userId === userId)

const constructAndUpdateCategory =()=>{
    const updatedCategory = {
        category: categoryInput.current.value,
        id: categoryToBeEdited.id
    }
    console.log(updatedCategory)
    updateCategory(updatedCategory)
}

if (!editCategory){
    return (
            categoriesForThisUser.map(cat=> <div className="categoriesModal__categoriesList">{cat.category}                
            <button type="submit"
            onClick={
                evt => {
                    evt.preventDefault()
                    setEditCategory(true)
                    setCategoryToBeEdited(cat)
                  
                }
            }
            className="button">
            Edit
    </button>
            <button type="submit"
            onClick={
                evt => {
                    evt.preventDefault()
                    deleteCategory(cat.id)
                }
            }
            className="button">
            Delete
    </button></div>)
    )
}
        else {
            return (
                <>
                <form className="editCategoryForm">
                <fieldset>
                <div className="form-group">
                <label htmlFor="category">Category: </label>
                <input
                    type="textarea"
                    id="categoryInput"
                    ref={categoryInput}
                    required
                    autoFocus
                    className="form-control"
                    defaultValue={categoryToBeEdited.category}></input>

            </div>
        </fieldset>

        <button type="submit"
            onClick={
                evt => {
                    evt.preventDefault()
                    constructAndUpdateCategory()
                    setEditCategory(false)
                    
        
                }
            }
            className="button">
            Save
    </button>
    </form>
    </>
            )
        }





}