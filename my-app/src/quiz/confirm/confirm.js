import React from 'react';

const Confirm = props => {
    return(
        <div>
            <h1>Rules and regulations</h1>
            <button onClick={props.continue}>start</button>
            <button onClick={props.cancel}>cancel</button>
        </div>
    )
}

export default Confirm;