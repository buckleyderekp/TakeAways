import React, { useState, useEffect } from "react"

export const CategoryContext = React.createContext()


export const CategoryProvider = (props) => {

    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8088/categories")
            .then(res => res.json())
            .then(setCategories)
            .then(console.log(categories))
    }

    const addCategory = category => {
        return fetch("http://localhost:8088/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
            .then(getCategories)
    }

    const deleteCategory = categoryId => {
        return fetch(`http://localhost:8088/categories/${categoryId}`, {
            method: "DELETE"
        })
            .then(getCategories)
    }

    const updateCategory = category => {
        return fetch(`http://localhost:8088/categories/${category.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
            .then(getCategories)
    }


    useEffect(() => {
        getCategories()
    }, [])

    return (
        <CategoryContext.Provider value={
            {
                categories,
                addCategory,
                deleteCategory,
                updateCategory
            }
        }>
            {props.children}
        </CategoryContext.Provider>
    )
}
