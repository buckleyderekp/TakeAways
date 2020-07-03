//The purpose of this component is to display a modal that allows the user to edit categories independently of the takeaways object

import React, { useContext, useState, useRef } from "react"
import { CategoryContext } from "../categories/CategoryProvider"

export const EditCategoriesForm = (props) => {

    const userId = parseInt(localStorage.getItem("takeaways_user"))
    const [editCategory, setEditCategory] = useState(false)
    const [categoryToBeEdited, setCategoryToBeEdited] = useState({})
    const { categories, deleteCategory, updateCategory } = useContext(CategoryContext)
    const categoryInput = useRef()
    const categoriesForThisUser = categories.filter(c => c.userId === userId)

    //This function constructs a new category object by gathering information from input fields and updates them in the database
    const constructAndUpdateCategory = () => {
        const updatedCategory = {
            category: categoryInput.current.value,
            id: categoryToBeEdited.id,
            userId: userId
        }
        console.log(updatedCategory)
        updateCategory(updatedCategory)
    }

    // if editCategory is false  display a list of all of the categories that user has inputed with edit and delete buttons for each
    if (!editCategory) {
        return (
            categoriesForThisUser.map(cat => <div className="categoriesModal__categoriesList">{cat.category}
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
    // when editCategory is changed to true the current category defined by the state hook categoryToBeEdited will display in the input field and allow the user to edit it
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