import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)
//const dummyData=require(; )

const StoreContextProvider = (props) => {

    // const [cartItems, setCartItems] = useState({});
    const url = process.env.VITE_APP_BACKEND_URL
    // const [token,setToken] = useState("")
    // const [food_list,setFoodList] = useState([])
    // const [foodItem,setFoodItem]=useState({})
    // const [BuyPage,setBuyPage]=useState(false)
    // const [filterFood,setFilterFood]=useState(null);
    // const [filterCat,setFilterCat]=useState(null)
    const [isAuth, setAuth] = useState(false);
    const [farmer, setFarmer] = useState(null)
    const [food, setFood] = useState([])


    // const addToCart = async (itemId) => {
    //     if (!cartItems[itemId]) {
    //         setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    //     }
    //     else {
    //         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    //     }
    //     if (token){
    //         await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    //     }
    // }

    // const removeFromCart = async (itemId) => {
    //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    //     if (token) {
    //         await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    //     }
    // }

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const item in cartItems) 
    //     {
    //         if (cartItems[item] > 0) {
    //             let itemInfo = food_list.find((product) => product._id === item)
    //             totalAmount += itemInfo.price * cartItems[item];
    //         }
    //     }
    //     return totalAmount;
    // }

    // const fetchFoodList = async () => {
    //     const response = await axios.get(url+"/api/food/list");
    //     setFoodList(response.data.data)
    // }

    // const loadCartData = async (token) => {
    //     const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    //     setCartItems(response.data.cartData);
    // }


    // useEffect(()=>{
    //     async function loadData() {
    //         await fetchFoodList();
    //         if (localStorage.getItem("token")) {
    //             setToken(localStorage.getItem("token"));
    //             await loadCartData(localStorage.getItem("token"));
    //         }
    //     }
    //     loadData();
    // },[])
    // const loadFoods = async () => {
    //     let newUrl = url += '/api/farmer/foods/All'
    //     let response = await axios.get(newUrl);

    //     if (response.data.success) {
    //         // console.log(response.data)
    //         // setFarmer(response.data.farmer)
    //         setFood(response.data.foods)
    //         // setToken(response.data.token);
    //         // localStorage.setItem("token", response.data.token)
    //         // setShowLogin(false)
    //     }
    // }
    // useEffect(() => {
    //     loadFoods();
    //     // farmerRoute.get('/foods/All',findAllFood);
    // }, [url])

    const contextValue = {
        isAuth, setAuth,
        farmer, setFarmer,
        food, setFood, url
        // food_list,
        // cartItems,
        // setCartItems,
        // addToCart,
        // removeFromCart,
        // getTotalCartAmount,
        // url,
        // token,
        // setToken,
        // foodItem,
        // setFoodItem,
        // BuyPage,
        // setBuyPage,
        // filterFood,setFilterFood,
        // filterCat,setFilterCat
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;