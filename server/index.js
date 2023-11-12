const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//schema

const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: Number,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", schemaData);

//read
//http://localhost:8080/
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

//Create Data \\ save data in mongo db
//http://localhost:8080/create
/*
{
  name,
  email,
  mobile,
}


*/
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data saved successfully",data : data });
});
//http://localhost:8080/update

// {
//   id:"",
//   name:"",
//   email:"",
//   mobile:""
// }
//update data
app.put("/update",async (req,res)=>{
    console.log(req.body)
    const {id,...rest}= req.body
    console.log(rest)
    const data= await userModel.updateOne({_id: id},rest)
    res.send({success :true, message :"data updated successfully",data : data})
})
//delete data
/*
http://localhost:8080/delete/id
*/

app.delete("/delete/:id",async (req,res)=>{
const id =req.params.id
console.log(id)
const data =await userModel.deleteOne({_id :id})
res.send({success :true,message :"data deleted successfully",data :data})
})

mongoose
  .connect("mongodb://localhost:27017/curdOperations")
  .then(() => {
    console.log("connected to mongo db");
    app.listen(PORT, () => console.log("server is- running"));
  })
  .catch((err) => console.log(err));


  //npm run dev