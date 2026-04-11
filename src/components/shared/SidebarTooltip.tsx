interface Props {
  text: string;
  visible: boolean;
}

export default function SidebarTooltip({ text, visible }: Props) {
  if (!visible) return null;
  return (
    <div className="absolute left-full ml-2 top-0 z-50 w-64 p-3 bg-white border border-gray-200 text-gray-700 text-xs rounded-lg shadow-sm animate-tooltip-enter">
      <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
      {text}
    </div>
  );
}
