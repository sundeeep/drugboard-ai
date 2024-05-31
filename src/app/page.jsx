"use client";
import { StyledEngineProvider } from "@mui/material";
import Aside from "./components/Aside";
import MainSection from "./components/MainSection";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import AppWriteAuth from "@/appwrite/auth.service";
import { useRouter } from "next/navigation";
import CentralModal from "@/components/ui/modals/CentralModal";
import UserEditor from "./components/UserEditor";

const Home = () => {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    if (isModalOpen) setIsModalOpen(false);
    return;
  };
  
  useEffect(() => {
    const auth = new AppWriteAuth();
    const getUserData = async () => {
      try {
        const user = await auth.getCurrentUserSession();
        if (user) {
          const userData = await auth.getUser();
          setCurrentUserData(userData);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        }
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (currentUserData) {
      const { userName, displayName, resignation, profileImageURL, profileImageID } = currentUserData?.prefs;
      if (!userName || !displayName|| !resignation||!profileImageURL||!profileImageID) {
        if (!isModalOpen) setIsModalOpen(true);
      }
    }
    console.log(currentUserData?.prefs);
  }, [currentUserData]);
  
  return (
    <StyledEngineProvider injectFirst>
      <div className="h-screen w-screen bg-[#0F172A] lg:h-screen lg:w-screen flex items-start justify-between gap-3 p-3">
        <Aside
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
        <MainSection
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
        />
        {currentUserData && (
          <CentralModal
            modalTitle={`💐 Welcome! ${currentUserData?.name} 💐 `}
            isModalOpen={isModalOpen}
            CloseModal={closeModal}
          >
            <UserEditor
              CloseModal={closeModal}
              setCurrentUserData={setCurrentUserData}
              currentUserData={currentUserData}
            />
          </CentralModal>
        )}
      </div>

      <ToastContainer />
    </StyledEngineProvider>
  );
};

export default Home;
