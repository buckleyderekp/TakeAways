import React, { useState, useContext, useEffect } from "react"

import { CategoryContext } from "../categories/CategoryProvider"

export const SearchResults = ({ searchTerms }) => {

    const { categories } = useContext(CategoryContext)
    const [ filteredCategories, setFilteredCategories ] = useState([])

    useEffect(() => {
        if (searchTerms !== "") {
            const categorySubset = categories.filter(cat => cat.category.toLowerCase().includes(searchTerms))
            setFilteredCategories(categorySubset)
        } else {
            setFilteredCategories([])
        }
    }, [searchTerms, categories])

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