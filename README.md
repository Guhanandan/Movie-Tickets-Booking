# Movie-Tickets-Booking Application

### This project involves creating a web application for movie ticket booking with different functionalities for users and administrators. I focussed only on backend development by building APIs in NodeJS.

# Tech Stack:
## Back-end: 
NodeJS and ExpressJS for developing APIs and I used Postman software to test my APIs by creating different APIs calls.
## Database: 
Here I used MongoDB to store Movie-Tickets-Booking data

# Types of Users:
### User: 
Regular users who will book movie tickets.
### Admin: 
Administrators who will manage movies, theaters, and bookings.

# User Use Cases:
## Login: 
Users can log in to their accounts.
```
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Create and send JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }   
});
```
![Screenshot 2024-05-18 083929](https://github.com/Guhanandan/Movie-Tickets-Booking/assets/100425381/1eae7ce2-2034-4917-b1a3-22e576533a07)

## Signup: 
New users can create accounts.
```
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```
![Screenshot 2024-05-18 083740](https://github.com/Guhanandan/Movie-Tickets-Booking/assets/100425381/a8a4a0c8-dc1f-4b23-bdb3-71b8a16eff63)

## Search: 
Users can search for movies by name, date, and theater name.
```

```
## Booking:
Users can book tickets based on availability. (Assuming the default seats count is 60)
```
router.post('/booking' , async (req,res)=>{
  try{
    const {userID , theatreID , movieID , numberOfSeats} = req.body
    const theatre = await Theatre.findById(theatreID)

    const movie = await theatre.movies.find(movie => movie.movieID.equals(movieID))
    const totalPrice = movie.price * numberOfSeats

    const booking  = await Booking.create({userID , theatreID , movieID , numberOfSeats , totalPrice})

    if(movie.seatsAvailable<numberOfSeats){
      res.status(400).json({message : "Seats are not Available"})
    }
    movie.seatsAvailable -= numberOfSeats
    await theatre.save()
    const bookingId = booking._id.toString()
    const bookingObject = await Booking.find({_id : bookingId}).populate('userID').populate('theatreID').populate('movieID')
    // console.log(bookingObject)
    res.status(201).json(bookingObject)
  }
  catch(err){
    console.log(err)
    res.status(500).json({error : err})
  }
})
```
![Screenshot 2024-05-17 225851](https://github.com/Guhanandan/Movie-Tickets-Booking/assets/100425381/1ae4b975-6869-4f8c-ab77-5e66faa18ab4)


# Admin Use Cases:
## Login: 
Admins have a separate login interface to access admin functionalities.
```

```

## Add Movie: 
Admins can add new movies to the system.
```
router.post('/add-movie', verifyToken, async (req, res) => {
  try {
    const { movie_name,image,discription,languages,director,duration,release_date} = req.body;
    const newMovie = new Movie({ movie_name,image,discription,languages,director,duration,release_date });
    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```
![Screenshot 2024-05-16 144937](https://github.com/Guhanandan/Movie-Tickets-Booking/assets/100425381/c4d1876e-09de-4f76-8d1a-001a25c9e3e1)


## Add Theatres: 
Admins can add new theaters to the system.
```
router.post('/add-theatre', verifyToken, async (req, res) => {
  try {
    const { name,movies } = req.body;
    const postedTheatre = await Theatre.create({name,movies });
    // console.log(postedTheatre)
    const id = postedTheatre._id.toString()
    const theatres = await Theatre.find({_id : id}).populate('movies.movieID').exec()
    res.status(201).json({ message: 'Theatre added successfully', theatres});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```
![Screenshot 2024-05-16 144346](https://github.com/Guhanandan/Movie-Tickets-Booking/assets/100425381/cac1c7e2-de3f-49dd-883b-c8d85da973d9)



## View Bookings: 
Admins can view the bookings made by users.
```
router.get('/view-bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('userID').populate('movieID').populate('theatreID');
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```
![Screenshot 2024-05-17 231639](https://github.com/Guhanandan/Movie-Tickets-Booking/assets/100425381/46f19e1e-ebe5-4605-8dbd-53c5cc898606)

![Screenshot 2024-05-18 085917](https://github.com/Guhanandan/Movie-Tickets-Booking/assets/100425381/4c832f44-83d8-4196-a7c1-394ac12c0d6a)
