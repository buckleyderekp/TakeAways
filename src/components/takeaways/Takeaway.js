import React from "react"

export const Takeaway = ({takeaway}) => {
   console.log(takeaway)
    return(
        <section className="takeaway">
            <div className="takeaway__text">Takeaway: {takeaway.takeaway}</div>
            <div className="takeaway__owner">userId {takeaway.userId}</div>
        </section>
    )
}