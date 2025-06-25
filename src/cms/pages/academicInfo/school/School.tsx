import React, { useContext, useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import { IoMdAddCircleOutline } from 'react-icons/io';
import SchoolTable from './SchoolTable';

const dummySchoolData: any = [
  {
    _id: '1',
    order: 1,
    title: 'Patel College Of Science & Technology',
    brief: 'A leading school focused on academic excellence.',
    logo: 'https://mpu.ac.in/uploads/neeti-2024/PCST.png',
    link_url: 'https://greenvalley.edu',
  },
  {
    _id: '2',
    order: 2,
    title: ' Faculty of Medical and Paramedical Sciences',
    brief: 'Empowering students for a better tomorrow.',
    logo: 'https://mpu.ac.in/uploads/new_icons/drugstore.png',
    link_url: 'https://blueridgeacademy.edu',
  },
];

const School = () => {
  const BCrumb = [
    { to: '/', title: 'Academics' },
    { to: '/academic-campus-info', title: 'Academic Info' },
    { title: 'School' },
  ];

  const [schools, setSchools] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Using dummy data for now
    setSchools(dummySchoolData);
  }, []);

  const getSchools = (page = 1) => {
    // For dummy: just update page (future: add pagination logic)
    setSchools(dummySchoolData);
  };

  return (
    <div>
      <BreadcrumbComp title="School" items={BCrumb} />

      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <button className="bg-blue-500 flex items-center gap-1 text-white px-4 py-2.5 rounded-md hover:bg-blue-600 transition-all">
            <IoMdAddCircleOutline className="text-lg" size={20} />
            Add School
          </button>
        </div>

        <SchoolTable
          schools={schools}
          totalPages={totalPages}
          getSchools={getSchools}
          searchText={searchText}
        />
      </CardBox>
    </div>
  );
};

export default School;
