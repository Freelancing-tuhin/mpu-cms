import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteDownload } from 'src/services/download';
import EditDownloadModal from './EditDownloadModal';
import { FaDownload } from 'react-icons/fa6';

export default function DownloadTable({ items, refresh }: any) {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onEdit = (i: any) => {
    setEditData(i);
    setOpen(true);
  };
  const onDelete = async (id: string) => {
    await deleteDownload(id);
    refresh();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Programme</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>PDF</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {items.map((i: any) => (
              <Table.Row key={i?._id}>
                <Table.Cell>{i?.type}</Table.Cell>
                <Table.Cell>{i?.programme}</Table.Cell>
                <Table.Cell>{i?.title}</Table.Cell>
                <Table.Cell>
                  {i?.pdf_file && (
                    <a href={i?.pdf_file} className="text-blue-600" target="_blank">
                      <Button size="xs" color="purple">
                        <FaDownload size={19} />
                      </Button>
                    </a>
                  )}
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" color="gray" onClick={() => onEdit(i)}>
                    <Icon icon="material-symbols:edit-document" height={19} />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(i._id)}>
                    <Icon icon="hugeicons:delete-03" height={19} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditDownloadModal data={editData} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
}
