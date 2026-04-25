"use client";

import { MessageSquare, Search, Filter, Monitor } from "lucide-react";
import { Button } from "@Synap/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@Synap/ui/components/card";

export default function ConversationsPage() {
  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Percakapan</h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">Tinjau interaksi otomatis WhatsApp antara AI dan pelanggan secara real-time.</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
        {/* Chat List Pane */}
        <Card className="col-span-1 border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                placeholder="Cari nomor telepon..." 
                className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                disabled
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0" disabled>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-slate-500 text-sm">
            Menunggu pesan baru...
          </div>
        </Card>

        {/* Chat Viewer Pane — Desktop */}
        <Card className="col-span-2 hidden md:flex flex-col border-none shadow-md shadow-slate-200/40 dark:shadow-none bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
          <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 text-center text-slate-500">
            <div className="mb-4 h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">Pilih percakapan</h3>
            <p className="text-sm max-w-sm mt-2">
              Pilih satu pesan dari daftar percakapan untuk melihat riwayat interaksi pelanggan dengan AI.
            </p>
          </div>
        </Card>

        {/* Mobile hint — shown only on small screens */}
        <div className="md:hidden flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 text-sm text-slate-500 dark:text-slate-400">
          <Monitor className="h-5 w-5 shrink-0 text-slate-400" />
          <p>Buka di layar yang lebih lebar untuk melihat detail percakapan.</p>
        </div>
      </div>
    </div>
  );
}
