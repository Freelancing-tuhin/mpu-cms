import { Button, Table } from 'flowbite-react';
import { useState } from 'react';
import { deleteFactFigure } from 'src/services/factFigure';
import EditFactFigureModal from './EditFactFigureModal';
import { Icon } from '@iconify/react/dist/iconify.js';

const FactFigureTable = ({ factFigures, getFactFigures }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (item: any) => {
    setEditData(item);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    await deleteFactFigure(id);
    getFactFigures();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table>
          <Table.Head>
            <Table.HeadCell>Priority</Table.HeadCell>
            <Table.HeadCell>Caption</Table.HeadCell>
            <Table.HeadCell>Figure</Table.HeadCell>
            <Table.HeadCell>Icon</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {factFigures.map((item: any) => (
              <Table.Row key={item._id}>
                <Table.Cell>{item.priority}</Table.Cell>
                <Table.Cell>{item.caption}</Table.Cell>
                <Table.Cell>{item.figure}</Table.Cell>
                <Table.Cell>
                  <i className={item.icon}></i>
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" onClick={() => handleEdit(item)} color="gray">
                    Edit
                  </Button>
                  <Button size="xs" onClick={() => handleDelete(item._id)} color="failure">
                    <Icon icon="hugeicons:delete-03" height="19" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditFactFigureModal
        data={editData}
        isOpen={openModal}
        setIsOpen={setOpenModal}
        getFactFigures={getFactFigures}
      />
    </>
  );
};

export default FactFigureTable;
