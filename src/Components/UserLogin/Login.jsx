import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import data from '../Data.json'

let hotelbg = `${data.hotelimg}`;

const Login = () => {
  const [userdetails, setUSerDetails] = useState({
    name: '',
    contactno: '',
    gender: '',
    peoples: '',
    room: ''
  });

  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for routing
  const [hotelid, setHotelid] = useState();

  const validateForm = () => {
    let formErrors = {};
    if (!userdetails.name) formErrors.name = 'Name is required';
    if (!userdetails.contactno) formErrors.contactno = 'Contact number is required';
    if (!userdetails.peoples) formErrors.peoples = 'Number of peoples is required';
    if (!userdetails.gender) formErrors.gender = 'Gender is required';
    if (!userdetails.room) formErrors.room = 'Room selection is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);

    // Get the 'Filepath' parameter from the URL
    const filepath = queryParams.get('HID');

    setHotelid(filepath);

    console.log(filepath);

  }, [])

  const saveDetails = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return; // If validation fails, do not proceed with the submission
    }

    // Creating a FormData object
    const formData = new FormData();
    formData.append('name', userdetails.name);
    formData.append('contact', userdetails.contactno);
    formData.append('numberofPeople', userdetails.peoples);
    formData.append('gender', userdetails.gender);
    formData.append('table_type', userdetails.room);

    try {

      // Sending the FormData to your API using fetch
      const response = await fetch(`http://192.168.1.25/Queue/register.php?hotel_id=${hotelid}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Response from API:', result);

      if (result.Status === true) {
        setSubmited(true);
        navigate('/dashboard', { state: { hotelid, contactno: userdetails.contactno } });
      }

      // Resetting form
      setUSerDetails({
        name: '',
        contactno: '',
        peoples: '',
        gender: '',
        room: ''
      });
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUSerDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="login-container">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hotelimg-container">
                <img
                  src='https://img.freepik.com/free-photo/swimming-pool_74190-1977.jpg?t=st=1728582687~exp=1728586287~hmac=929ff3da9e1e2cf6a5f7ce181ad1b0857151c99452110578beae3d5a7d28dbe4&w=740'
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-container">
                <form onSubmit={saveDetails}>
                  <span style={{ fontSize: '30px', margin: '60px 0px' }}>Registration</span>
                  <div className='input-container text-start'>
                    <label htmlFor="name">Name</label>
                    <input
                      type='text'
                      className="form-control"
                      name='name'
                      value={userdetails.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                  </div>
                  <div className='input-container text-start'>
                    <label htmlFor="contactno">Contact No</label>
                    <input
                      type='tel'
                      className="form-control"
                      name='contactno'
                      maxLength={10}
                      value={userdetails.contactno}
                      onChange={handleChange}
                    />
                    {errors.contactno && <span className="error">{errors.contactno}</span>}
                  </div>
                  <div className='input-container text-start'>
                    <label htmlFor="peoples">No Of Peoples</label>
                    <input
                      type='number'
                      className="form-control"
                      name='peoples'
                      value={userdetails.peoples}
                      onChange={handleChange}
                    />
                    {errors.peoples && <span className="error">{errors.peoples}</span>}
                  </div>
                  <div className='input-container text-start'>
                    <span className='gender'>Gender</span> <br />
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={userdetails.gender === 'male'}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="custom-radio"></span>
                      Male
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={userdetails.gender === 'female'}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="custom-radio"></span>
                      Female
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={userdetails.gender === 'other'}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="custom-radio"></span>
                      Other
                    </label><br></br>
                    {errors.gender && <span className="error">{errors.gender}</span>}
                  </div>
                  <div className="input-container text-start">
                    <span className='gender'>Rooms</span> <br />
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="room"
                        value="1"
                        checked={userdetails.room === '1'}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="custom-radio"></span>
                      AC
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="room"
                        value="0"
                        checked={userdetails.room === '0'}
                        onChange={handleChange}
                        className="radio-input"
                      />
                      <span className="custom-radio"></span>
                      Non AC
                    </label><br></br>
                    {errors.room && <span className="error">{errors.room}</span>}
                  </div>

                  <button className="submit-container btn w-50 mt-3" type='submit'>Submit</button>
                </form>
                {
                  submited && (
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                      <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
