"use client";

import { Save, Bot } from "lucide-react";
import { Button } from "@Synap/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@Synap/ui/components/card";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Pengaturan</h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">Atur persona AI, koneksi WhatsApp, dan pengaturan ruang kerja Anda.</p>
      </div>

      <div className="grid gap-6">
        {/* AI Persona Configuration */}
        <Card className="border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Bot className="h-5 w-5 text-blue-500" />
              <CardTitle>Persona AI</CardTitle>
            </div>
            <CardDescription>
              Ubah bagaimana AI merespons pelanggan Anda. Kelola nada bicara, bahasa, dan instruksi perilaku.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-900 dark:text-white">Nama Agen</label>
              <input 
                type="text" 
                defaultValue="Synap Agent"
                disabled
                className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm"
              />
              <p className="text-xs text-slate-500">Nama yang akan digunakan oleh agen Anda jika ditanya identitasnya oleh pelanggan.</p>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-900 dark:text-white flex justify-between">
                Sistem Prompt / Instruksi
                <span className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full text-[10px] uppercase">Pro</span>
              </label>
              <textarea 
                rows={4}
                disabled
                placeholder="Anda adalah asisten layanan pelanggan ramah dari toko kami. Bersikaplah sopan dan gunakan Bahasa Indonesia yang baik."
                className="rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm font-mono opacity-60"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-100 dark:border-slate-800 px-6 py-4">
            <Button disabled>
              <Save className="h-4 w-4 mr-2" /> Simpan Konfigurasi AI
            </Button>
          </CardFooter>
        </Card>

        {/* WhatsApp Configuration */}
        <Card className="border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Koneksi WhatsApp</CardTitle>
            <CardDescription>
              Tautkan Akun WhatsApp Business (WABA) Anda di sini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Belum Terhubung</p>
                <p className="text-xs text-slate-500">Tautkan akun bisnis Anda untuk mulai membalas pesan otomatis.</p>
              </div>
              <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-900 dark:hover:bg-green-900/30 w-full sm:w-auto shrink-0">Hubungkan WABA</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
