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
import { Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue, useDisclosure } from '@chakra-ui/react';
// Assets
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import React, { useEffect } from 'react';
import { MdAttachMoney, MdBarChart } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { BsServer } from 'react-icons/bs';
import { PiClockCountdownBold, PiCreditCardFill } from 'react-icons/pi';

import AnnualRevenue from './components/AnnualRevenue.jsx';
import AnnualModelRevenue from './components/AnnualModelsRevenue.jsx';
import Sidebar from 'components/sidebar/Sidebar.js';
import { sellerRoutes } from 'routes.js';
import Header from 'layouts/sellerHeader/index.js';
import { useHeader } from 'contexts/HeaderContext.js';

export default function SellerMainDashboard() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setHeaderTitle } = useHeader();

  useEffect(() => {
    setHeaderTitle('Main Dashboard');
    return () => {
      setHeaderTitle('');
    };
  }, [setHeaderTitle]);

  return (
    <>
      <Box p="4rem">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap="20px" mb="20px">
          <MiniStatistics
            startContent={
              <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />} />
            }
            name="Total Earnings"
            value="$350.4"
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
            name={`This Month's Earning`}
            growth="+23%"
            value="$642.39"
          />
          <MiniStatistics
            startContent={
              <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="25px" h="25px" as={FaUser} color={brandColor} />} />
            }
            name="Total Customers"
            value="35"
            growth="+10%"
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
            value="Platinum"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={<Icon w="28px" h="28px" as={PiClockCountdownBold} color={brandColor} />}
              />
            }
            name="Days Left"
            value="15"
          />
          <MiniStatistics
            startContent={
              <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="28px" h="28px" as={BsServer} color={brandColor} />} />
            }
            name="Models Hosted"
            value="7"
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="10px" mb="20px">
          <AnnualRevenue />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="10px" mb="20px">
          <AnnualModelRevenue />
        </SimpleGrid>
      </Box>
    </>
  );
}
