import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OrderStatus(){

  const {id} = useParams();
  const [order,setOrder] = useState(null);

  useEffect(()=>{
    const interval = setInterval(()=>{
      axios.get(`http://localhost:5000/api/orders/${id}`)
      .then(res=>setOrder(res.data));
    },2000);

    return ()=>clearInterval(interval);
  },[id]);

  if(!order) return <h2>Loading...</h2>;

  return(
    <div style={{padding:"40px"}}>
      <h1>Order Status</h1>
      <h2>{order.status}</h2>
    </div>
  );
}
