import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TakeawayContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const TakeawayProvider = (props) => {
    // animals = data
    // setAnimals = function that React created, so we can use it to set state of animals
    const [takeaways, setTakeaways] = useState([])

    const getTakeaways = () => {
        return fetch("http://localhost:8088/takeaways")
            .then(res => res.json())
            .then(setTakeaways)
    }

    const addTakeaway = takeaway => {
        return fetch("http://localhost:8088/takeaways", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(takeaway)
        })
            .then(getTakeaways)
    }

    const deleteTakeaway = takeawayId => {
        return fetch(`http://localhost:8088/takeaways/${takeawayId}`, {
            method: "DELETE"
        })
            .then(getTakeaways)
    }

    const updateTakeaway = takeaway => {
        return fetch(`http://localhost:8088/animals/${takeaway.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(takeaway)
        })
            .then(getTakeaways)
    }

    /*
        Load all animals when the component is initialized. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getTakeaways()
    }, [])

    return (
        <TakeawayContext.Provider value={
            {
                takeaways,
                addTakeaway,
                deleteTakeaway,
                updateTakeaway
            }
        }>
            {props.children}
        </TakeawayContext.Provider>
    )
}
