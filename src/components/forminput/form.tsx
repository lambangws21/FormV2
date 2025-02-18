"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";

// Skema validasi menggunakan zod
const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  rumahSakit: z.string().nonempty("Rumah Sakit is required"),
  operasi: z.string().nonempty("Operasi is required"),
  operator: z.string().nonempty("Operator is required"),
  jumlah: z.number().min(100, "Jumlah harus minimal 100").step(100, "Jumlah harus kelipatan 100"), // Mengatur jumlah minimal dan kelipatan
});

type FormSchemaType = z.infer<typeof FormSchema>;

export function AnimatedForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: FormSchemaType) {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzF5i0H9Epdo74AjyFVcHvdcRdjJM99q9f4P2QjrvSVmAQ1EJj5-uJtJyikUlgKqtyJvA/exec", { // Ganti dengan URL Apps Script Anda
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("There was an error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-[240px] pl-3 text-left font-normal ${
                          !field.value ? "text-muted-foreground" : ""
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the date of the operation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rumahSakit"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Rumah Sakit</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rumah Sakit" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="operasi"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Operasi</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Operasi" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Operator</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Operator" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jumlah"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Jumlah</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Jumlah"
                    type="number"
                    min="100"
                    step="100" // Mengatur input agar hanya menerima angka kelipatan 100
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </motion.button>
        </form>
      </Form>
    </motion.div>
  );
}
