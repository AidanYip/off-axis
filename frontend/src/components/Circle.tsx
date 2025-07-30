import { FC } from 'react';
import "./Circle.css"

interface CircleProperties{
    color?: string;
    image?: string;
    bandName?: string;
    location?: string;
    link?: string;
}

const Circle: FC<CircleProperties> =({
    // default values
    color,
    image="/images/placeholder.png",
    bandName="Name Not Found",
    location="",
    link="/",
}) =>{

    // if no colour is specified, choose a random colour for the artist label box
    const colors = ["#dd1167","#f7ef3b", "#19892a", "#1892be", "#d66d0f", "#dc185c"];

    const fillInColor = color || colors[Math.floor(Math.random() * colors.length)];

    return(
        <>
        <a href={link}>
            <div className="circle" style={{backgroundColor:color}}>
                <img src={image} alt={bandName}></img>
            </div>
            
            <div className="artist-label" style={{backgroundColor:fillInColor}}>
                <h3 className="name-box">{bandName}</h3> 
                <p className="location-box">{location}</p>
            </div>
        </a>
        </>  
    )
}

export default Circle
