import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Movies.css'

export default function Movie() {
    const [movies , setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/movies')
            .then(responce => {
                setMovies(responce.data);
            })
            .catch((err)=>{
                console.error('Error fetching data : ' , err);
            });
    } , []);

    console.log(movies);

    return (
        <div className="movie-container">
            {movies.map((movie) => (
                <div className="movie" key={movie._id}>
                    <img src={movie.image} alt={movie.movie_name} />
                    <div className="movie-details">
                        <h2 className='movie-name'>{movie.movie_name}</h2>
                        <p className="description">{movie.description}</p>
                        <p><strong>Languages:</strong> {movie.languages.join(', ')}</p>
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Duration:</strong> {movie.duration}</p>
                        <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
                        <div className='booknow-btn-container'><button className='book-now-btn'>Book Now</button></div>
                    </div>
                </div>
            ))}
        </div>

    );
}
