import React, { useRef } from "react"

export const CategorySearchBar = ({ setCategorySearchTerms }) => (
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