import React from "react";

type AppTextAreaProps = {
  title: string;
  label: string,
}

export const AppTextArea: React.FC<AppTextAreaProps> = ({ title, label }) => {
  return (
    <textarea 
      className="border-2 border-black w-full pl-4 pr-4" 
      value={`[${title}]\n${label || ''}`}
      readOnly
      rows={6} 
    />
  );
}