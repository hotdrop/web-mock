import React from "react"

type AppTextFieldProps = {
  label: string;
  initValue: string;
}

export const AppTextField: React.FC<AppTextFieldProps> = ({ label, initValue }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-medium">
        {label}
      </label>
      <input 
        className="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
        value={initValue}
      />
    </div>
  );
};