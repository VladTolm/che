import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function UserMsg({ children }: Props) {
  return (
    <div className="flex justify-end animate-fade-in">
      <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-md px-4 py-2.5 max-w-md text-sm shadow-sm">
        {children}
      </div>
    </div>
  );
}
