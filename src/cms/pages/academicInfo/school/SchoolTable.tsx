import { Icon } from '@iconify/react/dist/iconify.js';
import { Table, Pagination, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const SchoolTable = ({ schools, totalPages, getSchools, searchText }: any) => {
  const [, setEditedSchool] = useState();
  const [, setOpenEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const OpenModal = (data: any) => {
    setOpenEditModal(true);
    setEditedSchool(data);
  };

  //   const handleDeleteSchool = async () => {
  //     try {
  //       //   await deleteSchool(schoolId);
  //       getSchools(currentPage);
  //     } catch (error) {
  //       console.error('Failed to delete school:', error);
  //     }
  //   };

  useEffect(() => {
    getSchools(currentPage);
  }, [currentPage, searchText]);

  return (
    <>
      <div className="border rounded-md border-ld overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Order</Table.HeadCell>
            <Table.HeadCell>Logo</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Brief</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {schools.map((item: any) => (
              <Table.Row key={item?._id}>
                <Table.Cell>{item?.order ?? '-'}</Table.Cell>

                <Table.Cell>
                  <img
                    src={item?.logo || '/placeholder.png'}
                    alt="Logo"
                    className="h-14 w-14 rounded object-contain"
                  />
                </Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {item?.title || '-'}
                </Table.Cell>
                <Table.Cell className="max-w-xs truncate">{item?.brief || '-'}</Table.Cell>

                <Table.Cell className="flex gap-2 items-center">
                  <Link to={item?.link_url || '#'} target="_blank">
                    <Button color="blue" size="xs" className="bg-blue-500">
                      <Icon icon="mdi:link-variant" height="18" />
                    </Button>
                  </Link>
                  <Button
                    color="blue"
                    size="xs"
                    className="bg-gray-500"
                    onClick={() => OpenModal(item)}
                  >
                    <Icon icon="material-symbols:edit-document" height="18" />
                  </Button>
                  <Button
                    color="blue"
                    size="xs"
                    className="bg-red-500"
                    // onClick={() => handleDeleteSchool(item._id)}
                  >
                    <Icon icon="hugeicons:delete-03" height="19" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="flex justify-center mb-4 mt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* <EditSchoolModal
        schoolData={editedSchool}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        getSchools={() => getSchools(currentPage)}
      /> */}
    </>
  );
};

export default SchoolTable;
