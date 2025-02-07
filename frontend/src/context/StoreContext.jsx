import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    let url = process.env.VITE_APP_BACKEND_URL;
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const [foodItem, setFoodItem] = useState({})
    const [BuyPage, setBuyPage] = useState(false)
    const [filterFood, setFilterFood] = useState(null);
    const [filterCat, setFilterCat] = useState(null)
    const [food, setFood] = useState([])
    const [user, setUser] = useState({})
    const [food_Item, setFood_Item] = useState({})


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        setCartItems((prev) => {
            // Filter out the item with matching listing._id
            const updatedCart = prev.filter(item => item.listing._id !== itemId);
            return updatedCart;
        });
        if (user) {
            await axios.post(url + "/api/cart/removeAll", { itemId: itemId, user: user })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if (!cartItems) {
            return 0
        }
        console.log(cartItems)
        Object.entries(cartItems).forEach(([id, item]) => {
            if (item.listing.units > 0) {
                totalAmount += item.listing.price * item.units;  // Add price * units to total
            }
        });

        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        let foods = response.data.data
        foods = await foods.sort((a, b) => b.units - a.units);
        setFoodList(foods)
    }

    const fetchCart = async () => {
        const newUrl = url + '/api/cart/get';
        const response = await axios.post(newUrl, {user:user});
        console.log(response.data)
        if (response.status === 200||response.success) {
            setCartItems(response.data.cart)
        }
        console.log(response.data.cart)
    }


    // useEffect(() => {

    // }, [])

    const loadFoods = async () => {
        const newUrl = url += '/api/farmer/foods/All'
        const response = await axios.get(newUrl);

        if (response.data.success) {
            setFood(response.data.foods)
        }
    }
    useEffect(() => {
        loadFoods();
    }, [url])



    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token, food_Item, setFood_Item,
        setToken,
        foodItem,
        setFoodItem,
        BuyPage, fetchFoodList,
        setBuyPage, user, setUser,
        // auth,setAuth,
        filterFood, setFilterFood,
        filterCat, setFilterCat, food
        , setFood, fetchCart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;