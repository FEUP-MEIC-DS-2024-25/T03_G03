import React from 'react';

const AnswerBox = ({ answer }) => {
    if (!answer) return null; // Return null if answer is undefined or empty

    return (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg font-bold">Response:</h3>
            <p className="mt-2 text-gray-700">{answer}</p>
        </div>
    );
};

export default AnswerBox;