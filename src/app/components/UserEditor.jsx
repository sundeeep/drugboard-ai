import AppWriteAuth from '@/appwrite/auth.service';
import AppWriteDB from '@/appwrite/database.service';
import AppWriteStorage from '@/appwrite/storage.service';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

const UserEditor = ({ CloseModal, currentUserData, setCurrentUserData }) => {
  const router = useRouter();
  const [userName, setUserName] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [resignation, setResignation] = useState(null);
  const [ProfileImagePreview, setProfileImagePreview] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);

  const saveUserDetails = async (event) => {
    event.preventDefault();
    const storage = new AppWriteStorage();
    const auth = new AppWriteAuth();
    try {
      const user = await auth.getCurrentUserSession();
      if (user) {
        const [ImageID, ImageURL] = await storage.uploadFile(
          "user-profile-images",
          profileImageFile
        );
        console.log("Image Details: ", ImageID, ImageURL);
        if (ImageID && ImageURL) {
          const prefs = {
            userName,
            displayName,
            resignation,
            profileImageURL: ImageURL,
            profileImageID: ImageID,
          };
          try {
            const user = await auth.updatePrefs(prefs);
            // router.push("/");
            // window.location.reload();
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
            if (user) {
              getUserData();
            }
            console.log(user);
          } catch (err) {
            await storage.deleteFile("user-profile-images", ImageID);
          }
          CloseModal();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const imageUploadEvent = (e) => {
    const logo = e.target.files[0];
    setProfileImagePreview(URL.createObjectURL(logo));
    setProfileImageFile(logo);
  };
  return (
    <form
      onSubmit={saveUserDetails}
      className="flex flex-col gap-4 p-4 items-center"
    >
      <div className={styles.textField}>
        <label htmlFor="userProfile" className={styles.imageUploadLabel}>
          {ProfileImagePreview ? (
            <img className={styles.imagePreview} src={ProfileImagePreview} />
          ) : (
            <div className={styles.imagePreviewFallback}>
              <img className={styles.imagePreview} src="/anonymous-user.png" />
            </div>
          )}
          <p className="text-gray-500 text-sm">Click here, to Upload!</p>
          <input
            className={styles.hiddenImageInput}
            id="userProfile"
            accept="image/*"
            type="file"
            onChange={imageUploadEvent}
          />
        </label>
      </div>

      <div className="flex flex-col items-stretch gap-3 w-[500px]">
        <TextField
          id="userName"
          label="User Name (unique)"
          placeholder="Enter Unique Name without spaces."
          fullWidth
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          variant="filled"
          color="secondary"
          required
        />

        <TextField
          id="Display Name"
          placeholder="Amar Prabhu, Akbar or Antony etc.,"
          label="Display Name"
          fullWidth
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          variant="filled"
          color="secondary"
          required
        />

        <TextField
          id="Resignation"
          label="Resignation"
          placeholder="MedChem Scientist, Biologist, Doctor..."
          fullWidth
          value={resignation}
          onChange={(event) => setResignation(event.target.value)}
          variant="filled"
          color="secondary"
          required
        />
      </div>
      <Button type="submit" variant="outlined" color="secondary">
        Save User Data
      </Button>
    </form>
  );
};
const styles = {
  form: "p-3 flex flex-col gap-5 w-[400px]",

  textField: "flex flex-col gap-2",
  label: "font-semibold text-[#C026D3] text-sm",
  inputField:
    "px-3 py-2 w-full rounded-lg outline-none dark:bg-gray-900 dark:focus:bg-gray-700 border dark:border-gray-600 border-gray-800 focus:border-[#C026D3] focus:bg-[#C026D3]/10 dark:focus:border-[#C026D3] font-semibold text-sm",
  helpIcon: "!text-sm",
  helperMessage:
    "flex items-center gap-1 text-xs dark:text-gray-500 font-semibold",

  footerButtons: "p-5 flex items-center justify-end gap-5",
  imageUploadLabel:
    "relative px-3 py-2 w-full rounded-lg outline-none border-dashed border-[#C026D3] border-2 font-semibold text-xl flex gap-2 cursor-pointer items-center justify-between",
  imagePreviewFallback:
    "h-[100px] w-[100px] object-cover rounded-full p-1 border-2 border-[#C026D3] text-gray-700/50  text-gray-700 flex items-center justify-center text-center text-sm",
  imagePreview: "h-[100px] w-[100px] object-cover rounded-full",
  labelText: "text-sm text-gray-800/60 dark:text-white/60",
  hiddenImageInput: "hidden absolute inset-x-0 inset-y-0",
};

export default UserEditor