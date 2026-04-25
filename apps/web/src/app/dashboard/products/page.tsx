"use client";

import { Package, Plus, Upload } from "lucide-react";
import { Button } from "@Synap/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@Synap/ui/components/card";

export default function ProductsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Produk</h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">Kelola katalog Anda, edit detail, dan atur informasi produk untuk AI.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="border-dashed border-slate-300 dark:border-slate-700 w-full sm:w-auto">
            <Upload className="mr-2 w-4 h-4" />
            Impor CSV
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 w-full sm:w-auto">
            <Plus className="mr-2 w-4 h-4" />
            Tambah Produk
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle>Daftar Katalog</CardTitle>
          <CardDescription>Produk terintegrasi Anda yang tersedia untuk referensi AI.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Empty State */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900/50">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Produk tidak ditemukan</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">
              Mulai dengan menambahkan produk atau mengimpor katalog menggunakan file CSV. AI akan langsung menyerap informasi katalog produk Anda.
            </p>
            <Button className="mt-6">Tambahkan produk pertama Anda</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
