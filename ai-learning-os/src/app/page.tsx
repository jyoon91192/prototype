"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { popularRoadmaps } from "@/data/mockData";

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-24 px-6 py-24 lg:px-12">
      <div className="absolute inset-x-0 top-28 -z-10 mx-auto h-64 w-3/4 rounded-full bg-[radial-gradient(circle,_rgba(0,224,184,0.22),_transparent_70%)] blur-3xl" />

      <section className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="space-y-8">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-teal-200 backdrop-blur-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Multicampus · AI Personalized Learning OS
          </motion.span>
          <motion.h1
            className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            AI가 나의 학습을 설계합니다.
            <span className="block bg-gradient-to-r from-[#00E0B8] via-sky-400 to-[#00E0B8] bg-clip-text text-transparent">
              로드맵 · 노트 · 포트폴리오까지 한 번에.
            </span>
          </motion.h1>
          <motion.p
            className="max-w-xl text-lg leading-relaxed text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            학습 이력부터 커리어 목표까지 AI가 분석해 맞춤 로드맵을 제안하고,
            자가학습 노트와 시각화 포트폴리오로 연결해 주는 새로운 학습 OS를 미리 만나보세요.
          </motion.p>

          <motion.div
            className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="/roadmap"
              className="group inline-flex items-center justify-center rounded-full bg-[#00E0B8] px-6 py-3 text-base font-medium text-slate-900 transition hover:bg-teal-300"
            >
              나만의 로드맵 시작하기
              <span className="ml-2 text-slate-900 transition group-hover:translate-x-1">
                →
              </span>
            </Link>
            <span className="text-sm text-slate-400">
              3단계 프로토타입 · 로드맵 → 노트 → 포트폴리오
            </span>
          </motion.div>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-900/50 backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,224,184,0.18),_transparent_70%)]" />
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-teal-200/70">
                Learning Pulse
              </p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200/80">
                실시간
              </span>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/15 bg-slate-900/50 p-4 shadow-inner shadow-black/20">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  다음 액션
                </p>
                <p className="mt-2 text-base font-medium text-white">
                  오늘은 RAG 실습 세션을 시작하고,
                  LangChain 문서를 요약해 학습 노트로 전송해 보세요.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">
                    집중 시간
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">4.5h</p>
                  <p className="text-xs text-slate-300/80">오늘 목표의 90%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-200/80">
                    포트폴리오
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">12</p>
                  <p className="text-xs text-slate-300/80">
                    기록된 프로젝트 / 아티팩트
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Next Skill
                </p>
                <p className="mt-2 text-base font-medium text-white">
                  LLM Evaluations 자동화
                </p>
              </div>
              <div className="flex -space-x-3">
                <span className="h-10 w-10 rounded-full border border-teal-200/40 bg-gradient-to-br from-teal-200/70 to-slate-900/0" />
                <span className="h-10 w-10 rounded-full border border-sky-200/40 bg-gradient-to-br from-sky-200/70 to-slate-900/0" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            인기 학습 로드맵
          </h2>
          <Link
            href="/roadmap"
            className="text-sm text-teal-200 transition hover:text-white"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {popularRoadmaps.map((roadmap) => (
            <motion.article
              key={roadmap.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/40 backdrop-blur-lg transition hover:border-teal-300/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-teal-300/10 opacity-0 transition group-hover:opacity-100" />
              <div className="relative space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  {roadmap.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {roadmap.description}
                </p>
                {roadmap.milestone && (
                  <span className="inline-flex items-center rounded-full bg-[#00E0B8]/10 px-3 py-1 text-xs font-medium text-[#00E0B8]">
                    📍 {roadmap.milestone}
                  </span>
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>진행률</span>
                    <span>{roadmap.progress}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#00E0B8]"
                      style={{ width: `${roadmap.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 pt-6 text-sm text-slate-400/80">
        Powered by Multicampus · AI Personalized Learning OS
      </footer>
    </div>
  );
}
