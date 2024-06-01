import { ID, Storage } from "appwrite";
import { appwriteClient } from ".";
import { toast } from "react-toastify";

class AppWriteStorage {
  storage;
  constructor() {
    this.storage = new Storage(appwriteClient);
  }

  async uploadFile(BUCKET_ID, FileObject) {
    try {
      let response = await this.storage.createFile(
        BUCKET_ID,
        ID.unique(),
        FileObject
      );
      // console.log(response);
      if (response) {
        const FileURL = await this.showFile(BUCKET_ID, response.$id);
        if (FileURL) return [response.$id, FileURL?.href];
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR in uploadFile():: ", error.response);
      toast.error(error.message);
    }
  }

  async showFile(BUCKET_ID, FILE_ID) {
    try {
      const response = await this.storage.getFileView(BUCKET_ID, FILE_ID);
      return response;
    } catch (error) {
      console.log("ERROR in showFile():: ", error.response);
      toast.error(error.message);
    }
  }

  async updateFile(BUCKET_ID, FILE_ID) {
    try {
      const response = await this.storage.deleteFile(BUCKET_ID, FILE_ID);
      if (response) toast.success("File updated Successfully😇");
    } catch (error) {
      console.log("ERROR in updateFile():: ", error.response);
      toast.error(error.message);
    }
  }

  async deleteFile(BUCKET_ID, FILE_ID) {
    try {
      const response = await this.storage.deleteFile(BUCKET_ID, FILE_ID);
      if (response) toast.success("File deleted Successfully😇");
    } catch (error) {
      console.log("ERROR in deleteFile():: ", error.response);
      toast.error(error.message);
    }
  }
}

export default AppWriteStorage;
