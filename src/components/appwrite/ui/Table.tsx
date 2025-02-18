import React from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { OperationSchedule } from '@/types/operationSchedule';

interface Props {
  data: OperationSchedule[];
  onUpdate: (id: string, newData: OperationSchedule) => void;
  onDelete: (id: string) => void;
}

const DataTable: React.FC<Props> = ({ data }) => (
  <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Kamar Operasi</TableCell>
          <TableCell>Nomor Rekam Medis</TableCell>
          <TableCell>Nama Pasien</TableCell>
          <TableCell>Jaminan</TableCell>
          <TableCell>Tindakan Operasi</TableCell>
          <TableCell>Jenis Anestesi</TableCell>
          <TableCell>Waktu Operasi</TableCell>
          <TableCell>Dokter Operator</TableCell>
          <TableCell>Perawat Pelaksana</TableCell>
          <TableCell>Aksi</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.kamarOperasi}</TableCell>
            <TableCell>{item.nomorRekamMedis}</TableCell>
            <TableCell>{item.namaPasien}</TableCell>
            <TableCell>{item.jaminan}</TableCell>
            <TableCell>{item.tindakanOperasi}</TableCell>
            <TableCell>{item.jenisAnestesi}</TableCell>
            <TableCell>{item.waktuOperasi}</TableCell>
            <TableCell>{item.dokterOperator}</TableCell>
            <TableCell>{item.perawatPelaksana}</TableCell>
            <TableCell>
              <button>Update</button>
              <button>Delete</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default DataTable;
