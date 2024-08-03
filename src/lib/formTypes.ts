// lib/formTypes.ts
import { z } from "zod";

export const FormSchema = z.object({
  diagnosa: z.string().min(1, "Diagnosa is required"),
  kemajuanTindakan: z.string().optional(),
  baruMulai: z.boolean().optional(),
  pertengahan: z.boolean().optional(),
  hampirSelesai: z.boolean().optional(),
  tindakanLainnya: z.string().optional(),
  alergi: z.boolean().optional(),
  implant: z.boolean().optional(),
  penyakitKronik: z.boolean().optional(),
  penyakitLainnya: z.string().optional(),
  jenisInsisi: z.string().optional(),
  areaInsisi: z.string().optional(),
  kasa: z.boolean().optional(),
  khusus: z.boolean().optional(),
  tidakAdaHalKhusus: z.boolean().optional(),
  ruangPemulihan: z.boolean().optional(),
  icu: z.boolean().optional(),
  hcu: z.boolean().optional(),
  lainnya: z.string().optional(),
  namaObat: z.string().optional(),
  jumlahObat: z.string().optional(),
  cairan: z.string().optional(),
  hangat: z.boolean().optional(),
  dingin: z.boolean().optional(),
  suhuRuangan: z.boolean().optional(),
  adaCairan: z.string().optional(),
  tidakAdaInstrumenMeja: z.boolean().optional(),
  darah: z.string().optional(),
  urine: z.string().optional(),
  jumlahDarah: z.string().optional(),
  jenisDarah: z.string().optional(),
  letakDrain: z.string().optional(),
  jenisDrain: z.string().optional(),
  ukuranDrain: z.string().optional(),
  setInstrumen: z.string().optional(),
  lengkap: z.boolean().optional(),
  tidakLengkap: z.boolean().optional(),
  instrumenTambahan: z.string().optional(),
  instrumenSelanjutnya: z.string().optional(),
  instrumenSterilkanUlang: z.string().optional(),
  jumlah: z.string().optional(),
  jenisImplant: z.string().optional(),
  adaSpecimen: z.boolean().optional(),
  tidakAdaSpecimen: z.boolean().optional(),
  sudahDiambil: z.boolean().optional(),
  belumDiambil: z.boolean().optional(),
  patologi: z.boolean().optional(),
  vc: z.boolean().optional(),
  sitologi: z.boolean().optional(),
  kultur: z.boolean().optional(),
  jumlahPemeriksaan: z.string().optional(),
  formalin: z.boolean().optional(),
  tidakDifiksasi: z.boolean().optional(),
  adaLabel: z.boolean().optional(),
  tidakAdaLabel: z.boolean().optional(),
  tidakAdaGraft: z.boolean().optional(),
  adaGraft: z.string().optional(),
  jenisKassa: z.string().optional(),
  jumlahKassa: z.string().optional(),
  KasaDalamRongga: z.string().optional(),
  jenisKassaRongga: z.string().optional(),
  tidakAdaKasa: z.boolean().optional(),
  jumlahJarum: z.string().optional(),
  noPisau: z.string().optional(),
  jumlahPisau: z.string().optional(),
  jenis: z.string().optional(),
  jumlahInstrumen: z.string().optional(),
  adaPertanyaan: z.string().optional(),
  tidakAdaPertayaan: z.boolean().optional(),
  adaDokumen: z.string().optional(),
  tidakAdaDokumen: z.boolean().optional(),
  nomorSerialImplant: z.string().optional(),
  tidakAdaSerialImplant: z.boolean().optional(),
});

export type FormData = z.infer<typeof FormSchema>;
