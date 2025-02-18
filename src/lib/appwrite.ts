import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('65478dbf1c08cb8ef612'); // Your project ID

const databases = new Databases(client);

export { client, databases };
