import { IconButton, Modal } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const CentralModal = ({ children, modalTitle, isModalOpen, CloseModal }) => {
    return (
      <Modal open={isModalOpen} onclose={CloseModal}>
        <div className={styles.modalContainer}>
          <header className="sticky inset-x-0 top-0 flex justify-between items-center p-3 bg-[#ECFDF5] rounded-lg">
            <h1 className=" text-gray-700 text-xl font-semibold">
              {modalTitle}
            </h1>
            {CloseModal && (
              <IconButton onClick={CloseModal}>
                <CancelRoundedIcon className="text-xl text-red-500" />
              </IconButton>
            )}
          </header>
          <hr className="border-t border-[#86EFAC]" />
          {children}
        </div>
      </Modal>
    );
};

const styles = {
    modalContainer:
    "text-gray-800 flex flex-col absolute top-[50%] left-[50%] bg-white rounded-xl -translate-x-1/2 -translate-y-1/2 drop-shadow-3xl",
};

export default CentralModal;
