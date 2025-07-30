import { FC } from 'react';

const Border: FC = () => {
    return (
        <>
            <div id="pinkline" style={{ background: '#dd1167', height : '5px', width: '100%', position:'fixed', top: 0, left: 0, zIndex: 3000 }}/>
            <div id="greenline" style={{ background: '#19892a', height : '5px', width: '100%', position:'fixed', bottom: 0, left: 0, zIndex: 3000 }}/>
            <div id="yellowline" style={{ background: '#f7ef3b', height : '100%', width: '5px', position:'fixed', top: 0, right: 0, bottom: 0, zIndex: 3000 }}/>
            <div id="blueline" style={{ background: '#1892be', height : '100%', width: '5px', position:'fixed', top: 0, left: 0, bottom: 0, zIndex: 3000 }}/>
        </>
    )
}

export default Border;
