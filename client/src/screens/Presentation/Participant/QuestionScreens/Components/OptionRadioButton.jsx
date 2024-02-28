import React from 'react';

function OptionRadioButton({ label, name, value, onChange, selected}) {
    return (
        <label className="flex items-center mb-2">
            <div className={
                !selected? "border border-gray-300 rounded p-2 flex items-center space-x-3 w-64"
                : "border border-black rounded p-2 flex items-center space-x-3 w-64"}>
                <input type="radio" className="form-radio h-5 w-5 text-blue-600" name={name} value={value} onChange={onChange} />
                <span className="text-gray-700 font-medium">{label}</span>
            </div>
        </label>
    );
}

export default OptionRadioButton;