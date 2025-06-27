import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteTestimonial } from 'src/services/testimonial';
import EditTestimonialModal from './EditTestimonialModal';

const TestimonialTable = ({ items, refresh }: any) => {
  const [editItem, setEditItem] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const openEdit = (item: any) => {
    setEditItem(item);
    setOpen(true);
  };

  const doDelete = async (id: string) => {
    await deleteTestimonial(id);
    refresh();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Order</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Sender</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {items.map((i: any) => (
              <Table.Row key={i._id}>
                <Table.Cell>{i.order}</Table.Cell>
                <Table.Cell>
                  <img
                    src={i.image_icon}
                    alt="campus"
                    className="h-16 w-16 object-contain rounded"
                  />
                </Table.Cell>
                <Table.Cell>{i.type}</Table.Cell>
                <Table.Cell>{i.title}</Table.Cell>
                <Table.Cell>{i.sender_name}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" onClick={() => openEdit(i)} color="gray">
                    <Icon icon="material-symbols:edit-document" height={19} />
                  </Button>
                  <Button size="xs" onClick={() => doDelete(i._id)} color="failure">
                    <Icon icon="hugeicons:delete-03" height={19} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditTestimonialModal data={editItem} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
};

export default TestimonialTable;
