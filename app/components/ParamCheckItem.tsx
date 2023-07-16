import React from "react";
import { FaCheckCircle, FaRegTimesCircle } from 'react-icons/fa';

type ParamCheckItemProps = {
  label: string;
  checkResult: [boolean, string];
};

export const ParamCheckItem: React.FC<ParamCheckItemProps> = ({ label, checkResult }) => {
  const [result, detailLabel] = checkResult;
  const icon = result ? <FaCheckCircle className="text-2xl" /> : <FaRegTimesCircle className="text-2xl"/>;

  if (result) {
    return (
      <div className="flex items-center space-x-2 pt-4">
        <span className="text-green-500">{icon}</span>
        <div>
          <p className="text-green-500">{label}</p>
          <p className="text-green-500">{detailLabel}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center space-x-2 pt-4">
        <span className="text-red-500">{icon}</span>
        <div>
          <p className="text-red-500">{label}</p>
          <p className="text-red-500">{detailLabel}</p>
        </div>
      </div>
    );
  }
}