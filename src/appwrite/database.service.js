import { appwriteClient } from ".";
import { Databases, ID, Query } from "appwrite";
import { toast } from "react-toastify";

class AppWriteDB {
    db;
    constructor() {
        this.db = new Databases(appwriteClient);
    }

    async createDoc(DB_ID, COLLECTION_ID, PAYLOAD) {
        try {
        const response = await this.db.createDocument(
            DB_ID,
            COLLECTION_ID,
            ID.unique(),
            PAYLOAD
        );
        console.log(response);
        return response;
        } catch (error) {
        console.log("ERROR in getAllDocs():: ", error.response);
        toast.error(error.message);
        }
    }

    async getAllDocs(DB_ID, COLLECTION_ID) {
        try {
        const response = await this.db.listDocuments(DB_ID, COLLECTION_ID);
        console.log(response);
        if (response.total > 0) return response.documents;
        } catch (error) {
        console.log("ERROR in getAllDocs():: ", error.response);
        toast.error(error.message);
        }
    }

    async getDoc(DB_ID, COLLECTION_ID, DOC_ID) {
        try {
        const response = await this.db.getDocument(DB_ID, COLLECTION_ID, DOC_ID);
        console.log(response);
        return response;
        } catch (error) {
        console.log("ERROR in getDoc():: ", error.response);
        toast.error(error.message);
        }
    }

    async updateDoc(DB_ID, COLLECTION_ID, DOC_ID, PAYLOAD) {
        try {
        const response = await this.db.updateDocument(
            DB_ID,
            COLLECTION_ID,
            DOC_ID,
            PAYLOAD
        );
        console.log(response);
        return response;
        } catch (error) {
        console.log("ERROR in updateDoc():: ", error.response);
        toast.error(error.message);
        }
    }

    async deleteDoc(DB_ID, COLLECTION_ID, DOC_ID, PAYLOAD) {
        try {
        const response = await this.db.deleteDocument(
            DB_ID,
            COLLECTION_ID,
            DOC_ID,
            PAYLOAD
        );
        console.log(response);
        return response;
        } catch (error) {
        console.log("ERROR in deleteDoc():: ", error.response);
        toast.error(error.message);
        }
    }

    async getDocsByEqualQuery(DB_ID, COLLECTION_ID, PAYLOAD) {
        try {
        const { key, value } = PAYLOAD;
        const response = await this.db.listDocuments(DB_ID, COLLECTION_ID, [
            Query.equal(key, value),
        ]);
        console.log(response);
        return response.documents;
        } catch (error) {
        console.log("ERROR in getDocsByEqualQuery():: ", error.response);
        toast.error(error.message);
        }
    }
}

export default AppWriteDB;
