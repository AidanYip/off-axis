import { FC } from 'react';
import "./GradientButton.css";

interface GradientButtonProperties{
    text?: string;
    link?: string;
    padding?: string;
    fontSize?: string;
}

const GradientButton: FC<GradientButtonProperties> =({text="Button", link="", padding="0.5em 1em", fontSize="1em"}) =>{
    return(
        <>
            <a href={link} className="gradientButton" style={{padding: padding, fontSize: fontSize}}>{text}</a>
        </>  
    )
}

export default GradientButton