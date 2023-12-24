// Chakra imports
import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import Card from "components/card/Card.js";
  // Custom components
  import BarChart from "components/charts/BarChart";
  import React from "react";
  import {
    barChartDataConsumption,
    barChartOptionsConsumption,
    groupedbarchartDataTotalSpent,
    groupedbarchartOptionsTotalSpent
  } from "variables/charts";
  import { MdBarChart } from "react-icons/md";
  import LineChart from "components/charts/LineChart";
import GroupedBar from "components/charts/GroupedBarChart";
  
  export default function AnnualModelRevenue(props) {
    const { ...rest } = props;
  
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
      { bg: "secondaryGray.400" },
      { bg: "whiteAlpha.50" }
    );
    const bgFocus = useColorModeValue(
      { bg: "secondaryGray.300" },
      { bg: "whiteAlpha.100" }
    );
    return (
      <Card align='center' direction='column' w='100%' {...rest}>
        <Flex align='center' w='100%' px='15px' py='10px'>
          <Text
            me='auto'
            color={textColor}
            fontSize='xl'
            fontWeight='700'
            lineHeight='100%'>
            Annual Model Revenue
          </Text>
        </Flex>
  
        <Box h='240px' mt='auto'>
          {/* <LineChart
            chartData={barChartDataConsumption}
            chartOptions={barChartOptionsConsumption}
          /> */}
          <GroupedBar
            chartData={groupedbarchartDataTotalSpent}
            chartOptions={groupedbarchartOptionsTotalSpent}
          />
        </Box>
      </Card>
    );
  }
  