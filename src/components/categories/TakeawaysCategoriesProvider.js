import React, { useState, useEffect } from "react"

export const TakeawaysCategoriesContext = React.createContext()


export const TakeawaysCategoryProvider = (props) => {

    const [takeawaysCategories, setTakeawaysCategories] = useState([])
    

    const getTakeawaysCategories = () => {
        return fetch("http://localhost:8088/takeawaysCategories")
            .then(res => res.json())
            .then(setTakeawaysCategories)
    }

    const addTakeawaysCategory = TakeawaysCategory => {
        return fetch("http://localhost:8088/takeawaysCategories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(TakeawaysCategory)
        })
        .then(res => res.json())
        .then((res) => {
            const createdTakeawaysCategory = res
            getTakeawaysCategories()
            return createdTakeawaysCategory
        })
    }

    const deleteTakeawaysCategory = takeawaysCategoryId => {
        return fetch(`http://localhost:8088/takeawaysCategories/${takeawaysCategoryId}`, {
            method: "DELETE"
        })
            .then(getTakeawaysCategories)
    }

    const updateTakeawaysCategory = takeawaysCategory => {
        return fetch(`http://localhost:8088/takeawaysCategories/${takeawaysCategory.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(takeawaysCategory)
        })
            .then(getTakeawaysCategories)
    }


    useEffect(() => {
        getTakeawaysCategories()
    }, [])

    return (
        <TakeawaysCategoriesContext.Provider value={
            {
                takeawaysCategories,
                addTakeawaysCategory,
                deleteTakeawaysCategory,
                updateTakeawaysCategory
            }
        }>
            {props.children}
        </TakeawaysCategoriesContext.Provider>
    )
}
