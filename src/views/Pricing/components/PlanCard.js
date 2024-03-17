import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'services/axiosInstance';

const PlanCard = ({ userId, tokens, planId, name, description, price, noOfModelsAllowed, billingPeriod }) => {
  let cardColor = '';
  let buttonColor = '';
  let hoverColor = '';
  const navigate = useNavigate();

  switch (name.toLowerCase()) {
    case 'gold':
      cardColor = '#BF9B30';
      hoverColor = '#A67C00';
      break;
    case 'silver':
      cardColor = '#c0c0c0';
      hoverColor = '#a5a1a1';
      break;
    case 'basic':
      cardColor = '#bb8141';
      hoverColor = '#8b5a28';
      break;
    default:
      cardColor = '#FFFFFF';
      hoverColor = '#90CDF4';
  }
  const [isHovered, setIsHovered] = useState(false);

  const handleSubscription = async () => {
    try {
      const response = await axiosInstance.post('/seller/create-checkout-session', {
        userId: userId,
        planId: planId,
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      });
      if (response?.data?.url) {
        window.location.href = response?.data?.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      style={{ backgroundColor: cardColor }}
      className="flex flex-col w-full max-w-sm p-12 space-y-6 rounded-lg shadow-md"
    >
      {/* Price */}
      <div className="flex-shrink-0">
        <span className="text-900 font-medium tracking-tight">{`$${price}`}</span>
        <span>/{billingPeriod}</span>
      </div>

      {/* Plan details */}
      <div className="flex-shrink-0 pb-6 space-y-2 border-b">
        <h2 className="text-700 font-normal">{name}</h2>
        <p className="text-sm ">{description}</p>
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-4">
        <li className="flex items-start">
          <svg
            className="w-6 h-6 text-accent-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="rgba(0, 0, 0, 0.6)"
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
          style={{ backgroundColor: isHovered ? hoverColor : buttonColor }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => (userId ? handleSubscription() : navigate('/auth/signin?redirectTo=seller-pricing'))}
          className="inline-flex items-center justify-center w-full max-w-xs px-4 py-2 transition-colors border rounded-full text-neutral-100"
        >
          {`Get ${name}`}
        </button>
      </div>
    </section>
  );
};

export default PlanCard;
