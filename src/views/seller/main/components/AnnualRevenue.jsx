// Chakra imports
import { Box, Button, Flex, Icon, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card.js';
// Custom components
import BarChart from 'components/charts/BarChart';
import React from 'react';
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
  groupedbarchartDataTotalSpent,
  groupedbarchartOptionsTotalSpent,
} from 'variables/charts';
import { MdBarChart } from 'react-icons/md';
import LineChart from 'components/charts/LineChart';
import GroupedBar from 'components/charts/GroupedBarChart';

export default function AnnualRevenue(props) {
  const { chartData, chartOptions, loading, ...rest } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Annual Revenue
        </Text>
      </Flex>

      <Box
        h="240px"
        mt="auto"
        display={loading ? 'flex' : 'block'}
        alignItems={loading ? 'center' : undefined}
        justifyContent={loading ? 'center' : undefined}
      >
        {loading ? (
          <Spinner />
        ) : (
          <LineChart chartData={chartData} chartOptions={chartOptions || barChartOptionsConsumption} />
        )}
      </Box>
    </Card>
  );
}
