import React from 'react';

function OptionCheckbox({ label, name, value, onChange, checked }) {
    return (
        <label className="flex items-center mb-2">
            <div className={
                !checked ? "border border-gray-300 rounded p-2 flex items-center space-x-3 w-64"
                    : "border border-black rounded p-2 flex items-center space-x-3 w-64"}>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" name={name} value={value} onChange={onChange} checked={checked} />
                <span className="text-gray-700 font-medium">{label}</span>
            </div>
        </label>
    );
}

export default OptionCheckbox;