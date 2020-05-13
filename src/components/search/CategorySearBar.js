import React, { useRef, useState, useContext } from "react"
import { CategoryContext } from "../categories/CategoryProvider"

export const CategorySearchBar = () => {
    const {setCategorySearchTerms} = useContext(CategoryContext)

    return(
    <fieldset>
        <div className="form-group">
            <label className="filterHeader"  htmlFor="searchTerms">Filter by Category:</label>
            <input onKeyUp={ e => setCategorySearchTerms(e.target.value) }
                type="text"
                id="categorySearchTerms"
                autoFocus
                className="form-control"
            />
        </div>
    </fieldset>
    )
    }