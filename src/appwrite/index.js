import { Client } from "appwrite";

const appwriteClient = new Client();

appwriteClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65a22a9e2eaa88f35d94");
export { appwriteClient };
