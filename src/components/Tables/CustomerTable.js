import React, { useMemo, useState } from 'react';
import { Box, Collapse, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';

// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

export default function CustomerTable(props) {
  const { columnsData, tableData } = props;

  const [expandedRows, setExpandedRows] = useState({});

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const background = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');

  const toggleRow = (rowIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  return (
    <Card mx="24px" direction="column" w="90%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Customers Table
        </Text>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex justify="space-between" align="center" fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    {column.render('Header')}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            const hasSubscribedModels = row.original.subscribedModels && row.original.subscribedModels.length > 0;
            return (
              <React.Fragment key={index}>
                <Tr
                  {...row.getRowProps()}
                  _hover={{ background: 'aliceblue' }}
                  onClick={() => hasSubscribedModels && toggleRow(row.id)}
                  style={{ cursor: hasSubscribedModels ? 'pointer' : 'default' }}
                >
                  {row.cells.map((cell, index) => {
                    let data = '';
                    if (cell.column.Header === 'NAME') {
                      data = (
                        <Flex align="center">
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === 'EMAIL') {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === 'ROLE') {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: '14px' }}
                        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                        borderColor="transparent"
                      >
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
                {hasSubscribedModels && (
                  <Tr>
                    <Td colSpan={5} p={0} borderColor="transparent">
                      <Collapse in={expandedRows[row.id]}>
                        <Box py="2rem" px="4rem">
                          <Flex px="25px" justify="space-between" mb="20px" align="center">
                            <Text color={textColor} fontSize="16px" fontWeight="700" lineHeight="100%">
                              Subscribed Models
                            </Text>
                          </Flex>
                          <Table variant="simple" color="gray.500" mb="24px">
                            <Thead>
                              <Tr>
                                <Th borderColor={borderColor}>Model Name</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {row.original.subscribedModels.map((model, idx) => (
                                <Tr key={idx}>
                                  <Td borderColor={borderColor}>{model.modelName}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </Box>
                      </Collapse>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
