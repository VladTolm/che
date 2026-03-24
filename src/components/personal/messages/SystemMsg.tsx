import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SystemMsg({ children }: Props) {
  return (
    <div className="flex justify-center animate-fade-in">
      <div className="bg-gray-100 text-gray-500 rounded-full px-4 py-1.5 text-xs">
        {children}
      </div>
    </div>
  );
}
