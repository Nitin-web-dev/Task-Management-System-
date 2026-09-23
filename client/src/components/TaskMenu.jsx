import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { deleteTaskApi } from "../api/taskApi";
export default function TaskMenu({ taskId }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // handle more button on task cards
  const handleMoreButton = (id) => {
    setIsMenuOpen(!isMenuOpen);
    console.log(id);
  };
  const onDelete = async (id) => {
  
    try {
      const result = await deleteTaskApi(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isMenuOpen && (
        <div className="absolute right-5 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          {/* Edit Option */}
          <button
            type="button"
            onClick={() => {
              onEdit();
            }}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          {/* Delete Option */}
          <button
            type="button"
            onClick={() => {
              onDelete(taskId);
            }}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      )}
      <button
        onClick={() => handleMoreButton(taskId)}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 "
      >
        <MoreVertical className="w-4 h-4" />
      </button>
    </>
  );
}
