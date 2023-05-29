import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationsList.js"
import { ProductsList } from "../products/ProductsList.js"
import { ProductForm } from "../products/ProductForm.js"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div className="tag">Your one-stop-shop to get your fix! Happy Pride Y'all!!</div>

                    <Outlet />
                </>
            }>
                <Route path="locations" element={ <LocationList /> } />
				<Route path="products/create" element={ <ProductForm /> } />
				<Route path="products" element={ <ProductsList /> } />
            </Route>
        </Routes>
    )
}