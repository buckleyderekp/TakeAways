import React, { useRef } from "react"

export const SourceSearchBar = ( { setSourceSearchTerms, sourceSearchTerms } ) => (
    <fieldset>
        <div className="form-group">
            <label className="filterHeader" htmlFor="searchTerms">Filter by Source:</label>
            <input onKeyUp={ e => 
            {setSourceSearchTerms(e.target.value) 
                console.log(sourceSearchTerms)}} 
                type="text"
                id="sourceSearchTerms"
                autoFocus
                className="form-control"
            />
        </div>
    </fieldset>
)