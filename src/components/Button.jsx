import clsx from "clsx";

export default function Button({ children, onClick, className }) {
  return (
    <button
      className={clsx(
        "py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
