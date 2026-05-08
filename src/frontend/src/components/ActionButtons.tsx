import type { Action } from "@/types";

interface ActionButtonsProps {
  onAction: (action: Action) => void;
  availableActions?: Action[];
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const ACTIONS: { action: Action; label: string; className: string }[] = [
  {
    action: "fold",
    label: "FOLD",
    className:
      "bg-red-600 hover:bg-red-500 active:bg-red-700 border border-red-400/50 text-white shadow-lg shadow-red-900/40",
  },
  {
    action: "check",
    label: "CHECK",
    className:
      "bg-slate-600 hover:bg-slate-500 active:bg-slate-700 border border-slate-400/50 text-white shadow-lg shadow-slate-900/40",
  },
  {
    action: "call",
    label: "CALL",
    className:
      "bg-blue-600 hover:bg-blue-500 active:bg-blue-700 border border-blue-400/50 text-white shadow-lg shadow-blue-900/40",
  },
  {
    action: "raise",
    label: "RAISE",
    className:
      "bg-amber-600 hover:bg-amber-500 active:bg-amber-700 border border-amber-400/50 text-white shadow-lg shadow-amber-900/40",
  },
  {
    action: "allin",
    label: "ALL-IN",
    className:
      "bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-400 hover:to-red-500 active:from-yellow-600 active:to-red-700 border border-yellow-400/50 text-white shadow-lg shadow-red-900/40",
  },
];

const SIZE_CLASSES = {
  sm: "text-xs font-bold px-2 py-1.5 rounded",
  md: "text-sm font-bold px-3 py-2 rounded-md",
  lg: "text-base font-bold px-5 py-3 rounded-lg",
};

export function ActionButtons({
  onAction,
  availableActions,
  disabled = false,
  size = "md",
}: ActionButtonsProps) {
  const actions = ACTIONS.filter(
    (a) => !availableActions || availableActions.includes(a.action),
  );

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {actions.map(({ action, label, className }) => (
        <button
          key={action}
          type="button"
          data-ocid={`trainer.action_${action}_button`}
          disabled={disabled}
          onClick={() => onAction(action)}
          className={`${SIZE_CLASSES[size]} ${className} transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed tracking-widest uppercase`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default ActionButtons;
