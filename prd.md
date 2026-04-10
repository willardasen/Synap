**PRODUCT REQUIREMENTS DOCUMENT**

AI-as-a-Service (AIaaS)

Autonomous WhatsApp Chat Platform

_Multi-Merchant Product Knowledge Engine_

**Version 2.0 - 2 Developers, Compressed 1-Month MVP Timeline**

| **Document Version** | 2.0 (Adjusted - 2 Dev, 1-Month MVP, Indonesia Market)                       |
| -------------------- | --------------------------------------------------------------------------- |
| **Tanggal**          | 6 April 2026                                                                |
| **Status**           | Draft - Revised                                                             |
| **Confidentiality**  | Internal - Restricted                                                       |
| **Dev Team**         | 2 Developers (Dev A: Backend/AI, Dev B: Frontend/Integration) + AI-Assisted |
| **Target Market**    | Indonesia (Bahasa Indonesia) - English support later                        |
| **Backend Language** | Node.js (NestJS) + TypeScript                                               |
| **Timeline MVP**     | 4 Minggu (1 Bulan)                                                          |

# 1\. Executive Summary

Dokumen ini mendefinisikan kebutuhan untuk platform AI-as-a-Service (AIaaS) yang memungkinkan percakapan pelanggan secara otonom dan cerdas di WhatsApp. Platform ini melayani beberapa merchant sekaligus, masing-masing dengan katalog produk, knowledge base, dan persona AI percakapan mereka sendiri.

Sistem mengambil pengetahuan produk dari database terpusat, memungkinkan agen AI menjawab pertanyaan pelanggan dengan informasi akurat khusus merchant-termasuk harga, ketersediaan, spesifikasi, promosi, dan status pesanan-tanpa intervensi manusia.

**PENYESUAIAN KUNCI v2.0:** PRD ini disesuaikan untuk pengembangan dengan 2 developer menggunakan AI-assisted coding, target pasar Indonesia (Bahasa Indonesia), dan timeline agresif 1 bulan (4 minggu) untuk MVP. Pembagian kerja: Dev A fokus backend/AI pipeline, Dev B fokus frontend/integration. Fitur tambahan dikembangkan iteratif setelah MVP live.

## Key Value Propositions

- Engagement pelanggan otonom 24/7 di WhatsApp
- AI product-aware yang menarik data real-time dari katalog merchant
- Arsitektur multi-tenant yang scalable
- Pengalaman native WhatsApp yang mulus (Bahasa Indonesia sebagai bahasa utama)
- Dashboard merchant self-service untuk konfigurasi dan analitik

# 2\. Team Structure & Pembagian Kerja

Dengan 2 developer dan timeline 1 bulan, pembagian kerja dilakukan secara paralel untuk maksimalkan output.

|                  | **Dev A - Backend & AI**                                  | **Dev B - Frontend & Integration**                        |
| ---------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| **Fokus Utama**  | NestJS API, RAG pipeline, AI engine, database, vector DB  | Next.js dashboard, WhatsApp webhook, deployment, testing  |
| **Tech Stack**   | NestJS, PostgreSQL, Qdrant, LangChain.js, Redis, BullMQ   | Next.js, Tailwind CSS, WhatsApp Cloud API, Docker, CI/CD  |
| **Overlap Area** | API contract definition, code review, integration testing | API contract definition, code review, integration testing |

**Prinsip kerja:** Hari 1-2 kedua developer align arsitektur, API contract, dan database schema bersama. Setelah itu bekerja paralel dengan daily sync 15 menit.

# 3\. Release Roadmap - 1 Bulan MVP

Timeline dipadatkan menjadi 4 minggu dengan 2 developer bekerja paralel. Setiap minggu memiliki deliverable yang jelas.

## Week 1: Foundation & Core Backend (Hari 1-7)

**Goal:** Fondasi project berdiri, API dasar jalan, WhatsApp webhook connected, database ready.

| **Task**                          | **PIC** | **Hari** | **Detail**                                                                                                                              |
| --------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Project Setup & Architecture**  | A + B   | 1        | Init NestJS monorepo, Next.js app, PostgreSQL schema, Docker compose, Git branching strategy, CI pipeline dasar                         |
| **Database Schema & Migration**   | A       | 1        | Buat semua tabel core: merchants, products, knowledge_entries, conversations, messages, customers, subscriptions. Setup RLS per tenant. |
| **Auth & Tenant Module**          | A       | 2        | JWT authentication, merchant registration API, tenant isolation middleware, role-based access control dasar                             |
| **WhatsApp Webhook Setup**        | B       | 2        | Webhook verification endpoint, message receiver, message router (identifikasi merchant dari nomor WA), response sender via Cloud API    |
| **Product CRUD API**              | A       | 2        | CRUD endpoints untuk products: create, read, update, delete. CSV import parser. Validasi data produk.                                   |
| **Next.js Boilerplate & Auth UI** | B       | 2        | Setup Next.js + Tailwind, halaman login/register, auth flow dengan JWT, layout dashboard skeleton                                       |
| **Redis & Session Setup**         | A       | 1        | Redis connection, session management untuk WA conversations, rate limiting middleware                                                   |
| **WhatsApp Message Flow E2E**     | B       | 2        | End-to-end: terima pesan WA → route ke merchant → dummy response → kirim balik. Validasi flow berjalan.                                 |

## Week 2: AI Engine & Knowledge Pipeline (Hari 8-14)

**Goal:** RAG pipeline berfungsi, AI bisa jawab pertanyaan produk, dashboard mulai usable.

| **Task**                             | **PIC** | **Hari** | **Detail**                                                                                                                                    |
| ------------------------------------ | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Qdrant Setup & Embedding Service** | A       | 2        | Setup Qdrant (Docker), embedding generation service pakai text-embedding-3-large, namespace isolation per merchant                            |
| **Knowledge Ingestion Pipeline**     | A       | 2        | ETL: normalize data produk, chunking (max 512 tokens), generate embeddings, index ke Qdrant. Trigger manual via API.                          |
| **RAG Pipeline Core**                | A       | 3        | Intent classification, query preprocessing, vector search (top-k=5), context assembly, LLM generation (Claude API), post-processing format WA |
| **AI Persona & Guardrails**          | A       | 2        | System prompt template per merchant (nama, tone, bahasa). Guardrails: no hallucination, price dari DB, scope boundary, PII protection.        |
| **Dashboard: Product Management**    | B       | 3        | Halaman upload CSV, list produk, edit/delete produk, trigger re-index. Form input manual produk.                                              |
| **Dashboard: Conversation Viewer**   | B       | 2        | List conversations per merchant, detail percakapan (bubble chat UI), filter by date/customer                                                  |
| **Integration: WA + AI Pipeline**    | B       | 2        | Connect WhatsApp webhook ke RAG pipeline. Pesan masuk → AI proses → respons dikirim. Error handling & retry.                                  |
| **BullMQ Message Queue**             | A       | 1        | Setup BullMQ untuk async message processing, retry logic, dead letter queue untuk failed messages                                             |

## Week 3: Dashboard, Subscription & Polish (Hari 15-21)

**Goal:** Dashboard lengkap, subscription flow works, merchant bisa onboard sendiri, AI response quality bagus.

| **Task**                           | **PIC** | **Hari** | **Detail**                                                                                                                           |
| ---------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Dashboard: Merchant Settings**   | B       | 2        | Konfigurasi AI persona (nama, tone, greeting), business info, WhatsApp number mapping, custom fallback responses                     |
| **Dashboard: Analytics Sederhana** | B       | 2        | Total percakapan, auto-resolution rate, response time rata-rata, top produk ditanyakan. Chart sederhana pakai Recharts.              |
| **Subscription & Billing Module**  | A       | 2        | Model subscription (Free/Starter/Growth/Business), CRUD API, usage tracking (jumlah conversation), plan enforcement (limit check)    |
| **Dashboard: Subscription UI**     | B       | 2        | Halaman pilih plan, status subscription, usage meter, instruksi pembayaran (transfer/QRIS)                                           |
| **Knowledge Entry Custom Q&A**     | A       | 1        | API untuk merchant tambah custom FAQ/Q&A entries. Embed dan index ke vector DB.                                                      |
| **Dashboard: Knowledge Base UI**   | B       | 1        | Halaman manage custom Q&A: tambah, edit, delete entries                                                                              |
| **AI Response Quality Tuning**     | A       | 3        | Fine-tune prompt templates, test dengan berbagai skenario produk Indonesia, handle bahasa informal/slang, improve retrieval accuracy |
| **Landing Page & Onboarding Flow** | B       | 2        | Landing page sederhana (benefit, pricing, CTA), flow registrasi merchant, guided onboarding wizard                                   |

## Week 4: Testing, Deploy & Pilot (Hari 22-30)

**Goal:** Sistem stable, deployed ke production, 3-5 pilot merchant onboarded dan aktif.

| **Task**                       | **PIC** | **Hari** | **Detail**                                                                                                             |
| ------------------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Integration Testing**        | A + B   | 2        | Test end-to-end semua flow: register → upload produk → WA chat → AI response. Multi-tenant isolation test. Edge cases. |
| **Load & Performance Testing** | A       | 1        | Test concurrent conversations (target 50+), response time < 5 detik, memory/CPU monitoring                             |
| **Security Hardening**         | A       | 1        | Review RLS rules, sanitize inputs, rate limiting verification, JWT expiry, HTTPS enforcement                           |
| **Production Deployment**      | B       | 2        | Setup VPS (DigitalOcean/Contabo), Docker production compose, domain & SSL, environment variables, backup strategy      |
| **Monitoring & Alerting**      | B       | 1        | Uptime Robot setup, basic health check endpoints, error logging (structured logs), alert ke Telegram/WA admin          |
| **Pilot Merchant Onboarding**  | A + B   | 3        | Onboard 3-5 merchant pilot: import katalog, konfigurasi persona, test conversation, gather feedback, iterate           |
| **Bug Fixing & Iteration**     | A + B   | 3        | Fix bugs dari pilot testing, improve AI responses berdasarkan feedback, UI/UX polish berdasarkan input merchant        |
| **Documentation**              | B       | 1        | API docs (Swagger), merchant user guide (Bahasa Indonesia), internal runbook untuk ops                                 |

# 4\. Feature Priority Matrix (MVP vs Post-MVP)

| **Priority**  | **Feature**                         | **Description**                                                            | **Target** |
| ------------- | ----------------------------------- | -------------------------------------------------------------------------- | ---------- |
| **P0 (MVP)**  | **Autonomous Product Q&A**          | AI jawab pertanyaan produk dari knowledge base merchant (Bahasa Indonesia) | Week 2     |
| **P0 (MVP)**  | **Multi-Merchant Tenant Isolation** | Isolasi data dan percakapan per merchant                                   | Week 1     |
| **P0 (MVP)**  | **Product Catalog Sync**            | Import produk via CSV upload atau input manual dashboard                   | Week 1-2   |
| **P0 (MVP)**  | **WhatsApp Message Handling**       | Terima, proses, dan respons pesan WA secara real-time                      | Week 1-2   |
| **P0 (MVP)**  | **Merchant Dashboard**              | Dashboard: onboarding, upload produk, lihat percakapan, settings           | Week 2-3   |
| **P0 (MVP)**  | **Subscription & Billing**          | Merchant subscribe, payment via transfer/QRIS, usage tracking              | Week 3     |
| **P1 (v1.1)** | **Human Handoff**                   | Eskalasi query kompleks ke agen manusia dengan konteks                     | Post-MVP   |
| **P1 (v1.1)** | **English Language Support**        | Tambah dukungan bahasa Inggris                                             | Post-MVP   |
| **P1 (v1.1)** | **API-based Product Sync**          | Sync produk otomatis via REST API                                          | Post-MVP   |
| **P1 (v1.1)** | **Analytics Dashboard**             | Metrik performa AI, engagement, conversion                                 | Post-MVP   |
| **P2 (v1.5)** | **Product Recommendations**         | AI sugesti produk berdasarkan konteks percakapan                           | Future     |
| **P2 (v1.5)** | **Payment Integration**             | Link pembayaran in-chat (Midtrans/Xendit)                                  | Future     |

# 5\. System Architecture

## 5.1 High-Level Architecture

Platform mengikuti arsitektur modular monolith untuk fase MVP, memungkinkan 2 developer mengelola codebase dengan efisien dan bekerja paralel pada module yang berbeda. Migrasi ke microservices dilakukan saat scaling diperlukan.

- **Presentation Layer:** WhatsApp Business API (Cloud API), Merchant Dashboard (Next.js)
- **Backend API:** Monolith NestJS dengan module-based separation
- **AI Engine:** RAG pipeline, intent classification, response generation
- **Knowledge Service:** Product catalog indexing, vector embeddings, semantic search
- **Data Layer:** PostgreSQL (relational), Redis (cache/session), Qdrant (vector DB)

## 5.2 Tech Stack

| **Component**        | **Technology**               | **Rationale**                                                            |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| **Backend API**      | NestJS + TypeScript          | Fastest dev productivity, great AI tooling support, modular architecture |
| **AI/ML Engine**     | LangChain.js / Vercel AI SDK | Mature TS/JS ecosystem untuk RAG pipeline                                |
| **LLM Provider**     | Anthropic Claude API         | Best reasoning, Bahasa Indonesia support baik                            |
| **Vector Database**  | Qdrant (Docker)              | Open-source, lightweight, easy setup, namespace isolation                |
| **Primary Database** | PostgreSQL                   | Reliable, RLS untuk multi-tenancy                                        |
| **Cache Layer**      | Redis                        | Session management, rate limiting, BullMQ backend                        |
| **Message Queue**    | BullMQ (Redis-based)         | Async message processing, simpler than Kafka                             |
| **WhatsApp API**     | Meta Cloud API               | Official, reliable, compliant                                            |
| **Dashboard**        | Next.js + Tailwind CSS       | Same language as backend, SSR, rapid UI dev                              |
| **Infrastructure**   | VPS (DO/Contabo)             | Cost-effective untuk MVP                                                 |

# 6\. Data Model (PostgreSQL)

| **Table**             | **Key Fields**                                                              | **Description**                |
| --------------------- | --------------------------------------------------------------------------- | ------------------------------ |
| **merchants**         | id, name, waba_id, plan_tier, config_json, status, created_at               | Merchant/tenant master record  |
| **products**          | id, merchant_id, sku, name, description, price, stock, category, specs_json | Product catalog per merchant   |
| **knowledge_entries** | id, merchant_id, type, question, answer, embedding_status                   | Custom Q&A dan FAQs            |
| **conversations**     | id, merchant_id, customer_wa_id, session_id, status, started_at             | Conversation sessions          |
| **messages**          | id, conversation_id, direction, content, intent, ai_confidence, timestamp   | Individual messages            |
| **customers**         | id, merchant_id, wa_id, name, first_contact, last_contact                   | Customer profiles per merchant |
| **subscriptions**     | id, merchant_id, plan, status, usage_count, started_at, expires_at          | Subscription & billing records |

# 7\. API Specifications (MVP)

| **Method** | **Endpoint**                            | **Description**                | **Target** |
| ---------- | --------------------------------------- | ------------------------------ | ---------- |
| **POST**   | /api/v1/auth/register                   | Register merchant baru         | Week 1     |
| **POST**   | /api/v1/auth/login                      | Login merchant (JWT)           | Week 1     |
| **PUT**    | /api/v1/merchants/:id/config            | Update konfigurasi AI merchant | Week 3     |
| **POST**   | /api/v1/merchants/:id/products/import   | Import katalog produk (CSV)    | Week 1     |
| **GET**    | /api/v1/merchants/:id/products          | List produk merchant           | Week 1     |
| **POST**   | /api/v1/merchants/:id/products          | Create single product          | Week 1     |
| **POST**   | /api/v1/merchants/:id/knowledge         | Tambah knowledge entry kustom  | Week 3     |
| **POST**   | /api/v1/webhooks/whatsapp               | WhatsApp webhook receiver      | Week 1     |
| **GET**    | /api/v1/merchants/:id/conversations     | List percakapan                | Week 2     |
| **POST**   | /api/v1/subscriptions                   | Buat subscription baru         | Week 3     |
| **GET**    | /api/v1/merchants/:id/analytics/summary | Analytics summary data         | Week 3     |

# 8\. Non-Functional Requirements (MVP)

| **Category**       | **Requirement**                   | **MVP Target**      | **Future Target** |
| ------------------ | --------------------------------- | ------------------- | ----------------- |
| **Latency**        | End-to-end response time          | < 5 detik (P95)     | < 3 detik         |
| **Throughput**     | Concurrent conversations/merchant | 50+                 | 500+              |
| **Availability**   | System uptime                     | 99%                 | 99.9%             |
| **Scalability**    | Merchant tenant count             | 20 merchants        | 1,000+            |
| **Scalability**    | Products per merchant             | 10,000              | 100,000+          |
| **Data Retention** | Conversation history              | 3 bulan             | 12 bulan          |
| **Sync Latency**   | Product update to AI              | < 15 menit (manual) | < 5 menit (auto)  |

# 9\. AI & NLP Specifications

## 9.1 RAG Pipeline Flow

Ketika pelanggan mengirim pesan, sistem menjalankan pipeline berikut:

- Intent Classification: tentukan kategori query (product inquiry, price check, stock check, general, out-of-scope)
- Query Preprocessing: ekstrak entitas (nama produk, kategori, range harga), handle typo dan bahasa informal
- Vector Search: query tenant namespace di Qdrant, retrieve top-k (k=5) relevant product chunks
- Context Assembly: gabungkan retrieved chunks + conversation history + merchant config ke prompt
- LLM Generation: generate respons dalam Bahasa Indonesia menggunakan assembled context (Claude API)
- Post-processing: format untuk WhatsApp (max 4096 chars), tambah link/gambar produk jika applicable

## 9.2 AI Guardrails (MVP)

| **Guardrail**          | **Implementation**                                                  | **Priority** |
| ---------------------- | ------------------------------------------------------------------- | ------------ |
| **No Hallucination**   | Respons harus cite retrieved knowledge chunks, confidence threshold | MVP          |
| **Price Accuracy**     | Harga selalu ditarik dari DB, never generated oleh LLM              | MVP          |
| **Stock Accuracy**     | Inventory dicek real-time sebelum respons                           | MVP          |
| **Tone Consistency**   | System prompt enforce brand voice merchant                          | MVP          |
| **Scope Boundary**     | Tolak off-topic queries dengan sopan                                | MVP          |
| **PII Protection**     | Never store/repeat sensitive customer data                          | MVP          |
| **Escalation Trigger** | Auto-handoff on repeated failures                                   | Post-MVP     |

# 10\. Subscription Model (MVP)

| **Plan**       | **Harga/Bulan**      | **Fitur**                                             |
| -------------- | -------------------- | ----------------------------------------------------- |
| **Free Trial** | **Gratis (14 hari)** | 50 percakapan, 100 produk, basic AI                   |
| **Starter**    | **IDR 299.000**      | 500 percakapan, 500 produk, basic dashboard           |
| **Growth**     | **IDR 799.000**      | 2,000 percakapan, 2,000 produk, full dashboard        |
| **Business**   | **IDR 1.999.000**    | 10,000 percakapan, unlimited produk, priority support |

_Pembayaran MVP via transfer bank / QRIS. Payment gateway integration (Midtrans/Xendit) ditambahkan post-MVP._

# 11\. Security & Compliance

- TLS 1.3 untuk semua komunikasi API
- JWT authentication dengan tenant-scoped permissions
- Row-level security (RLS) di PostgreSQL untuk enforce tenant isolation
- Environment variables untuk secrets management (upgrade ke Vault post-MVP)
- Basic rate limiting di API gateway
- Indonesia PDPL (UU PDP No. 27/2022): compliance dengan undang-undang perlindungan data pribadi
- WhatsApp Commerce Policy: kepatuhan pada kebijakan commerce dan messaging Meta

# 12\. Risks & Mitigations

| **Risk**                             | **Severity** | **Mitigation**                                                                                                |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------- |
| **Timeline terlalu ketat (1 bulan)** | **High**     | Scope strictly to MVP, daily standup, AI-assisted coding maximize velocity, cut features jika behind          |
| **AI hallucination / info salah**    | **High**     | Strict RAG guardrails, confidence thresholds, mandatory citation, extensive testing dengan real data merchant |
| **WhatsApp API rate limiting**       | **Medium**   | BullMQ message buffering, exponential backoff, queue management                                               |
| **Data breach / tenant leakage**     | **Critical** | RLS di PostgreSQL, namespace isolation di Qdrant, security review di Week 4                                   |
| **LLM provider outage**              | **Medium**   | Fallback provider (OpenAI jika Claude down), graceful degradation message                                     |
| **Low merchant adoption**            | **Medium**   | Free trial 14 hari, guided onboarding, pilot dengan merchant yang sudah kenal                                 |
| **Bahasa Indonesia NLP quality**     | **Medium**   | Test extensively, tune prompts untuk bahasa informal/slang, dedicated tuning di Week 3                        |
| **Developer burnout**                | **Medium**   | Realistic daily targets, clear task ownership, weekend buffer jika needed                                     |

# 13\. Success Metrics & KPIs

| **KPI**                          | **Target MVP (3 Bulan)** | **Target v1.1 (6 Bulan)** |
| -------------------------------- | ------------------------ | ------------------------- |
| **Auto-Resolution Rate**         | \>65%                    | \>80%                     |
| **Avg Response Time**            | <5 detik                 | <3 detik                  |
| **Merchant Onboarding Time**     | <24 jam (admin-assisted) | <2 jam (self-service)     |
| **Active Merchants**             | 5-10                     | 20-50                     |
| **Monthly Active Conversations** | 5,000                    | 50,000                    |
| **Escalation Rate**              | <35%                     | <20%                      |
| **Platform Uptime**              | 99%                      | 99.5%                     |
| **Monthly Recurring Revenue**    | IDR 5-10 juta            | IDR 50-100 juta           |

# 14\. MVP Definition of Done

MVP dianggap selesai dan siap launch ketika semua kriteria berikut terpenuhi:

- Merchant bisa register dan subscribe (manual approval OK)
- Merchant bisa upload katalog produk via CSV atau manual input
- AI bisa jawab pertanyaan produk dalam Bahasa Indonesia via WhatsApp dengan akurasi >80%
- Data ter-isolasi per merchant (multi-tenancy works, RLS verified)
- Dashboard merchant bisa lihat percakapan, manage produk, dan konfigurasi AI persona
- Subscription & billing flow berfungsi (plan selection, usage tracking)
- Minimal 3 merchant pilot sudah test dan approve
- Response time < 5 detik untuk P95 queries
- System uptime > 99% selama pilot period

# 15\. Post-MVP Roadmap

| **Phase**        | **Feature**                  | **Description**                                                          |
| ---------------- | ---------------------------- | ------------------------------------------------------------------------ |
| **v1.1 (M2-M3)** | **Human Handoff**            | Eskalasi query kompleks ke agen manusia dengan full conversation context |
| **v1.1 (M2-M3)** | **API Product Sync**         | Sync produk otomatis via REST API, scheduled sync                        |
| **v1.1 (M2-M3)** | **Analytics Dashboard**      | Conversion tracking, sentiment analysis, knowledge gap analysis          |
| **v1.1 (M2-M3)** | **English Support**          | Multi-language AI responses                                              |
| **v1.5 (M4-M6)** | **Product Recommendations**  | AI sugesti produk berdasarkan konteks percakapan                         |
| **v1.5 (M4-M6)** | **Payment Integration**      | Midtrans/Xendit in-chat payment links                                    |
| **v2.0 (M7+)**   | **Voice Message Processing** | Transcribe dan respons voice notes WA                                    |
| **v2.0 (M7+)**   | **Image Recognition**        | Customer kirim foto produk, AI identifikasi                              |

_- End of Document -_