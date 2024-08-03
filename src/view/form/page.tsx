"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FormSchema, FormData } from "@/lib/formTypes";
import { defaultValues } from "@/lib/defaultValues";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import FormField from "@/components/formcomponent/formfield";
import CheckboxField from "@/components/formcomponent/checkboxfield";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Logo from "@/app/st_carolus.png";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [dataNama, setDataNama] = useState({
    namaPasien: "",
    noRekamMedis: "",
    namaDokter: "",
    namaPenerima: "",
    namaPemberi: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setDataNama(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(dataNama));
  }, [dataNama]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setDataNama((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setDataNama((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <header className="flex flex-col lg:flex-row justify-between items-center p-5 max-w-full mx-auto gap-4 w-full">
        <div className="w-full lg:w-1/4 flex justify-center lg:justify-start">
          <Image src={Logo} alt="logo" width={500} height={300} />
        </div>
        <div className="flex flex-col items-center text-center lg:w-1/2">
          <div className="text-md font-semibold uppercase text-md lg:text-xl">
            RUMAH SAKIT ST SINT CAROLUS JAKARTA PUSAT
          </div>
          <div className="text-sm lg:text-lg mt-1">
            PANDUAN SERAH TERIMA INTRA OPERASI DI KAMAR OPERASI
          </div>
        </div>
        <div className="flex flex-col shadow-md bg-slate-200 rounded-md p-4 lg:w-1/4">
          <div className="w-full mb-2">
            <Label htmlFor="namaPasien">Nama Pasien</Label>
            <Input
              id="namaPasien"
              name="namaPasien"
              value={dataNama.namaPasien}
              onChange={handleChange}
              className="bg-transparent border-b-slate-400 border-b-2 rounded-none hover:ring-0"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="noRekamMedis">No RM</Label>
            <Input
              id="noRekamMedis"
              name="noRekamMedis"
              value={dataNama.noRekamMedis}
              onChange={handleChange}
              className="bg-transparent border-b-slate-400 border-b-2 rounded-none hover:ring-0"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="namaDokter">Nama Dokter</Label>
            <Input
              id="namaDokter"
              name="namaDokter"
              value={dataNama.namaDokter}
              onChange={handleChange}
              className="bg-transparent border-b-slate-400 border-b-2 rounded-none hover:ring-0"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="namaPenerima">Nama Penerima</Label>
            <Input
              id="namaPenerima"
              name="namaPenerima"
              value={dataNama.namaPenerima}
              onChange={handleChange}
              className="bg-transparent border-b-slate-400 border-b-2 rounded-none hover:ring-0"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="namaPemberi">Nama Pemberi</Label>
            <Input
              id="namaPemberi"
              name="namaPemberi"
              value={dataNama.namaPemberi}
              onChange={handleChange}
              className="bg-transparent border-b-slate-400 border-b-2 rounded-none hover:ring-0"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

const SerahTerima: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    console.log("Form data to be submitted:", data);
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: data }),
      });

      if (response.ok) {
        toast({
          title: "Form submitted successfully",
          description: "Data berhasil disimpan!",
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Error submitting form",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderCheckboxGroup = (
    checkboxes: { name: keyof FormData; label: string }[]
  ) => {
    return checkboxes.map(({ name, label }) => (
      <Controller
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => (
          <CheckboxField
            label={label}
            name={name}
            checked={!!field.value}
            onChange={field.onChange}
          />
        )}
      />
    ));
  };

  return (
    <div>
      <Header />
      <Card className="m-4">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative w grid gap-4 sm:leading-tight sm:bg-yellow-50 sm:p-2">
                <div className="text-2xl font-bold sm:text-xs uppercase flex items-center justify-start md:text-xl">
                  <div className="text-7xl mr-3 font-bold sm:font-medium sm:text-2xl sm:hidden">
                    S
                  </div>
                  Surgical Procedure
                </div>
                <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                  <Controller
                    control={form.control}
                    name="diagnosa"
                    render={({ field }) => (
                      <FormField
                        label="Diagnosa"
                        name="diagnosa"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="kemajuanTindakan"
                    render={({ field }) => (
                      <FormField
                        label="Kemajuan Tindakan Operasi"
                        name="kemajuanTindakan"
                        value={field.value}
                        onChange={field.onChange}
                        type="textarea"
                      />
                    )}
                  />
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Perjalanan Operasi</Label>
                    {renderCheckboxGroup([
                      { name: "baruMulai", label: "Baru mulai" },
                      { name: "pertengahan", label: "Pertengahan" },
                      { name: "hampirSelesai", label: "Hampir selesai" },
                    ])}
                    <Controller
                      control={form.control}
                      name="tindakanLainnya"
                      render={({ field }) => (
                        <FormField
                          label="Lainnya"
                          name="tindakanLainnya"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-start items-center gap-3 mb-2">
                    <Label className="block text-gray-700 md:text-xs sm:text-[8px]">
                      Yang perlu diperhatikan pada pasien
                    </Label>
                    {renderCheckboxGroup([
                      { name: "alergi", label: "Alergi" },
                      { name: "implant", label: "Implant" },
                      { name: "penyakitKronik", label: "Penyakit Kronik" },
                    ])}
                    <Controller
                      control={form.control}
                      name="penyakitLainnya"
                      render={({ field }) => (
                        <FormField
                          label="Lainnya"
                          name="penyakitLainnya"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-start gap-2 mb-2">
                    <Controller
                      control={form.control}
                      name="jenisInsisi"
                      render={({ field }) => (
                        <FormField
                          label="Jenis Insisi"
                          name="jenisInsisi"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="areaInsisi"
                      render={({ field }) => (
                        <FormField
                          label="Area"
                          name="areaInsisi"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-start gap-3 mb-2">
                    <Label>Jenis Dressing yang dibutuhkan :</Label>
                    {renderCheckboxGroup([
                      { name: "kasa", label: "Kasa" },
                      { name: "khusus", label: "Khusus" },
                    ])}
                  </div>
                  <div className="flex justify-start gap-2 items-center mb-2">
                    <Label>Hal Khusus yang diperhatikan setelah operasi</Label>
                    <div className="flex gap-x-6 items-center mt-2">
                      <Controller
                        control={form.control}
                        name="tidakAdaHalKhusus"
                        render={({ field }) => (
                          <CheckboxField
                            label="Tidak Ada"
                            name="tidakAdaHalKhusus"
                            checked={!!field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex justify-start gap-2 items-center mb-3">
                    <Label>Rencana perawatan pasca operasi</Label>
                    {renderCheckboxGroup([
                      { name: "ruangPemulihan", label: "Ruang Pemulihan" },
                      { name: "icu", label: "ICU" },
                      { name: "hcu", label: "HCU" },
                    ])}
                    <Controller
                      control={form.control}
                      name="lainnya"
                      render={({ field }) => (
                        <FormField
                          label="Lainnya"
                          name="lainnya"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* Wet */}
              <div className="relative grid gap-4 sm:bg-green-50 sm:leading-tight sm:p-2">
                <div className="text-2xl font-bold uppercase flex sm:text-xl sm:bg-green-50 mt-2 items-center justify-start">
                  <div className="text-5xl mr-3 font-bold sm:sr-only">W</div> wet
                </div>
                <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Obat-obatan di meja operasi</Label>
                    <Controller
                      control={form.control}
                      name="namaObat"
                      render={({ field }) => (
                        <FormField
                          label="Nama Obat"
                          name="namaObat"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="jumlahObat"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="jumlahObat"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-start items-center gap-3 mb-2">
                    <Label>Cairan Irigasi</Label>
                    <Controller
                      control={form.control}
                      name="cairan"
                      render={({ field }) => (
                        <FormField
                          label="Nama Cairan"
                          name="cairan"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {renderCheckboxGroup([
                      { name: "hangat", label: "Hangat" },
                      { name: "dingin", label: "Dingin" },
                      { name: "suhuRuangan", label: "Suhu Ruangan" },
                    ])}
                  </div>
                  <div className="flex justify-start gap-2 items-center mb-2">
                    <Label>Cairan di Meja Instrumen</Label>
                    {renderCheckboxGroup([
                      { name: "adaCairan", label: "Ada" },
                      { name: "tidakAdaInstrumenMeja", label: "Tidak Ada" },
                    ])}
                  </div>
                  <div className="flex justify-start gap-2 items-center mb-2">
                    <Label>Jumlah perdarahan sampai saat ini</Label>
                    <Controller
                      control={form.control}
                      name="darah"
                      render={({ field }) => (
                        <FormField
                          label="Darah"
                          name="darah"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-start gap-2 items-center mb-2">
                    <Label>Produksi Urine</Label>
                    <Controller
                      control={form.control}
                      name="urine"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="urine"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <Label>Persiapan darah yang tersedia</Label>
                    <Controller
                      control={form.control}
                      name="jumlahDarah"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="jumlahDarah"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="jenisDarah"
                      render={({ field }) => (
                        <FormField
                          label="Jenis Darah"
                          name="jenisDarah"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* Instrumen */}
              <div className="relative grid gap-4 sm:bg-red-50 sm:leading-tight sm:p-2">
                <div className="text-2xl font-bold mb-4 uppercase sm:text-md mt-2 flex items-center justify-start">
                  <div className="text-5xl mr-3 font-bold sm:hidden md:text-7xl flex items-center justify-start md:block sm:mt-2 sm:text-sm">
                    I
                  </div>{" "}
                  Instrumen
                </div>
                <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Instrumen yang dipakai</Label>
                    <Controller
                      control={form.control}
                      name="setInstrumen"
                      render={({ field }) => (
                        <FormField
                          label="Set Instrumen"
                          name="setInstrumen"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {renderCheckboxGroup([
                      { name: "lengkap", label: "Lengkap" },
                      { name: "tidakLengkap", label: "Tidak Lengkap" },
                    ])}
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Instrumen Tambahan</Label>
                    <Controller
                      control={form.control}
                      name="instrumenTambahan"
                      render={({ field }) => (
                        <FormField
                          label="Set Instrumen"
                          name="instrumenTambahan"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Instrumen yang selanjutnya dipakai :</Label>
                    <Controller
                      control={form.control}
                      name="instrumenSelanjutnya"
                      render={({ field }) => (
                        <FormField
                          label="Set Instrumen"
                          name="instrumenSelanjutnya"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Instrumen yang akan disterilkan ulang :</Label>
                    <Controller
                      control={form.control}
                      name="instrumenSterilkanUlang"
                      render={({ field }) => (
                        <FormField
                          label="Set Instrumen"
                          name="instrumenSterilkanUlang"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Kebutuhan Implant</Label>
                    <Controller
                      control={form.control}
                      name="jumlah"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="jumlah"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="jenisImplant"
                      render={({ field }) => (
                        <FormField
                          label="Jenis"
                          name="jenisImplant"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* Tissue */}
              <div className="relative grid gap-4 sm:leading-tight sm:bg-yellow-50 sm:p-2">
                <div className="text-2xl font-bold uppercase flex items-center justify-start">
                  <div className="text-5xl mr-3 font-bold sm:sr-only sm:text-md">T</div>{" "}
                  Tissue
                </div>
                <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Specimen :</Label>
                    {renderCheckboxGroup([
                      { name: "adaSpecimen", label: "Ada Specimen" },
                      { name: "tidakAdaSpecimen", label: "Tidak Ada" },
                      { name: "sudahDiambil", label: "Sudah diambil" },
                      { name: "belumDiambil", label: "Belum diambil" },
                    ])}
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Jenis Pemeriksaan</Label>
                    {renderCheckboxGroup([
                      { name: "patologi", label: "Patologi" },
                      { name: "vc", label: "VC" },
                      { name: "sitologi", label: "Sitologi" },
                      { name: "kultur", label: "Kultur" },
                    ])}
                    <Controller
                      control={form.control}
                      name="jumlahPemeriksaan"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="jumlahPemeriksaan"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Fiksasi Specimen</Label>
                    {renderCheckboxGroup([
                      { name: "formalin", label: "Formalin 10%" },
                      { name: "tidakDifiksasi", label: "Tidak difiksasi" },
                    ])}
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Label Specimen</Label>
                    {renderCheckboxGroup([
                      { name: "adaLabel", label: "Ada Label" },
                      { name: "tidakAdaLabel", label: "Tidak ada" },
                    ])}
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-3">
                    <Label>Penggunaan Graft</Label>
                    {renderCheckboxGroup([
                      { name: "tidakAdaGraft", label: "Tidak ada" },
                    ])}
                    <Controller
                      control={form.control}
                      name="adaGraft"
                      render={({ field }) => (
                        <FormField
                          label="Ada, Letak"
                          name="adaGraft"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* Counts */}
              <div className="relative grid gap-4 sm:leading-tight sm:bg-blue-50 sm:p-2">
                <div className="text-2xl font-bold mb-4 uppercase flex sm:mt-4 items-center justify-start">
                  <div className="text-5xl mr-3 font-bold sm:sr-only sm:text-md sm:mt-2">
                    C
                  </div>
                  Counts
                </div>
                <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                  <div className="mb-2 flex justify-start items-center gap-5">
                    <Label>Kassa yang digunakan</Label>
                    <Controller
                      control={form.control}
                      name="jenisKassa"
                      render={({ field }) => (
                        <FormField
                          label="Jenis"
                          name="jenisKassa"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="jumlahKassa"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="jumlahKassa"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-5">
                    <Label>Kassa di rongga tubuh</Label>
                    <Controller
                      control={form.control}
                      name="KasaDalamRongga"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="KasaDalamRongga"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="jenisKassaRongga"
                      render={({ field }) => (
                        <FormField
                          label="Jenis"
                          name="jenisKassaRongga"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {renderCheckboxGroup([
                      { name: "tidakAdaKasa", label: "Tidak ada" },
                    ])}
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-5">
                    <Label>Jarum</Label>
                    <Controller
                      control={form.control}
                      name="jumlahJarum"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="jumlahJarum"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-5">
                    <Label>Pisau</Label>
                    <Controller
                      control={form.control}
                      name="noPisau"
                      render={({ field }) => (
                        <FormField
                          label="No Pisau"
                          name="noPisau"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="jumlahPisau"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="jumlahPisau"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-5">
                    <Label>Instrumen</Label>
                    <Controller
                      control={form.control}
                      name="jenis"
                      render={({ field }) => (
                        <FormField
                          label="Jenis"
                          name="jenis"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="jumlahInstrumen"
                      render={({ field }) => (
                        <FormField
                          label="Jumlah"
                          name="jumlahInstrumen"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* Have Any Question */}
              <div className="relative grid gap-4 sm:p-2 sm:bg-purple-50">
                <div className="text-2xl font-bold mb-4 uppercase flex items-center justify-start">
                  <div className="text-5xl mr-3 font-bold">H</div> Have You Any
                  Question?
                </div>
                <div className="flex justify-center flex-col border-b-8">
                  <div className="mb-2 flex justify-start items-center gap-5">
                    <Label>Hal lain yang ingin ditanyakan</Label>
                    <Controller
                      control={form.control}
                      name="adaPertanyaan"
                      render={({ field }) => (
                        <FormField
                          label="Ada"
                          name="adaPertanyaan"
                          value={field.value}
                          onChange={field.onChange}
                          type="textarea"
                        />
                      )}
                    />
                    {renderCheckboxGroup([
                      { name: "tidakAdaPertayaan", label: "Tidak ada" },
                    ])}
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-5">
                    <Label>Dokumen yang harus dilengkapi</Label>
                    <Controller
                      control={form.control}
                      name="adaDokumen"
                      render={({ field }) => (
                        <FormField
                          label="Ada"
                          name="adaDokumen"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {renderCheckboxGroup([
                      { name: "tidakAdaDokumen", label: "Tidak ada" },
                    ])}
                  </div>
                  <div className="mb-2 flex justify-start items-center gap-5">
                    <Label>Nomor serial Implant</Label>
                    <Controller
                      control={form.control}
                      name="nomorSerialImplant"
                      render={({ field }) => (
                        <FormField
                          label="Ada Implan"
                          name="nomorSerialImplant"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {renderCheckboxGroup([
                      { name: "tidakAdaSerialImplant", label: "Tidak ada" },
                    ])}
                  </div>
                </div>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SerahTerima;
