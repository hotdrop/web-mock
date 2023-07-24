import React, { ChangeEvent } from "react"

type AppTextFieldProps = {
  label: string;
  initValue: string;
  color: 'blue' | 'red' | 'gray';
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const colorClasses = {
  blue: { textColor: 'text-blue-700', borderColor: 'border-blue-400' },
  red: { textColor: 'text-red-700', borderColor: 'border-red-400' },
  gray: { textColor: 'text-gray-400', borderColor: 'border-gray-400' },
}

export const AppTextField: React.FC<AppTextFieldProps> = ({ label, initValue, color, onChange }) => {
  const { textColor, borderColor} = colorClasses[color] || colorClasses.gray;

  return (
    <div className="flex flex-col">
      <label className={`mb-2 font-medium ${textColor}`}>
        {label}
      </label>
      <input 
        className={`px-3 py-2 text-gray-700 border ${borderColor} rounded-lg focus:outline-none focus:ring-2`} 
        value={initValue}
        onChange={onChange}
      />
    </div>
  );
};