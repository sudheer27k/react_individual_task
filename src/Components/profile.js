import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './profile.css'

 

function User_profile() {
    const location = useLocation();
    const user = location.state.user;


    const [profileDetails, setProfileDetails] = useState({
        name: '',
        email: '',
        dob: '',
        designation: '',
    });

    const fetchProfileDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3001/profile/${user.email}`);
            const data = await response.json();
            setProfileDetails(data)
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };
    fetchProfileDetails();

    return (
        <div className='main-container-profile'>
        <div className='profile-details'>
            <h2>User Profile</h2>
            <p>
            <label>Name:</label> {profileDetails.name}
            </p>
            <p>
            <label>Email:</label> {profileDetails.email}
            </p>
            <p>
            <label>DOB:</label> {profileDetails.dob}
            </p>
            <p>
            <label>Designation:</label> {profileDetails.designation}
            </p>
            <Link to='/login' className='home-link'>Go back to Home</Link>
        </div>
        </div>
    )
}


export default User_profile;

