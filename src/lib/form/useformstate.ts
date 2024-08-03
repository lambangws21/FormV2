import { useState, useEffect } from "react";

interface formData {
  namaPasien: string;
  noRekamMedis: string;
  namaPenyerah: string;
  namaPenerima: string;
  namaPemberi: string;
  namaDokter: string;
  diagnosa: string;
  kemajuanTindakan: string;
  perjalananOperasi: string;
  baruMulai: boolean;
  pertengahan: boolean;
  hampirSelesai: boolean;
  lainnya: string;
  alergi: boolean;
  implant: boolean;
  penyakitKronik: boolean;
  xray: boolean;
  ctscan: boolean;
  mri: boolean;
  jenisInsisi: string;
  jenisDressing: string;
  rencanaPerawatan: string;
  halKhusus: string;
  khusus: boolean;
  area: string;
  areaInsisi: string;
  ruangPemulihan: boolean;
  kasa: boolean;
  icu: boolean;
  hcu: boolean;
  lainnyaPerawatan: string;
  ada: string;
  jumlah: string;
  jenis: string;
  nama: string;
  cairan: string;
  hangat: boolean;
  dingin: boolean;
  suhuRuangan: boolean;
  darah: string;
  urine: string;
  letakDrain: string;
  ukuranDrain: string;
  jenisDrain: string;
  jenisDarah: string;
  lengkap: boolean;
  tidakLengkap: boolean;
  setInstrumen: string;
  sudahDiambil: boolean;
  belumDiambil: boolean;
  patologi: boolean;
  sitologi: boolean;
  vc: boolean;
  kultur: boolean;
  formalin: boolean;
  adaLabel: boolean;
  adaSpecimen: boolean;
  tidakAda: boolean;
  tidakAdaHalKhusus: boolean;
  tidakAdaInstrumenMeja: boolean;
  tidakAdaSpecimen: boolean;
  tidakAdaGraft: boolean;
  tidakAdaKasa: boolean;
  tidakAdaPertayaan: boolean;
  tidakAdaSerialImplant: boolean;
  tidakDifiksasi: boolean;
  tidakAdaLabel: boolean;
  tidakAdaDokumen: boolean;
  adaPertanyaan: string;
  nomorSerialImplant: string;
  jenisKassa: string;
  KasaDalamRongga: string;
  jumlahJarum: string;
  noPisau: string;
  jumlahPisau: string;
  instrumenTambahan: string;
  instrumenSelanjutnya: string;
  instrumenSterilkanUlang: string;
  tindakanLainnya: string;
  penyakitLainnya: string;
  adaCairan: string;
  jumlahDarah: string;
  adaGraft: string;
  adaDokumen: string;
  jumlahKassa: string;
  jenisKassaRongga: string;
  jumlahPemeriksaan: string;
  jumlahCairan: string;
  instrumen: string;
  namaInstrument: string;
  hilang: string;
  namaPenutup: string;
  namaObat: string;
  jumlahObat: string;
  jenisImplant: string;
  jenisInstrumen: string;
  jumlahInstrumen: string;
}

const useFormState = () => {
  const [formData, setFormData] = useState<formData>({
    namaPasien: "",
    noRekamMedis: "",
    namaPenyerah: "",
    namaPenerima: "",
    namaPemberi: "",
    namaDokter: "",
    diagnosa: "",
    kemajuanTindakan: "",
    perjalananOperasi: "",
    baruMulai: false,
    pertengahan: false,
    hampirSelesai: false,
    lainnya: "",
    alergi: false,
    implant: false,
    penyakitKronik: false,
    xray: false,
    ctscan: false,
    mri: false,
    jenisInsisi: "",
    jenisDressing: "",
    rencanaPerawatan: "",
    halKhusus: "",
    khusus: false,
    area: "",
    areaInsisi: "",
    ruangPemulihan: false,
    kasa: false,
    icu: false,
    hcu: false,
    lainnyaPerawatan: "",
    ada: "",
    jumlah: "",
    jenis: "",
    nama: "",
    cairan: "",
    hangat: false,
    dingin: false,
    suhuRuangan: false,
    darah: "",
    urine: "",
    letakDrain: "",
    ukuranDrain: "",
    jenisDrain: "",
    jenisDarah: "",
    lengkap: false,
    tidakLengkap: false,
    setInstrumen: "",
    sudahDiambil: false,
    belumDiambil: false,
    patologi: false,
    sitologi: false,
    vc: false,
    kultur: false,
    formalin: false,
    adaLabel: false,
    adaSpecimen: false,
    tidakAda: false,
    tidakAdaHalKhusus: false,
    tidakAdaInstrumenMeja: false,
    tidakAdaSpecimen: false,
    tidakAdaGraft: false,
    tidakAdaKasa: false,
    tidakAdaPertayaan: false,
    tidakAdaSerialImplant: false,
    tidakDifiksasi: false,
    tidakAdaLabel: false,
    tidakAdaDokumen: false,
    adaPertanyaan: "",
    nomorSerialImplant: "",
    jenisKassa: "",
    KasaDalamRongga: "",
    jumlahJarum: "",
    noPisau: "",
    jumlahPisau: "",
    instrumenTambahan: "",
    instrumenSelanjutnya: "",
    instrumenSterilkanUlang: "",
    tindakanLainnya: "",
    penyakitLainnya: "",
    adaCairan: "",
    jumlahDarah: "",
    adaGraft: "",
    adaDokumen: "",
    jumlahKassa: "",
    jenisKassaRongga: "",
    jumlahPemeriksaan: "",
    jumlahCairan: "",
    instrumen: "",
    namaInstrument: "",
    hilang: "",
    namaPenutup: "",
    namaObat: "",
    jumlahObat: "",
    jenisImplant: "",
    jenisInstrumen: "",
    jumlahInstrumen: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return { formData, setFormData };
};

export default useFormState;
