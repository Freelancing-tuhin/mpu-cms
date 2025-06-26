import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deletePressRelease } from 'src/services/pressRelease';
import EditPressReleaseModal from './EditPressReleaseModal';

const PressReleaseTable = ({ releases, refresh, loading }: any) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onEdit = (r: any) => {
    setEditData(r);
    setOpen(true);
  };
  const onDelete = async (id: string) => {
    await deletePressRelease(id);
    refresh();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Document</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {releases.map((r: any) => (
              <Table.Row key={r._id}>
                <Table.Cell>{r.date?.slice(0, 10)}</Table.Cell>
                <Table.Cell>{r.title}</Table.Cell>
                <Table.Cell>
                  {r.scanned_jpg && (
                    <a href={r.scanned_jpg} target="_blank" rel="noopener noreferrer">
                      <Icon icon="mdi:file-pdf-box" width={24} />
                    </a>
                  )}
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" color="gray" onClick={() => onEdit(r)}>
                    <Icon icon="material-symbols:edit-document" height={19} />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(r._id!)}>
                    <Icon icon="hugeicons:delete-03" height={19} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditPressReleaseModal data={editData} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
};

export default PressReleaseTable;
