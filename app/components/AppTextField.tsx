import React from "react"

type AppTextFieldProps = {
  label: string;
  initValue: string;
  color: 'blue' | 'red' | 'gray';
}

const colorClasses = {
  blue: { text: 'text-blue-700', border: 'border-blue-400' },
  red: { text: 'text-red-700', border: 'border-red-400' },
  gray: { text: 'text-gray-400', border: 'border-gray-400' },
}

export const AppTextField: React.FC<AppTextFieldProps> = ({ label, initValue, color }) => {
  const { text: textColor, border: borderColor} = colorClasses[color] || colorClasses.gray;

  return (
    <div className="flex flex-col">
      <label className={`mb-2 font-medium ${textColor}`}>
        {label}
      </label>
      <input 
        className={`px-3 py-2 text-gray-700 border ${borderColor} rounded-lg focus:outline-none focus:ring-2`} 
        value={initValue}
      />
    </div>
  );
};