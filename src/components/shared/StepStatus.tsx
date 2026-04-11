interface Props {
  status: "completed" | "active" | "pending";
}

export default function StepStatus({ status }: Props) {
  if (status === "completed") {
    return (
      <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
        ✓
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
      </span>
    );
  }
  return (
    <span className="w-6 h-6 rounded-full bg-gray-200 border-2 border-gray-300" />
  );
}
