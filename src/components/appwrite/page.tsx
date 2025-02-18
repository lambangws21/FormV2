"use client"
import { useEffect, useState } from 'react';
import { databases } from '@/lib/appwrite';
import DataTable from '@/components/appwrite/ui/Table';
import Form from '@/components/appwrite/ui/Form';
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { OperationSchedule } from '@/types/operationSchedule';

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_COLLECTION_ID as string;

const Home: React.FC = () => {
  const [data, setData] = useState<OperationSchedule[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments<OperationSchedule>(DATABASE_ID, COLLECTION_ID);
        setData(response.documents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (formData: Omit<OperationSchedule, '$id' | '$collection' | '$permissions'>) => {
    try {
      const documentId = 'unique()';
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, documentId, formData);
      setShowForm(false);
      const response = await databases.listDocuments<OperationSchedule>(DATABASE_ID, COLLECTION_ID);
      setData(response.documents);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleUpdate = async (id: string, newData: Omit<OperationSchedule, '$id' | '$collection' | '$permissions'>) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, newData);
      const response = await databases.listDocuments<OperationSchedule>(DATABASE_ID, COLLECTION_ID);
      setData(response.documents);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      const response = await databases.listDocuments<OperationSchedule>(DATABASE_ID, COLLECTION_ID);
      setData(response.documents);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <Card>
        <h1>Jadwal Operasi</h1>
        <Button onClick={() => setShowForm(!showForm)}>Tambah Jadwal</Button>
        {showForm && <Form onSubmit={handleFormSubmit} />}
        <DataTable data={data} onUpdate={handleUpdate} onDelete={handleDelete} />
      </Card>
    </div>
  );
};

export default Home;