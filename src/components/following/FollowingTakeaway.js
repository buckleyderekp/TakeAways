import React from "react"
import "./Takeaway.css"




export const Takeaway = ({ takeaway, source, type, categories }) => {



    return (
        <section className="takeaway">
            <div className="takeaway__source takeawayText">{source.source}</div>
            <div className="takeaway__sourceType takeawayText">Source Type: {type.type}</div>
            <div className="takeaway__categories takeawayText">Category: {categories.map((cat) => {
                
                return `${cat.category}` || ""
            }).join(", ") 
            }

            </div>
            <div className="takeaway__text takeawayText">Takeaway:  {takeaway.takeaway}</div>
            <div className="takeawayButtonContainer takeawayText">
            </div>

        </section>
    )
}