"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Package, Users, Activity } from "lucide-react";

import { orpc } from "@/utils/orpc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@Synap/ui/components/card";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const privateData = useQuery({
    ...orpc.privateData.queryOptions(),
    enabled: isLoaded && !!user,
  });

  const displayName = user?.fullName || user?.firstName || "Akses Admin";

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent flex items-center justify-center" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Selamat datang kembali, {displayName}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Berikut ringkasan interaksi WhatsApp otomatis Anda hari ini.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Percakapan</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">1,248</div>
            <p className="text-xs text-slate-500 mt-1 truncate">
              <span className="text-emerald-500 font-medium">+12%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Resolusi Otomatis</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">82.3%</div>
            <p className="text-xs text-slate-500 mt-1 truncate">
              <span className="text-emerald-500 font-medium">+4.1%</span> dari minggu lalu
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Produk Aktif</CardTitle>
            <Package className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">342</div>
            <p className="text-xs text-slate-500 mt-1 truncate">
              <span className="text-emerald-500 font-medium">+5</span> baru minggu ini
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Rata-rata Waktu Respons</CardTitle>
            <Users className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">2.4s</div>
            <p className="text-xs text-slate-500 mt-1 truncate">
              <span className="text-red-500 font-medium">+0.3d</span> dari minggu lalu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Koneksi API</CardTitle>
            <CardDescription>
              Pemeriksaan status sistem backend.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {privateData.isLoading ? (
               <div className="text-sm text-slate-500 animate-pulse">Menghubungi backend...</div>
            ) : privateData.error ? (
              <div className="text-sm border border-red-500/20 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 p-3 rounded-lg">
                Tidak dapat membuat koneksi API pribadi. Periksa ruang kerja Anda.
              </div>
            ) : (
               <div className="text-sm border border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 p-3 rounded-lg flex items-center justify-between">
                 <span>Pesan backend: {privateData.data?.message}</span>
                 <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
               </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Aktivitas Terkini</CardTitle>
            <CardDescription>
              Tindakan terbaru yang diambil oleh Synap AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-start gap-4">
                   <div className="mt-0.5 mt-1 h-2 w-2 rounded-full bg-blue-500" />
                   <div className="flex-1 space-y-1">
                     <p className="text-sm font-medium leading-none text-slate-900 dark:text-white">
                       Membalas WhatsApp Pelanggan +628...
                     </p>
                     <p className="text-xs text-slate-500 dark:text-slate-400">
                       Menyelesaikan pertanyaan spesifikasi produk dalam 2.1 detik
                     </p>
                   </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
