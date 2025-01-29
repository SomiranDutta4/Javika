import React, { useContext, useEffect, useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';

const Add = () => {
    const { food, farmer, url, setFood } = useContext(StoreContext);
    const [selectedCat, setSelectedCat] = useState(null);
    const [list, setList] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const [data, setData] = useState({
        name: "",
        price: "",
        category: "",
        units: "",
        farmer: farmer,
    });

    useEffect(() => {
        // Fetch food items from the API or context
        const uniqueCategories = [...new Set(food.map(item => item.category))];
        setList(uniqueCategories);
    }, [food]);

    useEffect(() => {
        if (!selectedCat) {
            setProductNames(food);
        } else {
            const filteredData = food.filter(item => item.category === selectedCat);
            setProductNames(filteredData);
        }
    }, [selectedCat, food]);

    const findFood = async () => {
        const newUrl = `${url}/api/farmer/foods/All`;
        const response = await axios.get(newUrl);
        setFood(response.data);
    };

    useEffect(() => {
        findFood();
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "category") {
            setSelectedCat(value); // Set the selected category
            setData((prevData) => ({
                ...prevData,
                name: "", // Reset product name when category changes
                category: value,
            }));
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", Number(data.price));
        formData.append("farmer", JSON.stringify(farmer));
        formData.append("category", data.category);
        formData.append("units", data.units);

        const response = await axios.post(`${url}/api/food/add`, data);
        if (response.data.success) {
            setData({
                name: "",
                price: "",
                category: "",
                units: "",
                farmer: farmer,
            });
            setSelectedCat(null); // Reset category selection
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <select className='selectt' onChange={onChangeHandler} name="name" value={data.name}>
                        <option value="">Select a product</option> {/* Default blank option */}
                        {productNames.map((ele) => (
                            <option key={ele._id} value={ele.name}>
                                {ele.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select className='selectt' onChange={onChangeHandler} name="category" value={data.category}>
                            <option value="">Select a category</option> {/* Default blank option */}
                            {list.map((ele, ind) => (
                                <option key={ele + ind} value={ele}>
                                    {ele}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input className='inputclasa' onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20' />
                    </div>

                    <div className="add-price flex-col">
                        <p>Units available</p>
                        <input className='inputclasa' onChange={onChangeHandler} value={data.units} type="number" name="units" placeholder='1' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
