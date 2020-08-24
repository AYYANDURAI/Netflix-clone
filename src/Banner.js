import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './Request';
import './Banner.css';

const baseUrl = 'https://image.tmdb.org/t/p/original/';

function Banner() {
    const [movie, setMovie] = useState({});
    console.log(movie);
    useEffect(() => {
        async function getMovieData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            let randomIndex = Math.floor(Math.random() * request.data.results.length - 1) + 1;
            setMovie(request.data.results[randomIndex]);
            return request;
        }
        getMovieData();
    }, []);
    function truncate(str, limit) {
        return str?.length > limit ? str.substring(0, limit - 1) : str;
    }
    return (
        <header className="banner" style={{
            backgroundImage: `url(${baseUrl}${movie?.poster_path || movie?.backdrop_path})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat"

        }}>
            <div className="banner__content">
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.originalName}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__overview">{truncate(movie?.overview, 150)}...</h1>
            </div>
            <div className="banner--fadeBottom" />
        </header >
    )
}

export default Banner;
