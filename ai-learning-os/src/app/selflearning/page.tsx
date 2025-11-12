"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  initialDocuments,
  initialMessages,
  initialNotes,
} from "@/data/mockData";
import type { ChatMessage, Note, UploadedDocument } from "@/types";

export default function SelfLearningPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [documents, setDocuments] =
    useState<UploadedDocument[]>(initialDocuments);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [messageInput, setMessageInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "txt";
    const type =
      extension === "pdf"
        ? "pdf"
        : extension === "md"
        ? "md"
        : extension === "doc" || extension === "docx"
        ? "doc"
        : "txt";

    const newDocument: UploadedDocument = {
      id: `${Date.now()}`,
      name: file.name,
      type,
      uploadedAt: new Date().toISOString().split("T")[0],
    };

    setDocuments((prev) => [newDocument, ...prev]);
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-upload-${newDocument.id}`,
        author: "ai",
        content: `"${file.name}" 자료를 분석해서 학습 질문을 준비했어요. 요약이나 퀴즈를 요청해보세요!`,
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    event.target.value = "";
  };

  const handleGenerateNote = (prompt: string) => {
    const newNote: Note = {
      id: `${Date.now()}`,
      title: `요약 · ${prompt.slice(0, 14)}...`,
      summary:
        "핵심 개념을 도식화하고, 바로 적용 가능한 액션 아이템 3가지를 자동 추천했습니다. 학습 히스토리에 곧 반영됩니다.",
      tags: ["auto-note", "ai-summary", "action-items"],
      updatedAt: "방금 생성",
    };
    setNotes((prev) => [newNote, ...prev]);
    setIsSaved(false);
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!messageInput.trim() || isStreaming) return;

    const timestamp = new Date().toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      author: "user",
      content: messageInput.trim(),
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageInput("");
    setIsStreaming(true);

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        author: "ai",
        content:
          "자료에서 핵심 개념을 찾아 요약하고, 학습 목표 달성을 위한 다음 질문을 제안했어요. 필요하면 메모로 저장할까요?",
        timestamp: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      handleGenerateNote(userMessage.content);
      setIsStreaming(false);
    }, 1100);
  };

  const toggleSync = () => {
    setIsSynced((prev) => !prev);
  };

  const handleSaveNote = () => {
    setIsSaved(true);
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-6xl px-6 py-16 lg:px-12">
      <div className="absolute inset-x-0 top-20 -z-10 h-64 rounded-full bg-[radial-gradient(circle,_rgba(0,224,184,0.18),_transparent_70%)] blur-3xl" />
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full max-w-lg space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl lg:w-80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-teal-200/70">
                Phase 02
              </p>
              <h1 className="mt-1 text-xl font-semibold text-white">
                AI 자가학습 노트북
              </h1>
            </div>
            <Link
              href="/roadmap"
              className="text-xs text-slate-300 transition hover:text-white"
            >
              ← 로드맵
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              자료 업로드
            </p>
            <div className="rounded-2xl border border-dashed border-white/20 bg-slate-900/60 p-5 text-sm text-slate-300">
              <p className="font-medium text-white">
                연구 보고서, PDF, 텍스트를 올려 AI 브리핑을 받아보세요.
              </p>
              <p className="mt-2 text-xs text-slate-400">
                샘플 문서를 올리면 유형별 학습 카드가 자동 생성됩니다.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white transition hover:border-[#00E0B8] hover:text-[#00E0B8]"
                >
                  파일 선택
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleGenerateNote("Generative AI Product Canvas")
                  }
                  className="rounded-full border border-[#00E0B8]/40 bg-[#00E0B8]/10 px-4 py-2 text-xs font-medium text-[#00E0B8] transition hover:bg-[#00E0B8]/20"
                >
                  샘플 노트 생성
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleUpload}
              className="hidden"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                문서 리스트
              </p>
              <span className="text-xs text-slate-500">{documents.length}개</span>
            </div>
            <ul className="mt-3 space-y-3 text-sm text-slate-200">
              {documents.map((document) => (
                <li
                  key={document.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 shadow-inner shadow-black/20"
                >
                  <p className="font-medium text-white">{document.name}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                    <span>{document.type.toUpperCase()}</span>
                    <span>{document.uploadedAt}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleSaveNote}
              className="w-full rounded-full border border-[#00E0B8]/60 bg-[#00E0B8]/10 px-4 py-2 text-sm font-medium text-[#00E0B8] transition hover:bg-[#00E0B8]/20"
            >
              Save Note
            </button>
            <button
              type="button"
              onClick={toggleSync}
              className={`w-full rounded-full px-4 py-2 text-sm font-medium transition ${
                isSynced
                  ? "border border-white/20 bg-white/10 text-white"
                  : "border border-white/20 text-slate-200 hover:border-[#00E0B8]"
              }`}
            >
              Register to Learning History
            </button>
            <AnimatePresence>
              {isSaved && (
                <motion.p
                  key="saved-message"
                  className="rounded-2xl border border-teal-300/30 bg-[#00E0B8]/10 px-4 py-2 text-xs text-teal-100"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                >
                  노트가 저장되어 포트폴리오에 반영됩니다.
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isSynced && (
                <motion.p
                  key="sync-message"
                  className="rounded-2xl border border-sky-300/30 bg-sky-400/10 px-4 py-2 text-xs text-sky-100"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                >
                  학습 히스토리에 등록 완료! 포트폴리오 대시보드에서 확인하세요.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </aside>

        <section className="flex-1 space-y-8 rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur-2xl">
          <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-teal-200/70">
                NotebookLM 스타일 인터페이스
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                학습 자료를 기반으로 AI가 요약과 Q&A를 지원해요
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-[#00E0B8] hover:text-[#00E0B8]"
            >
              포트폴리오로 이동
              <span>→</span>
            </Link>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            {notes.map((note, index) => (
              <motion.article
                key={note.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 shadow-lg shadow-slate-950/40"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-[#00E0B8]/15 opacity-0 transition hover:opacity-100" />
                <div className="relative space-y-3">
                  <h3 className="text-base font-semibold text-white">
                    {note.title}
                  </h3>
                  <p className="leading-relaxed text-slate-300">
                    {note.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#00E0B8]/10 px-3 py-1 text-xs text-[#00E0B8]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">{note.updatedAt}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="space-y-6">
            <div className="h-[420px] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/40 p-6 shadow-inner shadow-black/30">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${
                      message.author === "user" ? "justify-end" : "justify-start"
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                        message.author === "user"
                          ? "bg-[#00E0B8] text-slate-900"
                          : "bg-white/5 text-slate-200"
                      }`}
                    >
                      <p>{message.content}</p>
                      <span className="mt-2 block text-right text-xs text-slate-400/80">
                        {message.timestamp}
                      </span>
                    </div>
                  </motion.div>
                ))}
                <AnimatePresence>
                  {isStreaming && (
                    <motion.div
                      key="streaming"
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                    >
                      <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300">
                        AI가 답변을 정리 중이에요...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex flex-col gap-4 md:flex-row"
            >
              <div className="flex-1 rounded-full border border-white/20 bg-slate-950/50 px-6 py-3 text-sm text-white shadow-inner shadow-black/20">
                <input
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  placeholder='예) "이 자료 요약해줘", "핵심 개념 알려줘"'
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-[#00E0B8] px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-teal-300 disabled:opacity-40"
                disabled={isStreaming}
              >
                전송
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
