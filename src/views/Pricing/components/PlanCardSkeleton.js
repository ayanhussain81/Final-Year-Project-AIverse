import React from 'react';

const PlanCardSkeleton = () => {
  return (
    <section className="flex flex-col w-full max-w-sm p-12 px-16 space-y-6 bg-neutral-100 rounded-lg shadow-md animate-pulse">
      {/* Price */}
      <div className="flex-shrink-0">
        <div className="w-20 h-16 bg-neutral-300 rounded"></div>
        {/* <div className="w-16 h-6 bg-neutral-300 mt-2 rounded"></div> */}
      </div>

      {/* Plan details */}
      <div className="flex-shrink-0 pb-6 space-y-2 border-b">
        <div className="w-24 h-4 bg-neutral-300 rounded"></div>
        <div className="w-32 h-3 bg-neutral-300 rounded"></div>
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-4">
        <li className="flex items-center">
          <div className="w-6 h-6 bg-neutral-300 rounded-full"></div>
          <div className="ml-3 text-base font-medium">
            <div className="w-32 h-4 bg-neutral-300 rounded"></div>
          </div>
        </li>
      </ul>

      {/* Button */}
      <div className="flex-shrink-0 pt-4">
        <button className="w-full max-w-xs px-4 py-2 transition-colors border rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-neutral-300 text-neutral-300">
          Loading...
        </button>
      </div>
    </section>
  );
};

export default PlanCardSkeleton;
