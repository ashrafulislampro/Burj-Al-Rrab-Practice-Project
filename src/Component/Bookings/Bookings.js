import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
          const [bookings, setBookings] = useState([]);
          const [loggedInUser, setLoggedInUser] = useContext(UserContext);
          useEffect(() =>{
                    fetch('http://localhost:5000/booking?email='+loggedInUser.email,{
                           method: 'GET',
                           headers: { 
                                  'Content-Type': 'application/json',
                                  Authorization : `Bearer ${sessionStorage.getItem("token")}`
                            }
                    })
                    .then(res => res.json())
                    .then(data => setBookings(data));
          },[loggedInUser.email]);
          return (
                    <div>
                           <h1>Booking Data : {bookings.length}</h1>   
                           {
                                     bookings.map(book => <li key={book._id}>{book.name} From : {(new Date(book.checkIn).toDateString("dd/mm/yyyy"))} To : {(new Date(book.checkOut).toDateString("dd/mm/yyyy"))}</li>)
                           }
                    </div>
          );
};

export default Bookings;