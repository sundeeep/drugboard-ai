import {Client, Users} from 'node-appwrite';
export default async ({ req, res, log, error }) => {
    const PROJECT_ID = "65a22a9e2eaa88f35d94";
    const SECRET_API_KEY =
      "18789458deb94107247372a318c879da2ef971e57b4ef17b000734b794140027da854b7e0225c142f9f5da8c6d1e023f173cf169efa6d740fd8642b37c1808b03a0ef7518f3b309378ac3e6c8e14a979be649b2a58072b11eae4dfd5852d8d9b0256dae22e4d7466663390e498babbdfdf0da95fb8f3c574a8fc13f9db022b6c";
    const client = new Client();
    client.setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
        .setKey(SECRET_API_KEY);
    const users = new Users(client);

    const result = await users.list();
    return res.json(result);
}