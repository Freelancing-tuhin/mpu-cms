import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deletePlacement } from 'src/services/placement';
import EditPlacementModal from './EditPlacementModal';

const PlacementTable = ({ placements, getPlacements, loading }: any) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleEdit = (item: any) => {
    setEditData(item);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deletePlacement(id);
    getPlacements();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Order</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Brief</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {placements.map((item: any) => (
              <Table.Row key={item._id}>
                <Table.Cell>{item.order}</Table.Cell>
                <Table.Cell>
                  <img
                    src={item.featured_image}
                    alt={item.title}
                    className="h-16 w-16 object-contain rounded"
                  />
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.brief}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" onClick={() => handleEdit(item)} color="gray">
                    <Icon icon="material-symbols:edit-document" height={19} />
                  </Button>
                  <Button size="xs" onClick={() => handleDelete(item._id)} color="failure">
                    <Icon icon="hugeicons:delete-03" height={19} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditPlacementModal
        data={editData}
        isOpen={open}
        setIsOpen={setOpen}
        getPlacements={getPlacements}
      />
    </>
  );
};

export default PlacementTable;
