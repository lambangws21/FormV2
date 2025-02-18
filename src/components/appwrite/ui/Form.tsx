"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { OperationSchedule } from '@/types/operationSchedule';

interface Props {
  onSubmit: (formData: Omit<OperationSchedule, '$id' | '$collection' | '$permissions'>) => void;
}

const Form: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<OperationSchedule, '$id' | '$collection' | '$permissions'>>({
    kamarOperasi: '',
    nomorRekamMedis: '',
    namaPasien: '',
    jaminan: '',
    tindakanOperasi: '',
    jenisAnestesi: '',
    waktuOperasi: '',
    dokterOperator: '',
    perawatPelaksana: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="kamarOperasi" value={formData.kamarOperasi} onChange={handleChange} placeholder="Kamar Operasi" />
      <Input name="nomorRekamMedis" value={formData.nomorRekamMedis} onChange={handleChange} placeholder="Nomor Rekam Medis" />
      <Input name="namaPasien" value={formData.namaPasien} onChange={handleChange} placeholder="Nama Pasien" />
      <Input name="jaminan" value={formData.jaminan} onChange={handleChange} placeholder="Jaminan" />
      <Input name="tindakanOperasi" value={formData.tindakanOperasi} onChange={handleChange} placeholder="Tindakan Operasi" />
      <Input name="jenisAnestesi" value={formData.jenisAnestesi} onChange={handleChange} placeholder="Jenis Anestesi" />
      <Input name="waktuOperasi" value={formData.waktuOperasi} onChange={handleChange} placeholder="Waktu Operasi" />
      <Input name="dokterOperator" value={formData.dokterOperator} onChange={handleChange} placeholder="Dokter Operator" />
      <Input name="perawatPelaksana" value={formData.perawatPelaksana} onChange={handleChange} placeholder="Perawat Pelaksana" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
