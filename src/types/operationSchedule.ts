export interface OperationSchedule {
    $id?: string;
    $collectionId?: string;
    $databaseId?: string;
    $createdAt?: string;
    $updatedAt?: string;
    $permissions?: string[];
    kamarOperasi: string;
    nomorRekamMedis: string;
    namaPasien: string;
    jaminan: string;
    tindakanOperasi: string;
    jenisAnestesi: string;
    waktuOperasi: string;
    dokterOperator: string;
    perawatPelaksana: string;
  }
  