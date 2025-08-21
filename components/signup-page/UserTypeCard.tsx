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
      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2  ${
        isSelected
         ? 'border-[#C8DAA6] bg-[#FBF5DB] shadow-lg transform scale-105'
          : 'border-[#76944C] bg-[#C8DAA6] hover:border-[#FBF5DB] hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div
          className={`p-3 rounded-lg ${
          isSelected ? 'bg-[#76944C] text-white' : 'bg-[#C8DAA6] text-[#76944C]'
          }`}
        >
          {icon}
        </div>
        <div>
          <h3
            className={`font-semibold text-lg ${
          isSelected ? 'text-[#76944C]' : 'text-[#76944C]'
            }`}
          >
            {title}
          </h3>
                  <p className={`text-xs ${
          isSelected ? 'text-[#76944C]' : 'text-[#C0B6AC]'
        }`}>
          {description}
        </p>
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
              className={isSelected ? "text-green-600" : "text-gray-400"}
            />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserTypeCard;
