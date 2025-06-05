import React from "react";

const TableSkeleton: React.FC = () => {
  return (
      <div className="w-full animate-slow-pulse">
        {Array(8)
            .fill(0)
            .map((_, index) => (
                <div
                    key={index}
                    className="flex items-center space-x-2 border-b border-gray-200 p-3 dark:border-gray-900"
                >
                  <div className="h-10 w-1/6 rounded bg-gray-300 dark:bg-gray-800"></div>
                  <div className="h-10 w-1/6 rounded bg-gray-300 dark:bg-gray-800"></div>
                  <div className="h-10 w-1/6 rounded bg-gray-300 dark:bg-gray-800"></div>
                  <div className="h-10 w-1/6 rounded bg-gray-300 dark:bg-gray-800"></div>
                  <div className="h-10 w-1/12 rounded bg-gray-300 dark:bg-gray-800"></div>
                  <div className="h-10 w-1/12 rounded bg-gray-300 dark:bg-gray-800"></div>
                  <div className="h-10 w-1/6 rounded bg-gray-300 dark:bg-gray-800"></div>
                  <div className="h-10 w-1/12 rounded bg-gray-300 dark:bg-gray-800"></div>
                </div>
            ))}
      </div>
  );
};

export default TableSkeleton;
