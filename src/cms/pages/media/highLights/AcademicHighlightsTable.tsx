import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteAcademicHighlight } from 'src/services/academicHighlights';
import EditAcademicHighlightModal from './EditAcademicHighlightModal';

export default function AcademicHighlightsTable({ items, refresh, loading }: any) {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const onEdit = (i: any) => {
    setEditData(i);
    setOpen(true);
  };
  const onDelete = async (id: string) => {
    await deleteAcademicHighlight(id);
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
                      alt=""
                      className="h-16 w-16 object-contain rounded"
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={i.link_url}
                    className="text-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </a>
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" color="gray" onClick={() => onEdit(i)}>
                    <Icon icon="material-symbols:edit-document" />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(i._id)}>
                    <Icon icon="hugeicons:delete-03" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <EditAcademicHighlightModal
        data={editData}
        isOpen={open}
        setIsOpen={setOpen}
        refresh={refresh}
      />
    </>
  );
}
