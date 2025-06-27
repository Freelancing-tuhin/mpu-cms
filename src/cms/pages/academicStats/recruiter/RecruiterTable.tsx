import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteRecruiter } from 'src/services/recruiter';
import EditRecruiterModal from './EditRecruiterModal';

const RecruiterTable = ({ recruiters, getRecruiters }: any) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (item: any) => {
    setEditData(item);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteRecruiter(id);
    getRecruiters();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Brief</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {recruiters.map((item: any) => (
              <Table.Row key={item._id}>
                <Table.Cell>
                  <img
                    src={item.featured_image}
                    alt="campus"
                    className="h-16 w-16 object-contain rounded"
                  />
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.brief}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" onClick={() => handleEdit(item)} color="gray">
                    <Icon icon="material-symbols:edit-document" height="19" />
                  </Button>
                  <Button
                    color="blue"
                    size="xs"
                    className="bg-red-500"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Icon icon="hugeicons:delete-03" height="19" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditRecruiterModal
        data={editData}
        isOpen={open}
        setIsOpen={setOpen}
        getRecruiters={getRecruiters}
      />
    </>
  );
};

export default RecruiterTable;
