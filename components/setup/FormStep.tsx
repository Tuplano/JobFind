import { ReactNode } from "react";

type FormStepProps = {
  title: string;
  children: ReactNode;
};

export default function FormStep({ title, children }: FormStepProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      {children}
    </div>
  );
}
