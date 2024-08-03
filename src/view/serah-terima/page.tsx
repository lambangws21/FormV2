"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FormSchema, FormData } from "@/lib/form/formTypes";
import { defaultValues } from "@/lib/form/defaultValues";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import FormField from "@/components/formcomponent/formfield";
import CheckboxField from "@/components/formcomponent/checkboxfield";
import { Label } from "@/components/ui/label";
import HeaderComponent from "@/components/formcomponent/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useToast } from "@/components/ui/use-toast";

const SerahTerima: React.FC = () => {
  const [alert, setAlert] = useState<{ title: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);
  // const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const formatSuccessMessage = (data: FormData): string => {
    return `
    Nama Pasien: ${data.namaPasien}
    No Rekam Medis: ${data.noRekamMedis}
    Diagnosa: ${data.diagnosa}
    `;
  };

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const response = await fetch("/api/google-sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: data }),
      });

      if (response.ok) {
        setAlert({
          title: "Success :)",
          description: formatSuccessMessage(data),
        });
        toast.success("Form submitted successfully. Your data has been saved.");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setAlert({
        title: "Error submitting form",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
      toast.error(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <HeaderComponent />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center item-center bg-green-200 gap-4 p-4">
              <Controller
                control={form.control}
                name="namaPasien"
                render={({ field }) => (
                  <FormField
                    label="Nama Pasien"
                    name="namaPasien"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                control={form.control}
                name="noRekamMedis"
                render={({ field }) => (
                  <FormField
                    label="No Rekam Medis"
                    name="noRekamMedis"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="namaDokter"
                render={({ field }) => (
                  <FormField
                    label="Nama Operator"
                    name="namaOperator"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="namaPenyerah"
                render={({ field }) => (
                  <FormField
                    label="Nama Penyerah"
                    name="namaPenyerah"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="namaPenerima"
                render={({ field }) => (
                  <FormField
                    label="Nama Penerima"
                    name="namaPenerima"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="relative grid gap-4 sm:leading-tight sm:bg-yellow-50 sm:p-2">
              <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Perjalanan Operasi</Label>
                  <Controller
                    control={form.control}
                    name="baruMulai"
                    render={({ field }) => (
                      <CheckboxField
                        label="Baru mulai"
                        name="baruMulai"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="pertengahan"
                    render={({ field }) => (
                      <CheckboxField
                        label="Pertengahan"
                        name="pertengahan"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="hampirSelesai"
                    render={({ field }) => (
                      <CheckboxField
                        label="Hampir selesai"
                        name="hampirSelesai"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">
                    Yang perlu diperhatikan pada pasien
                  </Label>
                  <Controller
                    control={form.control}
                    name="alergi"
                    render={({ field }) => (
                      <CheckboxField
                        label="Alergi"
                        name="alergi"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="implant"
                    render={({ field }) => (
                      <CheckboxField
                        label="Implant"
                        name="implant"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="penyakitKronik"
                    render={({ field }) => (
                      <CheckboxField
                        label="Penyakit Kronik"
                        name="penyakitKronik"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Jenis Dressing yang dibutuhkan :</Label>
                  <Controller
                    control={form.control}
                    name="kasa"
                    render={({ field }) => (
                      <CheckboxField
                        label="Kasa"
                        name="kasa"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="khusus"
                    render={({ field }) => (
                      <CheckboxField
                        label="Khusus"
                        name="khusus"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="flex justify-start gap-2 items-center mb-2">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Hal Khusus yang diperhatikan setelah operasi</Label>
                  <div className="flex gap-x-6 items-center mt-2">
                    <Controller
                      control={form.control}
                      name="tidakAdaHalKhusus"
                      render={({ field }) => (
                        <CheckboxField
                          label="Tidak Ada"
                          name="tidakAdaHalKhusus"
                          checked={field.value as boolean}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-start gap-2 items-center mb-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Rencana perawatan pasca operasi</Label>
                  <Controller
                    control={form.control}
                    name="ruangPemulihan"
                    render={({ field }) => (
                      <CheckboxField
                        label="Ruang Pemulihan"
                        name="ruangPemulihan"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="icu"
                    render={({ field }) => (
                      <CheckboxField
                        label="ICU"
                        name="icu"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="hcu"
                    render={({ field }) => (
                      <CheckboxField
                        label="HCU"
                        name="hcu"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
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
              <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Wet
              </div>
              <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                <div className="mb-2 flex justify-start items-center gap-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Obat-obatan di meja operasi</Label>
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Cairan Irigasi</Label>
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
                  <Controller
                    control={form.control}
                    name="hangat"
                    render={({ field }) => (
                      <CheckboxField
                        label="Hangat"
                        name="hangat"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="dingin"
                    render={({ field }) => (
                      <CheckboxField
                        label="Dingin"
                        name="dingin"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="suhuRuangan"
                    render={({ field }) => (
                      <CheckboxField
                        label="Suhu Ruangan"
                        name="suhuRuangan"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="flex justify-start gap-2 items-center mb-2">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Cairan di Meja Instrumen</Label>
                  <div className="flex gap-x-6 items-center ml-6">
                    <Controller
                      control={form.control}
                      name="adaCairan"
                      render={({ field }) => (
                        <FormField
                          label="Ada"
                          name="adaCairan"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      control={form.control}
                      name="tidakAdaInstrumenMeja"
                      render={({ field }) => (
                        <CheckboxField
                          label="Tidak Ada"
                          name="tidakAdaInstrumenMeja"
                          checked={field.value as boolean}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-start gap-2 items-center mb-2">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Jumlah perdarahan sampai saat ini</Label>
                  <div className="flex gap-x-6 items-center mt-2 ml-6">
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
                </div>
                <div className="flex justify-start gap-2 items-center mb-2">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Produksi Urine</Label>
                  <div className="flex gap-x-6 items-center mt-2 ml-6">
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
                </div>
                <div className="flex justify-start items-center gap-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Persiapan darah yang tersedia</Label>
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
                <div className="mb-2 flex justify-start items-center gap-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Drain pasien</Label>
                  <Controller
                    control={form.control}
                    name="letakDrain"
                    render={({ field }) => (
                      <FormField
                        label="Letak Drain"
                        name="letakDrain"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="jenisDrain"
                    render={({ field }) => (
                      <FormField
                        label="Jenis Drain"
                        name="jenisDrain"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="ukuranDrain"
                    render={({ field }) => (
                      <FormField
                        label="Ukuran Drain"
                        name="ukuranDrain"
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
              <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Instrumen
              </div>
              <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                <div className="mb-2 flex justify-start items-center gap-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Instrumen yang dipakai</Label>
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
                  <Controller
                    control={form.control}
                    name="lengkap"
                    render={({ field }) => (
                      <CheckboxField
                        label="Lengkap"
                        name="lengkap"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="tidakLengkap"
                    render={({ field }) => (
                      <CheckboxField
                        label="Tidak Lengkap"
                        name="tidakLengkap"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="mb-2 flex justify-start items-center gap-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Instrumen Tambahan</Label>
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Instrumen yang selanjutnya dipakai :</Label>
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Instrumen yang akan disterilkan ulang :</Label>
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Kebutuhan Implant</Label>
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
              <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Tissue
              </div>
              <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                <div className="mb-2 flex justify-start items-center gap-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Specimen :</Label>
                  <Controller
                    control={form.control}
                    name="adaSpecimen"
                    render={({ field }) => (
                      <CheckboxField
                        label="Ada Specimen"
                        name="adaSpecimen"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="tidakAdaSpecimen"
                    render={({ field }) => (
                      <CheckboxField
                        label="Tidak Ada"
                        name="tidakAdaSpecimen"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="sudahDiambil"
                    render={({ field }) => (
                      <CheckboxField
                        label="Sudah diambil"
                        name="sudahDiambil"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="belumDiambil"
                    render={({ field }) => (
                      <CheckboxField
                        label="Belum diambil"
                        name="belumDiambil"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="mb-2 flex justify-start items-center gap-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Jenis Pemeriksaan</Label>
                  <Controller
                    control={form.control}
                    name="patologi"
                    render={({ field }) => (
                      <CheckboxField
                        label="Patologi"
                        name="patologi"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="vc"
                    render={({ field }) => (
                      <CheckboxField
                        label="VC"
                        name="vc"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="sitologi"
                    render={({ field }) => (
                      <CheckboxField
                        label="Sitologi"
                        name="sitologi"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="kultur"
                    render={({ field }) => (
                      <CheckboxField
                        label="Kultur"
                        name="kultur"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Fiksasi Specimen</Label>
                  <Controller
                    control={form.control}
                    name="formalin"
                    render={({ field }) => (
                      <CheckboxField
                        label="Formalin 10%"
                        name="formalin"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="tidakDifiksasi"
                    render={({ field }) => (
                      <CheckboxField
                        label="Tidak difiksasi"
                        name="tidakDifiksasi"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="mb-2 flex justify-start items-center gap-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Label Specimen</Label>
                  <Controller
                    control={form.control}
                    name="adaLabel"
                    render={({ field }) => (
                      <CheckboxField
                        label="Ada Label"
                        name="adaLabel"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="tidakAdaLabel"
                    render={({ field }) => (
                      <CheckboxField
                        label="Tidak ada"
                        name="tidakAdaLabel"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="mb-2 flex justify-start items-center gap-3">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Penggunaan Graft</Label>
                  <Controller
                    control={form.control}
                    name="tidakAdaGraft"
                    render={({ field }) => (
                      <CheckboxField
                        label="Tidak ada"
                        name="tidakAdaGraft"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
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
              <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                <div className="text-5xl mr-3 font-bold sm:sr-only sm:text-md sm:mt-2">
                  C
                </div>
                Counts
              </div>
              <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                <div className="mb-2 flex justify-start items-center gap-5">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Kassa yang digunakan</Label>
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Kassa di rongga tubuh</Label>
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
                  <Controller
                    control={form.control}
                    name="tidakAdaKasa"
                    render={({ field }) => (
                      <CheckboxField
                        label="Tidak ada"
                        name="tidakAdaKasa"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="mb-2 flex justify-start items-center gap-5">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Jarum</Label>
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Pisau</Label>
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
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Instrumen</Label>
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
            <div className="relative grid gap-4 sm:leading-tight sm:bg-blue-50 sm:p-2">
              <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Have You Any Question?
              </div>
              <div className="flex justify-center flex-col border-b-8 max-w-full mx-auto p-7">
                <div className="mb-2 flex justify-start items-center gap-5">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Hal lain yang ingin ditanyakan</Label>
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
                  <Controller
                    control={form.control}
                    name="tidakAdaPertayaan"
                    render={({ field }) => (
                      <CheckboxField
                        label="Tidak ada"
                        name="tidakAdaPertayaan"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="mb-2 flex justify-start items-center gap-5">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Dokumen yang harus dilengkapi</Label>
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
                  <Controller
                    control={form.control}
                    name="tidakAdaDokumen"
                    render={({ field }) => (
                      <CheckboxField
                        label="Tidak ada"
                        name="tidakAdaDokumen"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="mb-2 flex justify-start items-center gap-5">
                  <Label className="leading-7 [&:not(:first-child)]:mt-6">Nomor serial Implant</Label>
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
                  <Controller
                    control={form.control}
                    name="tidakAdaSerialImplant"
                    render={({ field }) => (
                      <CheckboxField
                        label="Tidak ada"
                        name="tidakAdaSerialImplant"
                        checked={field.value as boolean}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" disabled={loading} variant="outline">
              {loading ? "Submitting..." : "Submit"}
            </Button>
            {alert && (
              <Alert>
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            )}
          </form>
          <ToastContainer />
        </Form>
      </CardContent>
    </Card>
  );
};

export default SerahTerima;