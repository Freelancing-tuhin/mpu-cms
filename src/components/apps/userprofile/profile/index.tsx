import { UserDataProvider } from 'src/context/UserDataContext';
import Introduction from './Introduction';
import ProfileBanner from './ProfileBanner';
// import DocumentUploader from './Documents';
import BankDetails from './BankDetails';
import FirmDetails from './FirmDetails';
import { ToastContainer } from 'react-toastify';

const UserProfileApp = () => {
  return (
    <>
      <UserDataProvider>
        <ToastContainer />
        <div className="grid grid-cols-12 gap-[30px]">
          {/* Banner */}
          <div className="col-span-12">
            <ProfileBanner />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="grid grid-cols-12 gap-[30px]">
              {/* Introduction */}
              <div className="col-span-12">
                <Introduction />
              </div>
              <div className="col-span-12">
                <FirmDetails />
              </div>
              {/* Photos */}
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <div className="col-span-12">
              <BankDetails />
            </div>
          </div>
        </div>
      </UserDataProvider>
    </>
  );
};

export default UserProfileApp;
