import React from 'react'

import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '../ui/table'

const TablePage = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>No Rekam Medis</TableHead>
                    <TableHead>Kamar Operasi</TableHead>
                    <TableHead>Nama Pasien</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Jenis Anestesi</TableHead>
                    <TableHead>Tindakan Operasi</TableHead>
                    <TableHead>Operator</TableHead>
                    <TableHead>Perawat</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )
}

export default TablePage;