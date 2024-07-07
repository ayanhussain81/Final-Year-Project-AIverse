import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SellerDashboard from 'views/seller/dashboard';
import SellerUpload from 'views/seller/upload';
import Seller from 'views/seller';
import SellerPricing from 'views/Pricing/SellerPricing';
import SellerMainDashboard from 'views/seller/main';
import Header from 'layouts/sellerHeader';

import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import { sellerRoutes } from 'routes';
import { useHeader } from 'contexts/HeaderContext';
import SellerCustomers from 'views/customers';
import PaymentFailed from 'views/seller/billingFailed';

const SellerLayout = () => {
  const seller = useSelector((state) => state.auth.seller);
  const isSellerEmailVerified = seller?.isEmailVerified;
  const isSubscriptionActive = seller?.isSubscriptionActive;
  const cancellationReason = seller?.cancellation_reason ?? null;
  const { headerTitle, handleModalShow } = useHeader();

  if (!isSellerEmailVerified) {
    return (
      <Routes>
        <Route path="/" element={<Seller />} />
        <Route path="/*" element={<Navigate to="/seller" replace />} />
      </Routes>
    );
  }

  if (
    (!isSubscriptionActive && !cancellationReason) ||
    (!isSubscriptionActive && cancellationReason && cancellationReason === 'cancellation_requested')
  ) {
    return (
      <Routes>
        <Route path="/" element={<SellerPricing />} />
        <Route path="/*" element={<Navigate to="/seller" replace />} />
      </Routes>
    );
  }

  if (
    (!isSubscriptionActive && !cancellationReason) ||
    (!isSubscriptionActive && cancellationReason && cancellationReason === 'payment_failed')
  ) {
    return (
      <Routes>
        <Route path="/" element={<PaymentFailed />} />
        <Route path="/*" element={<Navigate to="/seller" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Flex width="100vw">
        <Sidebar routes={sellerRoutes} isSeller={true} />
        <Box flex="1" width="100%">
          <Header name={headerTitle} handleShow={handleModalShow} />
          <Routes>
            <Route path="/" element={<SellerMainDashboard />} />
            <Route path="/models" element={<SellerDashboard />} />
            <Route path="/models/:id" element={<SellerUpload />} />
            <Route path="/customers" element={<SellerCustomers />} />
            <Route path="*" element={<Navigate to="/seller/" replace />} />
          </Routes>
        </Box>
      </Flex>
    </>
  );
};

export default SellerLayout;
