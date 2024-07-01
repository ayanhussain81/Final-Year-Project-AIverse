import { Box } from '@chakra-ui/react';
import CustomerTable from 'components/Tables/CustomerTable';
import { useHeader } from 'contexts/HeaderContext';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from 'services/axiosInstance';

import { customerColumns } from 'views/admin/rtl/variables/columnsData';
const SellerCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setHeaderTitle } = useHeader();
  const { seller, tokens } = useSelector((state) => state.auth);

  useEffect(() => {
    setHeaderTitle('All Customers');
    return () => {
      setHeaderTitle('');
    };
  }, [setHeaderTitle]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get(`/seller/all-customers/${seller._id}`, {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        });
        setCustomers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (seller?._id) {
      fetchCustomers();
    }
  }, [seller?.id, tokens]);

  return (
    <Box py="2rem">
      <CustomerTable tableData={customers} loading={loading} columnsData={customerColumns} />;
    </Box>
  );
};

export default SellerCustomers;
