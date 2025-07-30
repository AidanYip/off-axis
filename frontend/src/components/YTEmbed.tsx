import { FC } from 'react';
import './YTEmbed.css'

interface YTEmbedProperties{
    link?: string;
    width?: string;
    height?: string;
}

const YTEmbed: FC<YTEmbedProperties> = ({link=""}) => {
  return (
    <div className="videoPlayer">
        <iframe
            src={link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        ></iframe>
    </div>
  );
}

export default YTEmbed;
