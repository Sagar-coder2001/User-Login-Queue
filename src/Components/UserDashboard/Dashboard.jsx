import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';
import { useLocation } from 'react-router-dom';
import sandtimer from '../../assets/sandtimer.gif';
import sandtimernew from '../../assets/sandtimerNew.png'
// import peoples from '../ringing.json'
// import Lottie from 'lottie-react';
import peoples from '../../assets/man.png'
import women from '../../assets/women.png'

import gameicon1 from '../../assets/game icon 1.png';
import gameicon2 from '../../assets/game icon 2.png';
import gameicon3 from '../../assets/game icon 3.png';
import gameicon4 from '../../assets/game icon 4.png';
import gameicon5 from '../../assets/game icon 5.png';
import gameicon6 from '../../assets/game icon 6.png';

const Dashboard = () => {
    const location = useLocation();
    const hotelid = location.state?.hotelid;   // Access the hotelid
    const contactno = location.state?.contactno; // Access the contact number

    const [Queuemessage, setQueuemessage] = useState('');
    const [genderQueue, setGenderQueue] = useState([]); // To store genders for animation
    const [waitingtime, setWaitingTime] = useState('')
    const [status, setStatus] = useState(true);
    const [queue, setQueue] = useState('');
  
    useEffect(() => {
        console.log(hotelid);
        const eventSource = new EventSource(`http://192.168.1.25/Queue/queue.php?contact=${contactno}&hotel_id=${hotelid}`);

        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setQueuemessage(newMessage.Message);
            console.log(newMessage.Message);
            setStatus(newMessage.Status);
            setQueue(newMessage.Queue);

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


    // const queueanimation = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: peoples,
    //     rendererSettings: {
    //         preserveAspectRatio: 'xMidYMid slice',
    //     },
    // };

    const renderQueueImages = () => {
        let images = [];

        for (let i = 0; i < queue; i++) {
            const isLastImage = i === queue - 1; // Check if this is the last image
    
            images.push(
                <div key={i} className={`queue-item ${isLastImage ? 'highlighted' : ''}`}>
                    <p>{isLastImage ? 'you' : ''}</p>
                    <img src={isLastImage ? women : peoples} alt="Person in Queue" className="queue-image" />
                    <p className="queue-text">{i + 1}</p>
                </div>
            );
        }
        return images;
    };

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
                            <img src={Queuemessage === "Please Visit To Receptionist."? sandtimernew : sandtimer} alt="Sand Timer"
                                className={Queuemessage === "Please Visit To Receptionist." ? "sandtimernew-style" : "sandtimer-style"}
                            />
                        </div>
                    </div>

                    <div className="show-queue">
                        <span>{Queuemessage}</span>
                    </div>

                    <div className="loader-overlay">
                        <div className="spinner-container">
                            <div className="lottie-container">
                                <div className="queue-images-container" style={{ textAlign: 'center' }}>
                                    {renderQueueImages()}
                                </div>
                            </div>
                        </div>
                    </div>

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
                                <a href="http://192.168.1.25/Shooting%20Game/" target="_blank" rel="noopener noreferrer">
                                    <img src={gameicon1} alt="Game Icon 1" />
                                </a>
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
