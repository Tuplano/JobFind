import { TypeCardProps } from "@/types/Signup";
import { CheckCircle } from "lucide-react";

function UserTypeCard({
  type,
  title,
  description,
  icon,
  benefits,
  isSelected,
  onSelect
}: TypeCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer p-6 border-2 rounded-xl transition-all duration-200 ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div
          className={`p-3 rounded-lg ${
            isSelected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
          }`}
        >
          {icon}
        </div>
        <div>
          <h3
            className={`font-semibold text-lg ${
              isSelected ? "text-blue-900" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 text-sm text-gray-600"
          >
            <CheckCircle
              size={16}
              className={isSelected ? "text-blue-500" : "text-gray-400"}
            />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserTypeCard;
