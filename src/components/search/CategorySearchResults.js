import React, { useState, useContext, useEffect } from "react"

import { CategoryContext } from "../categories/CategoryProvider"

export const CategorySearchResults = ({ categorySearchTerms }) => {

    const { categories } = useContext(CategoryContext)
    const [ filteredCategories, setFilteredCategories ] = useState([])

    useEffect(() => {
        if (categorySearchTerms !== "") {
            const categorySubset = categories.filter(cat => cat.category.toLowerCase().includes(categorySearchTerms))
            setFilteredCategories(categorySubset)
        } else {
            setFilteredCategories([])
        }
    }, [categorySearchTerms, categories])

    return (
        <div className="searchResults">
            <h3>Results</h3>
            <div className="categories">
                {
                    filteredCategories.map(cat => <div key={ cat.id }>{ cat.category }</div>)
                }
            </div>
        </div>
    )
}