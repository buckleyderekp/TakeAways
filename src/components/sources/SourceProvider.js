import React, { useState, useEffect } from "react"


export const SourceContext = React.createContext()



export const SourceProvider = (props) => {

    const [sources, setSources] = useState([])
    const [currentSource, setCurrentSource] = useState({})

    const getSources = () => {
        return fetch("http://localhost:8088/sources")
            .then(res => res.json())
            .then(setSources)
    }

    const addSource = source => {
        return fetch("http://localhost:8088/sources", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(source)
        })
        .then(res => res.json())
        .then((res) => {
            const createdSource = res
            getSources()
            return createdSource
        })
    }

    const deleteSource = sourceId => {
        return fetch(`http://localhost:8088/sources/${sourceId}`, {
            method: "DELETE"
        })
            .then(getSources)
    }

    const updateSource = source => {
        return fetch(`http://localhost:8088/source/${source.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(source)
        })
            .then(getSources)
    }


    useEffect(() => {
        getSources()
    }, [])

    return (
        <SourceContext.Provider value={
            {
                sources,
                addSource,
                deleteSource,
                updateSource,
                currentSource,
                setCurrentSource
            }
        }>
            {props.children}
        </SourceContext.Provider>
    )
}
