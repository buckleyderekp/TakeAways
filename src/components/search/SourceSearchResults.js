import React, { useState, useContext, useEffect } from "react"
import { SourceContext } from "../sources/SourceProvider"



export const SearchResults = ({ searchTerms }) => {

    const { sources } = useContext(SourceContext)
    const [ filteredSources, setFilteredSources ] = useState([])

    useEffect(() => {
        if (searchTerms !== "") {
            const sourceSubset = sources.filter(sor => sor.source.toLowerCase().includes(searchTerms))
            setFilteredSources(sourceSubset)
        } else {
            setFilteredSources([])
        }
    }, [searchTerms, sources])

    return (
        <div className="searchResults">
            <h3>Results</h3>
            <div className="sources">
                {
                    filteredSources.map(sor => <div key={ sor.id }>{ sor.category }</div>)
                }
            </div>
        </div>
    )
}