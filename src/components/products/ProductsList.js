import { useEffect, useState } from "react"
import "./Products.css"

export const ProductsList = () => {
    const [products, setProducts] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
            .then(response => response.json())
            .then((productArray) => {
                setProducts(productArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )
    
    return <>
        <h2>List of Products</h2>
        <article className= "products">
            {
                products.map(
                    (product) => {
                        return <section id="product" className="product" key={product.id}>
                            <header>{product.name}</header>
                            <header>${product.pricePerUnit.toFixed(2)}</header>
                            <footer></footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}

useEffect(() => {
    const sortedProducts = products.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    setFilteredProducts(sortedProducts);
}, [products]);