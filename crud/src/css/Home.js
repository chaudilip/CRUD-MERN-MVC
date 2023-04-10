import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

function Home(){
    const navigate = useNavigate();

    const handleAddStudentClick = () => {
        navigate('/addStudent');
    }

    const handleShowStudentClick = () => {
        navigate('/showStudent');
    }

    return(
        <div className="home-container">
            <h1 className="home-heading">Welcome to our school</h1>
            <p className="home-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className="home-button" onClick={handleAddStudentClick}>Add Student</button>
            <button className="home-button" onClick={handleShowStudentClick}>Show Student</button>
        </div>
    )
}

export default Home;
