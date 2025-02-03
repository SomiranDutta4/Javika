import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"
import { StoreContext } from '../../context/StoreContext'

const List = ({ url }) => {
  const { farmer, food, setFood } = useContext(StoreContext)

  const [list, setList] = useState([]);

  const fetchList = async () => {
    // const newUrl = `${url}/api/farmer/foods/All`;
    const newUrl = `${url}/api/farmer/products/All`;
    const response = await axios.put(newUrl, farmer);
    setList(await response.data);
    // console.log(response.data)
  }

  // const removeFood = async(foodId) => {
  //   const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
  //   await fetchList();
  //   if (response.data.success){
  //     toast.success(response.data.message)
  //   }
  //   else{
  //     toast.error("Error")
  //   }
  // }

  const removeFood = async (foodId) => {
    if (!farmer) {
      toast.error('Farmer not found');
      return;
    }

    const response = await axios.post(`${url}/api/food/remove`, { id: foodId._id, farmer });

    await fetchList();
    // setList((prevList) => prevList.filter(item => item.foodId._id !== foodId));

    if (response.data.success || response.status == 200) {
      await fetchList();
      // setTimeout(() => {
      // }, 500);
      toast.success(response.data.message);
      // window.location.reload(); 
    } else {
      toast.error('Error');
    }
  };
  const findMyLists = () => {
    // const filteredList = food.filter(item =>
    //   item.prices.some(price => price.soldBy.toString() === farmer._id)
    // );
    // setList(filteredList);
  }


  useEffect(() => {
    fetchList();
  }, [])

  useEffect(() => {
    findMyLists()
  }, [food])
  // useEffect(() => {
  //   console.log(list)
  // }, [list])

  // return (
  //   <div className='list add flex-col'>
  //     <p>All Foods List</p>
  //     <div className="list-table">
  //       <div className="list-table-format title">
  //         <b>Image</b>
  //         <b>Name</b>
  //         <b>Category</b>
  //         <b>Price</b>
  //         <b>Action</b>
  //       </div>
  //       {list.map((item, index) => {
  //         return (
  //           <div key={index} className='list-table-format'>
  //             <img src={`${url}/images/` + item.image} alt="" />
  //             <p>{item.name}</p>
  //             <p>{item.category}</p>
  //             <p>${item.price}</p>
  //             <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
  //           </div>
  //         )
  //       })}
  //     </div>
  //   </div>
  // )
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Units</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            {/* <img src={`${url}/images/` + item.image} alt="" /> */}
            <p>{item.foodId.name}</p>
            <p>{item.foodId.category}</p>
            <p>₹{item.price}</p>
            <p>{item.units}</p>
            <p onClick={() => removeFood(item.foodId)} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default List