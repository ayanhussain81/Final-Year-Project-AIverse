import React from 'react';

const TogglePlan = ({ toggleBillingPlan, billPlan }) => {
  return (
    <div className="flex items-center justify-center mt-10 space-x-4">
      <span className="text-base font-medium">Bill Monthly</span>
      <button
        className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleBillingPlan}
      >
        <div className="w-16 h-8 transition bg-primary rounded-full shadow-md outline-none"></div>
        <div
          className={`absolute inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform bg-neutral-100 rounded-full shadow-sm top-1 left-1 ${
            billPlan === 'annually' ? 'translate-x-8' : 'translate-x-0'
          }`}
        ></div>
      </button>
      <span className="text-base font-medium">Bill Annually</span>
    </div>
  );
};

export default TogglePlan;
