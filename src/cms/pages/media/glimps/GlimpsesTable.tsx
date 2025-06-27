import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteGlimpses } from 'src/services/glimpses';
import EditGlimpsesModal from './EditGlimpsesModal';

const GlimpsesTable = ({ items, refresh, loading }: any) => {
  const [editItem, setEditItem] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onEdit = (item: any) => {
    setEditItem(item);
    setOpen(true);
  };

  const onDelete = async (id: string) => {
    await deleteGlimpses(id);
    refresh();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Order</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Text</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Link</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {items.map((i: any) => (
              <Table.Row key={i._id}>
                <Table.Cell>{i.order}</Table.Cell>
                <Table.Cell>{i.title}</Table.Cell>
                <Table.Cell className="truncate max-w-xs">{i.text}</Table.Cell>
                <Table.Cell>
                  {i.featured_image && (
                    <img
                      src={i.featured_image}
                      alt={i.title}
                      className="h-16 w-16 object-contain rounded"
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={i.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Visit
                  </a>
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" color="gray" onClick={() => onEdit(i)}>
                    <Icon icon="material-symbols:edit-document" />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(i._id!)}>
                    <Icon icon="hugeicons:delete-03" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditGlimpsesModal data={editItem} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
};

export default GlimpsesTable;
