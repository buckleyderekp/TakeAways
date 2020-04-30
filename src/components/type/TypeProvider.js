import React, { useState, useEffect } from "react"


export const TypeContext = React.createContext()


export const TypeProvider = (props) => {

    const [types, setTypes] = useState([])

    const getTypes = () => {
        return fetch("http://localhost:8088/types")
            .then(res => res.json())
            .then(setTypes)
    }

    const addType = type => {
        return fetch("http://localhost:8088/types", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(types)
        })
            .then(getTypes)
    }

    const deleteType = typeId => {
        return fetch(`http://localhost:8088/types/${typeId}`, {
            method: "DELETE"
        })
            .then(getTypes)
    }

    const updateType = type => {
        return fetch(`http://localhost:8088/type/${type.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(type)
        })
            .then(getTypes)
    }


    useEffect(() => {
        getTypes()
    }, [])

    return (
        <TypeContext.Provider value={
            {
                types,
                addType,
                deleteType,
                updateType
            }
        }>
            {props.children}
        </TypeContext.Provider>
    )
}
