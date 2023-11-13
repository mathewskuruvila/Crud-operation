import logo from "./logo.svg";
import "./App.css";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL ="http://localhost:8080/";
function App() {
  const [addSection, setAddSection] = useState(false);
  const [formData,setFormData] = useState({
    name :"",
    email:"",
    mobile:"",
  })
  const [dataList,setDataList]=useState([])
  const handleOnchange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = await axios.post("/create",formData)
    console.log(data);
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
    }
  }
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])
  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    
    if(data.data.success){
      getFetchData()
      alert (data .data.message)
    }
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add information</button>
        {addSection && (
          <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="close-btn" onClick={()=>setAddSection(false)} >
                <MdClose />
              </div>
              <label htmlFor="name">Name :</label>
              <input type="text" id="name" name="name" onChange={handleOnchange}/>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" onChange={handleOnchange} />
              <label htmlFor="mobile">Mobile:</label>
              <input type="number" id="mobile" name="mobile" onChange={handleOnchange} />
              <button className="btn">Submit</button>
            </form>
          </div>
  )
}
<div className="tableContainer">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {dataList [0] ? (
        dataList.map((e1)=>{
          return(
            <tr>
              <td>{e1.name}</td>
              <td>{e1.email}</td>
              <td>{e1.mobile}</td>
              <td>
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete" onClick={()=>handleDelete(e1. _id)}>Delete</button>
                 </td>
            </tr>
          )
        }))
        : (
          <p style={{textAlign:"center"}}>No data</p>
        )
      }
    </tbody>
  </table>
</div>
</div>
</>
);
}
export default App;