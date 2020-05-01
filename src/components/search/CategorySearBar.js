import React, { useRef } from "react"

export const categorySearchBar = ({ setTerms }) => (
    <fieldset>
        <div className="form-group">
            <label htmlFor="searchTerms">Search for a Category:</label>
            <input onKeyUp={ e => setTerms(e.target.value) }
                type="text"
                id="categorySearchTerms"
                autoFocus
                className="form-control"
            />
        </div>
    </fieldset>
)