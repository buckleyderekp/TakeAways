import React, { useContext } from "react"
import { SourceContext } from "../sources/SourceProvider"

export const SourceSearchBar = () => {

    const { setSourceSearchTerms } = useContext(SourceContext)

    return (
        <fieldset>
            <div className="form-group">
                <label className="filterHeader" htmlFor="searchTerms">Filter by Source:</label>
                <input onKeyUp={e => setSourceSearchTerms(e.target.value)}
                    type="text"
                    id="sourceSearchTerms"
                    autoFocus
                    className="form-control"
                />
            </div>
        </fieldset>
    )
}