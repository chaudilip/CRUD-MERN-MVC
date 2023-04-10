import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "../src/css/allData.css";

function ShowStudent(){

    const [students,setStudent] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get("/students/getAll")
        .then(response =>{
            console.log(response.data.selectStudents);
            
            setStudent(response.data.selectStudents);
        })
        .catch(error=>{
            console.log(error);
        })
    },[]);

    const handleEdit = (id) => {
        fetch(`/students/${id}`,{
            method:"GET",
        })
        .then((response)=> response.json())
        .then((data) => {
            console.log(data);
            navigate(`/students/${id}`);
        }).catch((err)=>{
            console.error(err);
        })
    }
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
          axios.delete(`/students/delete/${id}`)
            .then(response => {
              console.log(response);
              navigate(`/students/delete/${id}`);
            })
            .catch(error => {
              console.log(error);
            });
        }
      };
    return(
        <div className='getDiv'>
            <h2>All Students</h2>
            {students.length===0?(
                <p>Loading...</p>
            ):(
                <table className='tableGet'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>phoneNo</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {students?.map((student,index) => (
                        <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.address}</td>
                        <td>{student.phoneNo}</td>
                        <td><button className="editButton" onClick={() => handleEdit(student._id)}>Edit</button></td>
                        <td><button className="deleteButton" onClick={() => handleDelete(student._id)}>Delete</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            )}
        </div>
    )
}

export default ShowStudent;