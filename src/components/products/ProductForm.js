import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [product, update] = useState({
        id: 0,
        name: "",
        productTypeId: 0,
        pricePerUnit: 0,
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
   const navigate = useNavigate()

    const [productTypes, setProductTypes] = useState([])
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
/*{

            "userId": 3,
            "description": "Vero est adipisci sed natus quasi consectetur occaecati. Modi maxime sunt officia cumque. Vel at culpa. Sint accusamus deserunt dolorem qui.",
            "emergency": true,
            "dateCompleted": ""
} */

    const productToSendToAPI = {
        id: product.id,
        name: product.name,
        productTypeId: product.productTypeId,
        pricePerUnit: product.pricePerUnit,
    }

        // TODO: Perform the fetch() to POST the object to the API
    return fetch(`http://localhost:8088/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productToSendToAPI)
    })
        .then(response => response.json())
        .then(() =>{
            navigate("/products")
        })

    }

    useEffect(
        () => 
        {
            fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then((productTypeArray) => {
                setProductTypes(productTypeArray)
            })
        },
        []
    )

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Product Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Product name"
                        value={product.name}
                        onChange={
                            (evt) =>{
                                const copy = {...product}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Price:</label>
                    <input
                        required autoFocus
                        type="number"
                        min="1"
                        className="form-control"
                        placeholder="Product price"
                        value={product.pricePerUnit}
                        onChange={
                            (evt) =>{
                                const copy = {...product}
                                copy.pricePerUnit = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
  <div className="form-group">
    <label htmlFor="productType">Product Type</label>
    <select
      required autoFocus
        className="form-control"
        placeholder="Product Type"
      value={product.productTypeId}
      onChange={(evt) => {
        const copy = { ...product};
        copy.productTypeId = evt.target.value
        update(copy);
      }}
    >
<option value="" defaultValue>Select Candy Type</option>
            {productTypes.map(item => (
                <option value={item.id} key={item.id}>{item.type}</option>
            ))}
    </select>
  </div>
</fieldset>

            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}


