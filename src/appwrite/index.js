import { Client } from "appwrite";
import { ENDPOINT, PROJECT_ID } from "./appWriteSecrets";

const appwriteClient = new Client();

appwriteClient.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export { appwriteClient };
