import { useEffect, useState } from "react"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationArray) => {
                setLocations(locationArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <>
        <h2>List of Locations</h2>
        <article className= "locations">
            {
                locations.map(
                    (location) => {
                        return <section id="location" className="location" key={location.id}>
                            <header>{location.name}</header>
                            <header>{location.address}</header>
                            <footer>Square Footage: {location.squareFootage}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}