import React from 'react';
import { Button } from 'react-bootstrap';

const Result = ({res,msg}) => {
    const hStyles = {
        textShadow : '1px -4px 4px #d500ff'
    }
    return (
        <div className="text-center">
            <h2 style={hStyles}>{msg}</h2>
            <Button onClick={()=>{res()}} variant="danger" className="mt-3">New Game</Button>
        </div>
    );
};

export default Result;