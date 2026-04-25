"use client";

import Link from "next/link";
import { ArrowRight, Bot, MessageSquare, Zap, ShieldCheck, BarChart3, Store } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/utils/orpc";
import { Button } from "@Synap/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@Synap/ui/components/card";

export default function Home() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans overflow-x-hidden">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32 xl:pb-36 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                <span className="block text-slate-900 dark:text-white">WhatsApp Otonom</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                  AI Pengetahuan Produk
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 dark:text-slate-300">
                Ubah WhatsApp Anda menjadi agen penjualan dan dukungan pelanggan cerdas yang beroperasi 24/7.
                Synap menghubungkan katalog produk Anda ke AI yang mampu menjawab pertanyaan, mengecek harga, dan menangani pelanggan secara real-time.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
                <Link href="/dashboard">
                  <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
                    Masuk ke Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${healthCheck.data ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
                  />
                  <span>
                    {healthCheck.isLoading
                      ? "Memeriksa sistem..."
                      : healthCheck.data
                        ? "Sistem Operasional"
                        : "Sistem Offline"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative background blur */}
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 dark:opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                Segala hal yang Anda butuhkan untuk otomasi WhatsApp
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 dark:text-slate-300">
                Platform AI-as-a-Service kami menyajikan kontrol multi-tenant, pipeline RAG terotomatisasi, serta dashboard menawan untuk mengelola semuanya dengan mudah.
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900/50 hover:-translate-y-1 transition-transform duration-300">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                      <Store className="h-6 w-6" />
                    </div>
                    <CardTitle>Katalog Multi-Tenant</CardTitle>
                    <CardDescription className="text-base mt-2">
                       Mengisolasi fitur produk, pemesanan, dan basis pengetahuan per akun merchant (pebisnis) secara terpusat dan mulus.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900/50 hover:-translate-y-1 transition-transform duration-300">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                      <Bot className="h-6 w-6" />
                    </div>
                    <CardTitle>Mesin AI RAG Cerdas</CardTitle>
                    <CardDescription className="text-base mt-2">
                       Klasifikasi maksud interaksi cerdas yang ditelusuri menggunakan vector DB Qdrant serta model canggih Claude AI.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900/50 hover:-translate-y-1 transition-transform duration-300">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <CardTitle>WhatsApp Native</CardTitle>
                    <CardDescription className="text-base mt-2">
                       Sistem terintegrasi penuh terhadap WhatsApp Cloud API. Semua pesan dibalas dengan Bahasa Indonesia di bawah waktu 5 detik.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Basic Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-4 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <p className="text-center font-bold text-lg text-slate-900 dark:text-white">Synap</p>
          </div>
          <p className="text-center text-sm leading-5 text-slate-500">
            &copy; 2026 Synap Inc. Hak cipta dilindungi. Versi MVP.
          </p>
        </div>
      </footer>
    </div>
  );
}
