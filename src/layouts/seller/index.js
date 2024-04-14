import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SellerDashboard from 'views/seller/dashboard';
import SellerUpload from 'views/seller/upload';
import Seller from 'views/seller';
import SellerPricing from 'views/Pricing/SellerPricing';
import SellerMainDashboard from 'views/seller/main';

const SellerLayout = () => {
  const seller = useSelector((state) => state.auth.seller);
  const isSellerEmailVerified = seller?.isEmailVerified;
  const isSubscriptionActive = seller?.isSubscriptionActive;

  if (!isSellerEmailVerified) {
    return (
      <Routes>
        <Route path="/" element={<Seller />} />
        <Route path="/*" element={<Navigate to="/seller" replace />} />
      </Routes>
    );
  }

  if (!isSubscriptionActive) {
    return (
      <Routes>
        <Route path="/" element={<SellerPricing />} />
        <Route path="/*" element={<Navigate to="/seller" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<SellerMainDashboard />} />
      <Route path="/models" element={<SellerDashboard />} />
      <Route path="/models/:id" element={<SellerUpload />} />
      <Route path="/*" element={<Navigate to="/seller/models" replace />} />
    </Routes>
  );
};

export default SellerLayout;
