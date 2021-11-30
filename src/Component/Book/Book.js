import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import './Book.css';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { 
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';
import Button from 'react-bootstrap/Button';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const [value, setValue] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckIn = (date) => {
        const newBookings = { ...value };
        newBookings.checkIn = date;
        setValue(newBookings);

    }

    const handleCheckOut = (date) => {
        const newBookings = { ...value };
        newBookings.checkOut = date;
        setValue(newBookings);
    }

    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...value };
        fetch('http://localhost:5000/addBooking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome, {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

         
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker 
                        disableToolbar
                        variant="inline"
                        format = "MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In Date"
                        value={value.checkIn}
                        onChange={handleCheckIn}
                        KeyboardButtonProps={{
                            'aria-label' : 'change date',
                        }}
                        />
                        <KeyboardDatePicker 
                        disableToolbar
                        variant="inline"
                        format = "MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check Out Date"
                        value={value.checkOut}
                        onChange={handleCheckOut}
                        KeyboardButtonProps={{
                            'aria-label' : 'change date',
                        }}
                        />
                           
                    </Grid>
                    <Button className="btn" onClick={handleBooking}>Book Now</Button>
                </MuiPickersUtilsProvider>
                
            <Bookings></Bookings>
           
        </div>
    );
};

export default Book;