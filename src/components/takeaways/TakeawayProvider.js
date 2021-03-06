// the purpose of this component is to interact with the takeaway section of the database. 

import React, { useState, useEffect } from "react"


export const TakeawayContext = React.createContext()


export const TakeawayProvider = (props) => {

    const [takeaways, setTakeaways] = useState([])
    const [filterBarTakeaways, setFilterBarTakeaways] = useState([])
    const [filteredTakeawaysFollowing, setFilteredTakeawaysFollowing] = useState([])



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
            .then((res) => {
                const createdTakeaway = res.json()
                return createdTakeaway
            })
            .then((res) => {
                getTakeaways()
                const finalObject = res
                return finalObject
            })
    }

    const deleteTakeaway = takeawayId => {
        return fetch(`http://localhost:8088/takeaways/${takeawayId}`, {
            method: "DELETE"
        })
            .then(getTakeaways)
    }

    const updateTakeaway = takeaway => {
        return fetch(`http://localhost:8088/takeaways/${takeaway.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(takeaway)
        })
            .then(getTakeaways)
    }


    useEffect(() => {
        getTakeaways()
    }, [])

    return (
        <TakeawayContext.Provider value={
            {
                takeaways,
                addTakeaway,
                deleteTakeaway,
                updateTakeaway,
                setFilterBarTakeaways,
                filterBarTakeaways,
                filteredTakeawaysFollowing,
                setFilteredTakeawaysFollowing
            }
        }>
            {props.children}
        </TakeawayContext.Provider>
    )
}
