import React from 'react';
import "../../styles/index.css";


const RunFormRegisterActivity = ({getButtons}) => {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const kmRan=Number(event.target.elements.duration.value);
        getButtons();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3>Run</h3>
                <label>Km Ran : </label>
                <input
                    type="number"
                    id="kmRan"
                    name="kmRan"
                    min="0"
                    required
                />
            </div>
            <button>Add Run</button>
        </form>
    );
}

export default RunFormRegisterActivity;