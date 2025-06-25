import { useState } from 'react';
import CardBox from '../../shared/CardBox';
import { Button, Select, Table, Tooltip } from 'flowbite-react';
import { Icon } from '@iconify/react';
import React from 'react';
import SimpleBar from 'simplebar-react';

const RevenueByProduct = ({ usersList }: any) => {
  const [activeTab, setActiveTab] = useState('All');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <CardBox className="pb-3">
        <div className="sm:flex justify-between items-center">
          <h5 className="card-title">Users List</h5>
        </div>
        {/* Tabs */}
        <div className="overflow-x-auto">
          <SimpleBar>
            <div className="flex gap-4">
              {['All', 'Male', 'Female'].map((tab) => (
                <div
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`py-3 px-6 rounded-tw cursor-pointer text-dark text-sm font-semibold text-center flex gap-2 items-center bg-muted dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary ${
                    activeTab === tab
                      ? 'text-white bg-primary dark:bg-primary hover:bg-primaryemphasis dark:hover:bg-primaryemphasis'
                      : 'dark:text-white'
                  }`}
                >
                  <Icon
                    icon={
                      tab === 'All'
                        ? 'solar:widget-linear'
                        : tab === 'Male'
                        ? 'solar:smartphone-line-duotone'
                        : 'solar:folder-open-outline'
                    }
                    className={`${activeTab === tab ? 'opacity-100' : 'opacity-50'}`}
                    height={16}
                  />
                  {tab}
                </div>
              ))}
            </div>
          </SimpleBar>
        </div>

        {/* Tabs Content */}
        <div className="overflow-x-auto">
          <Table>
            <Table.Head className="border-b border-bordergray dark:border-darkborder">
              <Table.HeadCell className="py-2 px-3 ps-0 text-ld font-normal">Name</Table.HeadCell>
              <Table.HeadCell className="text-ld font-normal">Transaction Id</Table.HeadCell>
              <Table.HeadCell className="text-ld font-normal">Amount Paid</Table.HeadCell>
              <Table.HeadCell className="text-ld font-normal">Booking Status</Table.HeadCell>
              <Table.HeadCell className="text-ld font-normal text-center">Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-bordergray dark:divide-darkborder">
              {usersList &&
                usersList
                  .filter(
                    (user: any) =>
                      activeTab === 'All' ||
                      user.userDetails.gender.toUpperCase() === activeTab.toUpperCase(),
                  )
                  .map((user: any, index: any) => (
                    <Table.Row key={index}>
                      <Table.Cell className="whitespace-nowrap ps-0">
                        <p className="text-sm dark:text-white">{user.userDetails.full_name}</p>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap flex items-center gap-2 pt-5 ">
                        <div className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[10ch] after:content-['...']">
                          {user.transactionId}
                        </div>

                        <Tooltip content="Copy" placement="top">
                          <Icon
                            icon="solar:copy-bold"
                            className="cursor-pointer text-gray-500 hover:text-gray-700"
                            height={16}
                            onClick={() => copyToClipboard(user.transactionId)}
                          />
                        </Tooltip>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <p className="text-ld">₹{user.amountPaid}</p>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <Select className="w-32 text-sm">
                          <option value="Pending">Pending</option>
                          <option value="Success">Success</option>
                          <option value="Canceled">Canceled</option>
                        </Select>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap flex items-center gap-2 justify-center">
                        <Button size="xs" color="failure">
                          Refund
                        </Button>
                        <Button size="xs">Contact</Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
            </Table.Body>
          </Table>
        </div>
      </CardBox>
    </>
  );
};

export default RevenueByProduct;
