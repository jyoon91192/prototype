"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { defaultRoadmap, roadmapPlaylists } from "@/data/mockData";
import type { RoadmapItem } from "@/types";

const roles = [
  { value: "ai-product-manager", label: "AI 프로덕트 매니저" },
  { value: "data-scientist", label: "데이터 사이언티스트" },
  { value: "ai-educator", label: "AI 에듀케이터" },
];

const interestTech = [
  "LLM & Prompt Engineering",
  "MLOps Automation",
  "AI Ethics & Governance",
  "Supabase Realtime Analytics",
  "Generative UI",
];

const goals = [
  "6개월 내 커리어 전환",
  "사내 AI 프로젝트 리드",
  "맞춤 학습 커뮤니티 런칭",
  "학습 포트폴리오 강화",
];

export default function RoadmapPage() {
  const [role, setRole] = useState(roles[0]?.value ?? "");
  const [tech, setTech] = useState(interestTech[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [generatedRoadmap, setGeneratedRoadmap] =
    useState<RoadmapItem[]>(defaultRoadmap);
  type SavedRoadmap = {
    id: string;
    role: string;
    goal: string;
    createdAt: string;
    items: RoadmapItem[];
  };
  const [savedRoadmaps, setSavedRoadmaps] = useState<SavedRoadmap[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 450);
    return () => clearInterval(timer);
  }, [isLoading]);

  const instructionText = useMemo(() => {
    if (isLoading) {
      return `AI가 입력 정보를 분석하는 중${".".repeat(dotCount).padEnd(3, " ")}`;
    }
    return "맞춤 로드맵이 준비되었습니다.";
  }, [dotCount, isLoading]);

  const selectedSuggestion =
    roadmapPlaylists[role]?.suggestion ?? defaultRoadmap;

  const handleGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    setTimeout(() => {
      const personalizedRoadmap = selectedSuggestion.map((item, index) => ({
        ...item,
        progress: Math.min(item.progress + index * 5, 95),
        milestone:
          index === 0
            ? `${tech} 기초 설계`
            : index === selectedSuggestion.length - 1
            ? `${goal} 준비 완료`
            : item.milestone,
      }));

      setGeneratedRoadmap(personalizedRoadmap);
      setIsLoading(false);
      setDotCount(0);
    }, 1100);
  };

  const handleSaveRoadmap = () => {
    const createdAt = new Date().toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSavedRoadmaps((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        role,
        goal,
        createdAt,
        items: generatedRoadmap,
      },
    ]);
    setStatusMessage("로드맵을 저장했습니다. 포트폴리오에 반영할까요?");
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:px-12">
      <div className="flex-1 space-y-6">
        <motion.section
          className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">
                AI 맞춤형 교육 로드맵
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                직무와 목표를 입력하면 AI가 실시간으로 학습 경로를 재구성합니다.
              </p>
            </div>
            <span className="rounded-full bg-[#00E0B8]/10 px-4 py-1 text-xs font-medium text-[#00E0B8]">
              Phase 01
            </span>
          </div>

          <form
            onSubmit={handleGenerate}
            className="mt-10 space-y-6 text-sm text-slate-200"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  직무
                </span>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 hover:border-[#00E0B8]/40">
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    className="w-full bg-transparent text-base font-medium text-white outline-none"
                  >
                    {roles.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-slate-950 text-slate-200"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  관심 기술
                </span>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 hover:border-[#00E0B8]/40">
                  <select
                    value={tech}
                    onChange={(event) => setTech(event.target.value)}
                    className="w-full bg-transparent text-base font-medium text-white outline-none"
                  >
                    {interestTech.map((item) => (
                      <option
                        key={item}
                        value={item}
                        className="bg-slate-950 text-slate-200"
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label className="md:col-span-2">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  목표
                </span>
                <div className="mt-2 rounded-2xl border border-white/10 bg-slate-900/60 p-4 hover:border-[#00E0B8]/40">
                  <select
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                    className="w-full bg-transparent text-base font-medium text-white outline-none"
                  >
                    {goals.map((item) => (
                      <option
                        key={item}
                        value={item}
                        className="bg-slate-950 text-slate-200"
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="submit"
                className="group inline-flex items-center justify-center rounded-full bg-[#00E0B8] px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-teal-300"
              >
                맞춤 로드맵 생성하기
                <span className="ml-2 transition group-hover:translate-x-1">↻</span>
              </button>
              <span className="text-xs text-slate-400">
                입력값에 따라 학습 페이싱과 포트폴리오 전략까지 함께 제안합니다.
              </span>
            </div>
          </form>
        </motion.section>

        <AnimatePresence>
          {statusMessage && (
            <motion.div
              key={statusMessage}
              className="rounded-2xl border border-teal-400/30 bg-[#00E0B8]/10 px-5 py-4 text-sm text-teal-100 backdrop-blur-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {statusMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">저장된 로드맵</h2>
            <span className="text-xs text-slate-400">
              {savedRoadmaps.length}개 보관 중
            </span>
          </div>
          {savedRoadmaps.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">
              아직 저장된 로드맵이 없습니다. 나만의 학습 경로를 생성해 보세요.
            </p>
          ) : (
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {savedRoadmaps.map((roadmap, index) => (
                <li
                    key={roadmap.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3"
                >
                    <div>
                      <p className="font-medium text-white">
                        {index + 1}.{" "}
                        {roles.find((item) => item.value === roadmap.role)?.label ??
                          "커스텀"}{" "}
                        · {roadmap.goal}
                      </p>
                      <p className="text-xs text-slate-400">
                        저장 {roadmap.createdAt} · {roadmap.items.length} 단계
                      </p>
                    </div>
                    <Link
                      href="/portfolio"
                      className="text-xs text-teal-200 transition hover:text-white"
                    >
                      포트폴리오로 보기
                    </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="relative flex-1 rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur-2xl">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,224,184,0.14),_transparent_70%)]" />
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-teal-200/70">
              AI Generated Roadmap
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {roles.find((item) => item.value === role)?.label ?? "맞춤 로드맵"}
            </h2>
          </div>
          <span className="rounded-full border border-white/10 px-4 py-1 text-xs text-slate-300">
            {instructionText}
          </span>
        </header>

        <div className="mt-8 space-y-6">
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                key="loading"
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 py-16 text-sm text-slate-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  AI가 로드맵을 재구성하고 있어요{" "}
                  <span className="text-[#00E0B8]">● ● ●</span>
                </motion.span>
              </motion.div>
            ) : (
              generatedRoadmap.map((node, index) => (
                <motion.article
                  key={node.id}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/40"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.45 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-[#00E0B8]/10 opacity-0 transition hover:opacity-100" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00E0B8]/10 text-sm font-semibold text-[#00E0B8]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {node.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-300">
                          {node.description}
                        </p>
                      </div>
                      {node.milestone && (
                        <p className="text-xs uppercase tracking-[0.3em] text-teal-200/70">
                          {node.milestone}
                        </p>
                      )}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Progress</span>
                          <span>{node.progress}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-[#00E0B8]"
                            style={{ width: `${node.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={handleSaveRoadmap}
            className="rounded-full border border-[#00E0B8]/60 bg-[#00E0B8]/10 px-5 py-2 text-sm font-medium text-[#00E0B8] transition hover:bg-[#00E0B8]/20"
          >
            Save Roadmap
          </button>
          <Link
            href="/selflearning"
            className="inline-flex items-center rounded-full bg-white/90 px-5 py-2 text-sm font-medium text-slate-900 transition hover:bg-white"
          >
            Start Learning
            <span className="ml-2 text-slate-700">→</span>
          </Link>
          <p className="text-xs text-slate-400">
            저장 시 Self-Learning Notebook으로 자동 연동됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}
