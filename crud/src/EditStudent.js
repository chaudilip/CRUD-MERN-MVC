import React, {useState,useEffect,} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../src/css/insertData.css";
import { useNavigate } from "react-router-dom";

function EditStudent(){
    const [students,setStudent] = useState([]);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const {id}= useParams(); 
    useEffect(()=>{
        axios.get(`/students/${id}`)
        .then(response =>{
            console.log(response.data.selectStudent);
            const student = response.data.selectStudent;
            setName(student.name);
            setEmail(student.email);
            setAddress(student.address);
            setPhoneNo(student.phoneNo);

        })
        .catch(error=>{
            console.log(error);
        })
    },[id]);

    const onSubmit = (event) => {
        event.preventDefault();
        const updateData = {
            name:name,
            email:email,
            address:address,
            phoneNo:phoneNo
        };
        axios.put(`/students/${id}`,updateData)
        .then(response => {
            console.log(response);
            navigate("/students/getAll");

        }).catch(error =>{
            console.log(error);
        })
    }
    return (
        <div className="form-container">
          <form onSubmit={onSubmit}>
          <h1 className="form-title">Update Student</h1>
          
            <label htmlFor="Name">Name</label>
            <input type="text" name="Name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
    
            <label htmlFor="Email">Email</label>
            <input type="email" name="Email" className="form-input" value={email}  onChange={(e) => setEmail(e.target.value)}/>
    
            <label htmlFor="Address">Address</label>
            <input type="text" name="Address" className="form-input"  value={address} onChange={(e) => setAddress(e.target.value)}/>
    
            <label htmlFor="Phone">Phone</label>
            <input type="number" name="Phone" className="form-input" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
    
            <button type="submit" name="submitBtn" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      );
}

export default EditStudent;