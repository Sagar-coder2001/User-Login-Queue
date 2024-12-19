import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import data from '../Data.json'
import userimg from '../../assets/user.jpg'

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
  const [showerr, setShowerr] = useState(false);

  const validateForm = () => {
    let formErrors = {};
    if (!userdetails.name) formErrors.name = 'Name is required';
    if (!userdetails.contactno) formErrors.contactno = 'Contact number is required';
    if (!userdetails.peoples) formErrors.peoples = 'Number of peoples is required';
    if (userdetails.peoples > 100) formErrors.peoples = 'Number of is below 100';
    if (userdetails.peoples < 0) formErrors.peoples = 'Number of is greater then 0';
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

      if (result.Status === false) {
        setShowerr(true);
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
          {
            showerr ? (
              <>
                <div>
                  <div className="showerr">
                    <div>
                      Invalid Credentails
                    </div>
                    <button onClick={() => setShowerr(false)} className='mt-2'>ok</button>
                  </div>
                </div>

              </>
            )
              :
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
                      <div className='upperform'>
                        <img src={userimg} alt="" />
                        <span style={{ fontSize: '30px', margin: '60px 0px' }}>Registration</span>
                      </div>
                      <div className='input-container text-start'>
                        <i className="fa-solid fa-user" style={{ marginRight: '7px', color: '#b5a68f', fontSize: '20px' }}></i>
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
                        <i className="fa-solid fa-phone" style={{ marginRight: '7px', color: '#b5a68f', fontSize: '20px' }}></i>
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
                        <i className="fa-solid fa-users" style={{ marginRight: '7px', color: '#b5a68f', fontSize: '20px' }}></i>
                        <label htmlFor="peoples">No Of Peoples</label>
                        <input
                          type='number'
                          className="form-control"
                          name='peoples'
                          value={userdetails.peoples}
                          onChange={handleChange}
                          style={{ color: 'white' }}
                        />
                        {errors.peoples && <span className="error">{errors.peoples}</span>}
                      </div>
                      <div className='input-container text-start'>
                        <span className='gender'>Gender</span> <br />
                        <select name="gender" value={userdetails.gender} style={{backgroundColor: 'grey'}} onChange={handleChange} className="form-control">
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.gender && <span className="error">{errors.gender}</span>}
                      </div>
                      <div className="input-container text-start">
                        <span className='gender'>Rooms</span> <br />
                        <select name="room" value={userdetails.room} onChange={handleChange} style={{backgroundColor: 'grey'}} className="form-control">
                          <option value="">Select Room Type</option>
                          <option value="1">AC</option>
                          <option value="0">Non AC</option>
                        </select>

                        {errors.room && <span className="error">{errors.room}</span>}
                      </div>

                      <button className="submit-container btn w-50 mt-3" type='submit'><strong>Submit</strong></button>
                    </form>
                    {
                      submited && (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                          <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
          }

        </div>
      </div>
    </div>
  );
};

export default Login;
