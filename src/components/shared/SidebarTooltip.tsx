interface Props {
  text: string;
  visible: boolean;
}

export default function SidebarTooltip({ text, visible }: Props) {
  if (!visible) return null;
  return (
    <div className="absolute left-full ml-2 top-0 z-50 w-64 p-3 bg-gray-800 text-gray-200 text-xs rounded-lg shadow-lg animate-tooltip-enter">
      <div className="absolute -left-1.5 top-3 w-3 h-3 bg-gray-800 rotate-45" />
      {text}
    </div>
  );
}
