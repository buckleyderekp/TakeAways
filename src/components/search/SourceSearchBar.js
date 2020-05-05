import React, { useRef } from "react"

export const SourceSearchBar = ( { setSourceSearchTerms } ) => (
    <fieldset>
        <div className="form-group">
            <label htmlFor="searchTerms">Search for a Source:</label>
            <input onKeyUp={ e => setSourceSearchTerms(e.target.value) }
                type="text"
                id="sourceSearchTerms"
                autoFocus
                className="form-control"
            />
        </div>
    </fieldset>
)