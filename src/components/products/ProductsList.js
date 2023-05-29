import { useEffect, useState } from "react"
import "./Products.css"
import { useNavigate } from "react-router-dom"


export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [expensive, setExpensive] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:8088/products`)
        .then(response => response.json())
        .then((productArray) => {
            setProducts(productArray)
        })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/users`)
        .then(response => response.json())
        .then((userArray) => {
            setUsers(userArray)
        })
    }, [])

    useEffect(() => {
        if (kandyUserObject.staff){
            //For employees
            setFilteredUsers(users)
        } else {
            //For customers
            setFilteredUsers(users)
        }
    }, [kandyUserObject, users])

    useEffect(() => {
        setExpensive(products)
    }, [products])

    const handleShowExpensive = () => {
        const expensiveProducts = products.filter(product => product.pricePerUnit > 2)
        setExpensive(expensiveProducts)
    }

    const handleShowAll = () => {
        setExpensive(products)
    }

    return <>
        {
        kandyUserObject.staff
            ? <>
            <button onClick={handleShowExpensive}>Top Price</button>
            <button onClick={handleShowAll}>Show All</button>
            <button onClick={() => navigate("/products/create")}>Add Product</button>
            </>
            : 
            <>
            <button onClick={handleShowExpensive}>Top Price</button>
            <button onClick={handleShowAll}>Show All</button>
            </>
        }
        <h2>List of Products</h2>
        <h2>💲indicates price is over $2.00</h2>
        <article className= "products">
            {
                expensive.map(
                    (product) => {
                        return <section id="product" className="product" key={product.id}>
                            <header>{product.name}</header>
                            <header>${product.pricePerUnit}</header>
                            <footer> {product.pricePerUnit > 2 ? "💲": ""} </footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}

/*return <> 
    {
        kandyUserObject.staff
        ? <>
            <button onClick={ () => {setExpensive(true)}}>Top Price</button>
            <button onClick={ () => {setExpensive(false)}}>Show All</button>
            <button onClick={ () => navigate("/product/create")} >Create new candy</button>
        </>
        : <>
            <button onClick={ () => {setExpensive(true)}}>Top Price</button>
            <button onClick={ () => {setExpensive(false)}}>Show All</button>
        </>
    }*/