import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getStaffMembers } from 'apiSdk/staff-members';
import { StaffMembersInterface } from 'interfaces/staff-members';
import { Error } from 'components/error';

function StaffMembersListPage() {
  const { data, error, isLoading } = useSWR<StaffMembersInterface[]>(() => true, getStaffMembers);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Staff Members
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>User Id</Th>
                  <Th>Restaurant Id</Th>
                  <Th>Work Schedule</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.user_id}</Td>
                    <Td>{record.restaurant_id}</Td>
                    <Td>{record.work_schedule}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default StaffMembersListPage;
