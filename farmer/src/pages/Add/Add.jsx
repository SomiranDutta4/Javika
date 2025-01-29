import React, { useContext, useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
// import { toast } from 'react-toastify'
import dummyData from '../../dummyData/dummy'
import { StoreContext } from '../../context/StoreContext'
// import dummyCategory from '../../dummyData/dummyCategories'

const Add = () => {
    const { food, farmer, url, setFood } = useContext(StoreContext)
    // const {}
    const [selectedCat, setSelectedCat] = useState(null)
    const [list, setList] = useState([])
    const [productNames, setProductNames] = useState([])

    useEffect(() => {
        //fetch for full list,
        // setList(food)
        const uniqueCategories = [...new Set(food.map(item => item.category))];
        setList(uniqueCategories);

    }, [food])

    useEffect(() => {
        if (!selectedCat || selectedCat == null) {
            setProductNames(food)
        } else {
            const filteredData = food.filter(item => item.category === selectedCat);
            setProductNames(filteredData)
        }
    }, [selectedCat])
    const findFood = async () => {
        let newUrl = url + "/api/farmer/foods/All"
        const response = await axios.get(newUrl)
        setFood(response.data);
    }
    useEffect(() => {
        findFood()
        // const response = await await axios.post(`${url}/api/food/add`, formData)
        //fetch all documents
    }, [])

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        // description: "",
        price: "",
        category: "",
        units: "",
        farmer: farmer
    })
    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "category") {
            setSelectedCat(value);
            setData((prevData) => ({
                ...prevData,
                name: "", // Reset product name when category changes
                category: value,
            }));
        }

        console.log("Updated Data:", data);
    };

    // const onChangeHandler = (event) => {
    //     const { name, value } = event.target;
    //     if (name === "category") {
    //         setSelectedCat(value); // Reset product name if category changes
    //         setData((prevData) => ({
    //             ...prevData,
    //             name: "",
    //             category: value,
    //         }));
    //     } else {
    //         setData((prevData) => ({
    //             ...prevData,
    //             [name]: value,
    //         }));
    //     }
    //     console.log(data)
    // };
    const onProductChangeHandler = (event) => {
        // const selectedProductName = event.target.value;
        // setData((prevData) => ({
        //     ...prevData,
        //     name: selectedProductName,
        // }));

        // if (selectedProductName) {
        //     const selectedProduct = dummyData.find((item) => item.productName === selectedProductName);
        //     if (selectedProduct) {
        //         setSelectedCat(selectedProduct.category); // Automatically update category
        //         setData((prevData) => ({
        //             ...prevData,
        //             category: selectedProduct.category,
        //         }));
        //     }
        // }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        // formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("farmer", JSON.stringify(farmer))
        formData.append("category", data.category)
        formData.append("units", data.units)
        // formData.append("image", image)

        const response = await axios.post(`${url}/api/food/add`, data)
        if (response.data.success) {
            setData({
                name: null,
                // description: "",
                price: "",
                category: null,
                units: "",
                farmer: farmer
            })
            setSelectedCat(null);  // Reset category selection
            setImage(false)
            // toast.success(response.data.message)
        }
        else {
            // toast.error(response.data.message)
        }
    }


    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                {/* <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img className='image' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div> */}

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <select className='selectt' onChange={onChangeHandler} name="name">
                        {productNames &&
                            <>
                                <option value={null} >Select a product</option> {/* Default blank option */}

                                {productNames.map((ele, ind) => {
                                    return (
                                        <option key={ele._id + ind} value={ele.name}>
                                            {ele.name}
                                        </option>
                                    )
                                })}
                            </>
                        }
                    </select>
                </div>
                {/* <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div> */}
                {/* <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div> */}
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select className='selectt' onChange={onChangeHandler} name="category">
                            {list &&
                                <>
                                    <option value="null" >Select a product</option> {/* Default blank option */}

                                    {list.map((ele, ind) => {
                                        return (
                                            <option key={ele + ind} value={ele}>
                                                {ele}
                                            </option>
                                        )
                                    })}
                                </>
                            }
                        </select>

                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input className='inputclasa' onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>
                    <div className="add-price flex-col">
                        <p> Units available</p>
                        <input className='inputclasa' onChange={onChangeHandler} value={data.units} type="Number" name='units' placeholder='1' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add