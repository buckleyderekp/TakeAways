import React, { useState, useContext, useEffect } from "react"
import { SourceContext } from "../sources/SourceProvider"



export const SourceSearchResults = ( { sourceSearchTerms } ) => {

    const { sources } = useContext(SourceContext)
    const [ filteredSources, setFilteredSources ] = useState([])

    useEffect(() => {
        if (sourceSearchTerms !== "") {
            const sourceSubset = sources.filter(sor => sor.source.toLowerCase().includes(sourceSearchTerms))
            setFilteredSources(sourceSubset)
        } else {
            setFilteredSources([])
        }
    }, [sourceSearchTerms, sources])

    return (
        <div className="searchResults">
            <h3>Results</h3>
            <div className="sources">
                {
                    filteredSources.map(sor => <div key={ sor.id }>{ sor.source }</div>)
                }
            </div>
        </div>
    )
}