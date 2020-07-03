// the purpose of this component is to display a modal that allows a user to manage sources separately from a takeaway object

import React, { useContext, useState, useRef } from "react"
import { SourceContext } from "../sources/SourceProvider"
import { TypeContext } from "../type/TypeProvider"

export const EditSourcesForm = (props) => {

    const userId = parseInt(localStorage.getItem("takeaways_user"))
    const [editSource, setEditSource] = useState(false)
    const [sourceToBeEdited, setSourceToBeEdited] = useState({})
    const { sources, deleteSource, updateSource } = useContext(SourceContext)
    const { types } = useContext(TypeContext)
    const sourceInput = useRef()
    const typeInput = useRef()
    const sourcesForThisUser = sources.filter(s => s.userId === userId)

    const constructAndUpdateSource = () => {
        const updatedSource = {
            source: sourceInput.current.value,
            id: sourceToBeEdited.id,
            typeId: parseInt(typeInput.current.value),
            userId: userId
        }
        console.log(sourceToBeEdited)
        updateSource(updatedSource)
    }

    if (!editSource) {
        return (
            sourcesForThisUser.map(sor => <div className="sourcesModal__sourcesList">{sor.source}
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            setEditSource(true)
                            setSourceToBeEdited(sor)

                        }
                    }
                    className="button">
                    Edit
    </button>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            deleteSource(sor.id)
                        }
                    }
                    className="button">
                    Delete
    </button></div>)
        )
    }
    else {
        return (
            <>
                <form className="editCategoryForm">
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="category">Category: </label>
                            <input
                                type="textarea"
                                id="categoryInput"
                                ref={sourceInput}
                                required
                                autoFocus
                                className="form-control"
                                defaultValue={sourceToBeEdited.source}></input>

                        </div>
                    </fieldset>
                    <label htmlFor="category">Choose a Type  </label>
                    <select
                        type="select"
                        defaultValue=""
                        name="type"
                        ref={typeInput}
                        id="sourceType"
                        className="form-control"
                        defaultValue={sourceToBeEdited.typeId}
                    >
                        <option value="0">- Select Type -</option>
                        {types.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.type}
                            </option>

                        ))}
                    </select>

                    <button type="submit"
                        onClick={
                            evt => {
                                evt.preventDefault()
                                constructAndUpdateSource()
                                setEditSource(false)


                            }
                        }
                        className="button">
                        Save
    </button>
                </form>
            </>
        )
    }





}