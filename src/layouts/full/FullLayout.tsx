import { FC, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Customizer } from './shared/customizer/Customizer';
import { CustomizerContext } from '../../context/CustomizerContext';
import Sidebar from './vertical/sidebar/Sidebar';
import Header from './vertical/header/Header';
import PartialTransitioning from 'src/components/headless-ui/Transition/PartialTransitioning';
import ScrollToTop from 'src/components/shared/ScrollToTop';
import { AuthContext } from 'src/context/authContext/AuthContext';

const FullLayout: FC = () => {
  const { activeLayout, isLayout } = useContext(CustomizerContext);
  const { user }: any = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        <div className="page-wrapper flex w-full  ">
          {/* Header/sidebar */}

          {activeLayout == 'vertical' ? <Sidebar /> : null}
          <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
            {/* Top Header  */}
            {activeLayout == 'horizontal' ? (
              <Header layoutType="horizontal" />
            ) : (
              <Header layoutType="vertical" />
            )}

            <div
              className={`bg-lightgray dark:bg-dark  h-full ${
                activeLayout != 'horizontal' ? 'rounded-bb' : 'rounded-none'
              } `}
            >
              {/* Body Content  */}
              <div
                className={` ${
                  isLayout == 'full' ? 'w-full py-30 md:px-30 px-5' : 'container mx-auto  py-30'
                } ${activeLayout == 'horizontal' ? 'xl:mt-3' : ''}
              `}
              >
                <ScrollToTop>
                  <Outlet />
                </ScrollToTop>
              </div>
              <Customizer />
              <PartialTransitioning />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullLayout;
