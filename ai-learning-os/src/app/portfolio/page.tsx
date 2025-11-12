"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { portfolioSnapshot } from "@/data/mockData";

export default function PortfolioPage() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const radarData = useMemo(
    () =>
      Object.entries(portfolioSnapshot.skills).map(([skill, value]) => ({
        skill,
        value,
      })),
    []
  );

  const overviewStats = [
    {
      label: "총 학습시간",
      value: `${portfolioSnapshot.totalHours}h`,
      description: "지난 3개월 집중 시간",
    },
    {
      label: "완료된 과정",
      value: portfolioSnapshot.completedCourses,
      description: "AI / 데이터 / 제품 과정",
    },
    {
      label: "핵심 주제 Top 3",
      value: portfolioSnapshot.topics.slice(0, 3).join(" · "),
      description: "AI Personalized 추천",
    },
  ];

  return (
    <div className="relative mx-auto min-h-screen max-w-6xl px-6 py-16 lg:px-12">
      <div className="absolute inset-x-0 top-24 -z-10 h-72 rounded-full bg-[radial-gradient(circle,_rgba(0,224,184,0.18),_transparent_70%)] blur-3xl" />
      <div className="space-y-10">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-teal-200/70">
              Phase 03
            </p>
            <h1 className="text-4xl font-semibold text-white">
              나의 학습 포트폴리오
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
              AI가 학습 내역과 성과를 시각화해 커리어 스토리를 완성합니다. 타임라인과
              역량 지도를 기반으로 다음 스킬 추천까지 확인해 보세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-300">
            <Link
              href="/selflearning"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 transition hover:border-[#00E0B8] hover:text-[#00E0B8]"
            >
              ← Self-Learning Notebook
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 transition hover:border-[#00E0B8] hover:text-[#00E0B8]"
            >
              로드맵 보기
            </Link>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {overviewStats.map((stat) => (
            <motion.article
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-xl shadow-slate-950/50 backdrop-blur-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-300">{stat.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/40 backdrop-blur-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-teal-200/70">
                  Radar Chart
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  역량별 성장률
                </h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                최근 90일
              </span>
            </header>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(226,232,240,0.3)" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "#cbd5f5", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "rgba(148,163,184,0.6)", fontSize: 10 }}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.85)",
                      borderRadius: "12px",
                      border: "1px solid rgba(148,163,184,0.2)",
                      color: "#e2e8f0",
                      fontSize: "12px",
                    }}
                  />
                  <Radar
                    name="성장률"
                    dataKey="value"
                    stroke="#00E0B8"
                    fill="#00E0B8"
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-xl shadow-slate-950/40 backdrop-blur-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-teal-200/70">
                  Timeline
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  학습 & 프로젝트 여정
                </h2>
              </div>
              <span className="rounded-full bg-[#00E0B8]/10 px-3 py-1 text-xs text-[#00E0B8]">
                업데이트 완료
              </span>
            </header>
            <div className="mt-6 space-y-6">
              {portfolioSnapshot.timeline.map((event, index) => (
                <motion.article
                  key={event.id}
                  className="relative border-l border-white/20 pl-6"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                >
                  <span className="absolute -left-2 top-1 h-4 w-4 rounded-full border border-[#00E0B8]/50 bg-[#00E0B8]/60 shadow-[0_0_20px_rgba(0,224,184,0.4)]" />
                  <p className="text-xs text-slate-400">{event.date}</p>
                  <h3 className="mt-1 text-base font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {event.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-teal-200/70">
                공유하기
              </p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                AI 학습 포트폴리오 스냅샷을 공유하세요
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                팀 리더, 멘토와 포트폴리오 링크를 공유하고 피드백 루프를 열어보세요.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#00E0B8] px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-teal-300"
            >
              공유 링크 만들기
              <span>↗</span>
            </button>
          </div>

          <div className="mt-6 grid gap-4 text-sm text-slate-200 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                스토리
              </p>
              <p className="mt-2 text-sm text-slate-300">
                학습 목표와 실제 성과를 연결하는 내러티브를 자동 작성해 줍니다.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                데이터
              </p>
              <p className="mt-2 text-sm text-slate-300">
                집중 시간, 프로젝트 진행률, 팀 협업 지표를 포함한 메트릭 공개.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                액션
              </p>
              <p className="mt-2 text-sm text-slate-300">
                추천 스킬과 다음 학습 스프린트를 한 번에 공유할 수 있어요.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 shadow-xl shadow-slate-950/40 backdrop-blur-xl">
          <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-teal-200/70">
                Next Skill 추천
              </p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                AI가 분석한 다음 성장 포인트
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              로드맵과 노트북 활동을 기반으로 업데이트
            </span>
          </header>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {portfolioSnapshot.nextSkills.map((skill, index) => (
              <motion.article
                key={skill.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 shadow-lg shadow-slate-950/40"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-[#00E0B8]/15 opacity-0 transition hover:opacity-100" />
                <h3 className="text-base font-semibold text-white">
                  {skill.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{skill.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-[#00E0B8]">
                  <span>추천 이유</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#00E0B8]/40 to-transparent" />
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  최근 학습 카드 · 프로젝트 타임라인과 연결됨
                </p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {isShareOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => setIsShareOpen(false)}
                className="absolute right-4 top-4 text-sm text-slate-400 transition hover:text-white"
              >
                닫기 ✕
              </button>
              <h3 className="text-xl font-semibold text-white">
                포트폴리오 공유 링크
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                AI가 생성한 스토리 카드와 데이터 스냅샷이 포함된 링크입니다. 24시간
                동안 유효합니다.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
                  https://learning-os.app/portfolio/preview/june-ai
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="rounded-full border border-white/20 px-3 py-1">
                    공개 범위: Mentors
                  </span>
                  <span className="rounded-full border border-white/20 px-3 py-1">
                    다운로드: 허용
                  </span>
                  <span className="rounded-full border border-white/20 px-3 py-1">
                    코멘트: 가능
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => setIsShareOpen(false)}
                  className="rounded-full border border-white/20 px-4 py-2 text-slate-200 transition hover:border-[#00E0B8] hover:text-[#00E0B8]"
                >
                  취소
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[#00E0B8] px-5 py-2 font-medium text-slate-900 transition hover:bg-teal-300"
                >
                  링크 복사
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
