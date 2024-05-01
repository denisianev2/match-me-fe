export default function IconButton({ icon, onClick }) {
  return (
    <button
      className="py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
