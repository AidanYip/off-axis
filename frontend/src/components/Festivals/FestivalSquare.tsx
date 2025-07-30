import { FC } from 'react';
import "./FestivalSquare.css"

interface SquareProperties{
    color?: string;
    image?: string;
    bandName?: string;
    location?: string;
    link?: string;
}

const FestivalSquare: FC<SquareProperties> =({
    // default values
    color,
    image="/images/placeholder.png",
    bandName="testbandName",
    link="wh3schools.com",
}) =>{

    // if no colour is specified, choose a random colour for the artist label box
    const colors = ["#dd1167","#f7ef3b", "#19892a", "#1892be", "#d66d0f", "#dc185c"];

    const fillInColor = color || colors[Math.floor(Math.random() * colors.length)];

    return(
        <>
        <a href={link}>
            <div className="square" style={{backgroundColor:color}}>
                <img src={image} alt={bandName}></img>
            </div>
            
            <div className="festival-label" style={{backgroundColor:fillInColor}}>
                <h3 className="name-box">{bandName}</h3> 
            </div>
        </a>
        </>  
    )
}

export default FestivalSquare
