import React from 'react';

const PlanCard = ({ name, description, price, noOfModelsAllowed, billingPeriod }) => {
  return (
    <section className="flex flex-col w-full max-w-sm p-12  space-y-6 bg-neutral-100 rounded-lg shadow-md">
      {/* Price */}
      <div className="flex-shrink-0">
        <span className="text-900 font-medium tracking-tight">{`$${price}`}</span>
        <span className="text-neutral-500">/{billingPeriod}</span>
      </div>

      {/* Plan details */}
      <div className="flex-shrink-0 pb-6 space-y-2 border-b">
        <h2 className="text-700 font-normal">{name}</h2>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-4">
        <li className="flex items-start">
          <svg
            className="w-6 h-6 text-accent-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-3 text-base font-medium">{noOfModelsAllowed} ML models can be hosted</span>
        </li>
      </ul>

      {/* Button */}
      <div className="flex-shrink-0 pt-4">
        <button
          className={`inline-flex items-center justify-center w-full max-w-xs px-4 py-2 transition-colors border rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            name === 'Basic'
              ? 'bg-primary-500 text-neutral-100 hover:bg-primary-700'
              : 'hover:bg-primary-500 hover:text-neutral-100'
          }`}
        >
          {`Get ${name}`}
        </button>
      </div>
    </section>
  );
};

export default PlanCard;
