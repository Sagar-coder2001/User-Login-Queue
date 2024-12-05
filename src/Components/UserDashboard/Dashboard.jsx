import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';
import { useLocation } from 'react-router-dom';
import sandtimer from '../../assets/sandtimer.gif';

import gameicon1 from '../../assets/game icon 1.png';
import gameicon2 from '../../assets/game icon 2.png';
import gameicon3 from '../../assets/game icon 3.png';
import gameicon4 from '../../assets/game icon 4.png';
import gameicon5 from '../../assets/game icon 5.png';
import gameicon6 from '../../assets/game icon 6.png';

// import manimage from '../../assets/man.png';
// import womenimage from '../../assets/women.png';

const Dashboard = () => {
    const location = useLocation();
    const hotelid = location.state?.hotelid;   // Access the hotelid
    const contactno = location.state?.contactno; // Access the contact number

    const [Queuemessage, setQueuemessage] = useState('');
    const [genderQueue, setGenderQueue] = useState([]); // To store genders for animation
    const [waitingtime, setWaitingTime] = useState('')
    

    useEffect(() => {
        console.log(hotelid);
        const eventSource = new EventSource(`http://192.168.1.25/Queue/queue.php?contact=${contactno}&hotel_id=${hotelid}`);
    
        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setQueuemessage(newMessage.Message);
    
            if (newMessage.Gender) {
                // Add gender to the queue when new message comes
                setGenderQueue(prevQueue => [...prevQueue, newMessage.Gender]);
            }
    
            if (newMessage.Status === false) {
                eventSource.close();
            }
    
            console.log(newMessage);

    
            // Get current time
            const d = new Date();
            const currentHours = d.getHours();
            const currentMinutes = d.getMinutes();
            const currentSeconds = d.getSeconds();
            console.log(`Current Time: ${currentHours}:${currentMinutes}:${currentSeconds}`);
    
            // Assuming waitingTime is in HH:MM:SS format
            let waitingTime = newMessage.Waiting_Time; // e.g., "16:31:04"
            if (waitingTime && waitingTime.includes(':')) { // Check if waitingTime is valid and in the expected format
                const [waitHours, waitMinutes, waitSeconds] = waitingTime.split(':').map(Number);
    
                // Convert waiting time to total seconds
                const totalWaitingSeconds = waitHours * 3600 + waitMinutes * 60 + waitSeconds;
    
                // Convert current time to total seconds
                const totalCurrentSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;
    
                if (totalCurrentSeconds >= totalWaitingSeconds) {
                    setWaitingTime('Wait For a While');
                }
                else {
                    // Subtract waiting time from current time
                    const newTotalSeconds = totalCurrentSeconds - totalWaitingSeconds;
    
                    const absTotalSeconds = Math.abs(newTotalSeconds);
    
                    // Convert back to hours and minutes
                    const newHours = String(Math.floor((absTotalSeconds / 3600) % 24)).padStart(2, '0'); // wrap around at 24
                    const newMinutes = String(Math.floor((absTotalSeconds % 3600) / 60)).padStart(2, '0');
                    const newSeconds = String(absTotalSeconds % 60).padStart(2, '0');
    
                    console.log(`New Time after subtracting waiting time: ${newHours}:${newMinutes}:${newSeconds}`);
    
                    setWaitingTime(`${newHours}:${newMinutes}:${newSeconds}`);
                }
            } else {
                setWaitingTime('Wait For A While');
            }
        };
    
        return () => {
            eventSource.close();
        };
    }, [hotelid, contactno]); // Add dependencies to re-run effect when they change
    

    return (
        <div>
            <Navbar />
            <div className="dashboard-container">

                <div className="dashboard">
                    <div className="navigation">
                        <div className="sandtime">
                            <p><strong>Waiting Time : </strong> <span>{waitingtime}</span></p>
                        </div>
                        <div className="sandclock">
                            <img src={sandtimer} alt="Sand Timer" />
                        </div>
                    </div>

                    <div className="show-queue">
                        <span>{Queuemessage}</span>
                    </div>

                    {/* Gender-based Image Animation */}
                    {/* <div className="image-animation">
                        <div className="images">
                            {genderQueue.map((gender, index) => (
                                <img 
                                    key={index} 
                                    src={gender === 'male' ? manimage : womenimage} 
                                    alt={gender === 'male' ? "Man" : "Woman"} 
                                    className="gender-image"
                                />
                            ))}
                        </div>
                    </div> */}

                    <div className="game-queue">
                        <div className="game-instruction">
                            <h4>Game Instruction</h4>
                            <ul style={{ marginTop: '20px' }}>
                                <li style={{ listStyleType: 'number' }}>i maxime debitis ipsam, praesentium ab quod aperiam.</li>
                                <li style={{ listStyleType: 'number' }}>i maxime debitis ipsam, praesentium ab quod aperiam.</li>
                                <li style={{ listStyleType: 'number' }}>i maxime debitis ipsam, praesentium ab quod aperiam.</li>
                                <li style={{ listStyleType: 'number' }}>i maxime debitis ipsam, praesentium ab quod aperiam.</li>
                            </ul>
                        </div>

                        <div className="game-icons">
                            <h4>Play Game And Get Discount</h4>
                            <div className="game-icon">
                                <img src={gameicon1} alt="Game Icon 1" />
                                <img src={gameicon2} alt="Game Icon 2" />
                                <img src={gameicon3} alt="Game Icon 3" />
                                <img src={gameicon4} alt="Game Icon 4" />
                                <img src={gameicon5} alt="Game Icon 5" />
                                <img src={gameicon6} alt="Game Icon 6" />
                                <img src={gameicon4} alt="Game Icon 4" />
                                <img src={gameicon5} alt="Game Icon 5" />
                                <img src={gameicon6} alt="Game Icon 6" />
                                <img src={gameicon4} alt="Game Icon 4" />
                                <img src={gameicon4} alt="Game Icon 4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
