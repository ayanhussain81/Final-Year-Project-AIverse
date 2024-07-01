/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
// Assets
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import React, { useEffect, useState } from 'react';
import { MdAttachMoney, MdBarChart } from 'react-icons/md';
import { FaMoneyBillAlt, FaUser } from 'react-icons/fa';
import { BsServer } from 'react-icons/bs';
import { PiClockCountdownBold, PiCreditCardFill } from 'react-icons/pi';

import AnnualRevenue from './components/AnnualRevenue.jsx';
import AnnualModelRevenue from './components/AnnualModelsRevenue.jsx';
import Sidebar from 'components/sidebar/Sidebar.js';
import { sellerRoutes } from 'routes.js';
import Header from 'layouts/sellerHeader/index.js';
import { useHeader } from 'contexts/HeaderContext.js';
import axiosInstance from 'services/axiosInstance.js';
import { useSelector } from 'react-redux';
import { chartOptions } from 'variables/charts.js';

export default function SellerMainDashboard() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setHeaderTitle } = useHeader();
  const { seller, tokens } = useSelector((state) => state.auth);

  useEffect(() => {
    setHeaderTitle('Main Dashboard');
    return () => {
      setHeaderTitle('');
    };
  }, [setHeaderTitle]);

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get(`/seller/stats/${seller?._id}`, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      });
      setStats(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const fetchAnnualRevenue = async () => {
    try {
      const response = await axiosInstance.get(`/seller/revenue/${seller?._id}`, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      });
      setRevenue(response.data?.data);
    } catch (error) {
      setError(error);
    }
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      await fetchStats();
      await fetchAnnualRevenue();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [seller?.id]);

  return (
    <>
      <Box p="4rem">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap="20px" mb="20px">
          <MiniStatistics
            startContent={
              <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />} />
            }
            name="Total Earnings"
            value={stats?.totalEarnings - stats?.platFormFee || 0}
            loading={loading}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />}
              />
            }
            name="Total Withdrawn"
            value={stats?.totalWithdrawn || 0}
            loading={loading}
          />
          <MiniStatistics
            startContent={
              <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="25px" h="25px" as={FaUser} color={brandColor} />} />
            }
            name="Total Customers"
            value={stats?.customerCount || 0}
            growth="+10%"
            loading={loading}
          />

          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={<Icon w="28px" h="28px" as={PiCreditCardFill} color={brandColor} />}
              />
            }
            name="Subscription Type"
            value={stats?.planType || 'N/A'}
            loading={loading}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={<Icon w="28px" h="28px" as={FaMoneyBillAlt} color={brandColor} />}
              />
            }
            name="Platform Fee"
            value={stats?.platformFee || 0}
            loading={loading}
          />
          <MiniStatistics
            startContent={
              <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="28px" h="28px" as={BsServer} color={brandColor} />} />
            }
            name="Models Hosted"
            value={stats?.modelCount || 0}
            loading={loading}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="10px" mb="20px">
          <AnnualRevenue
            loading={loading}
            chartData={[{ name: 'Earnings', data: revenue?.perMonthRevenueList || [] }]}
            chartOptions={chartOptions(revenue?.revenueMonths || [])}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="10px" mb="20px">
          <AnnualModelRevenue />
        </SimpleGrid>
      </Box>
    </>
  );
}
