import { ChatMessage, Note, Portfolio, RoadmapItem, UploadedDocument } from "@/types";

export const popularRoadmaps: RoadmapItem[] = [
  {
    id: "ai-product-strategist",
    title: "AI 프로덕트 기획자 로드맵",
    description:
      "문제 정의부터 AI 제품 출시까지, 전략과 데이터 리터러시를 함께 설계합니다.",
    progress: 35,
    milestone: "MVP 출시 준비",
  },
  {
    id: "data-science-transition",
    title: "데이터 사이언티스트 전환 로드맵",
    description:
      "Python, ML 파이프라인, 실무 프로젝트 구성으로 6개월 전직 목표 달성하기.",
    progress: 50,
    milestone: "ML 시스템 프로토타입 완성",
  },
  {
    id: "genai-lead",
    title: "Generative AI 팀 리드 로드맵",
    description:
      "LLM 파운데이션 모델, 프롬프트 엔지니어링, Responsible AI 가이드라인 구축.",
    progress: 20,
    milestone: "사내 가이드라인 초안",
  },
];

export const defaultRoadmap: RoadmapItem[] = [
  {
    id: "foundation",
    title: "AI Fundamentals Refresh",
    description: "선형대수, 확률, Python 기반 데이터 분석 복습으로 기초 다지기.",
    progress: 40,
    milestone: "2주 이론 리프레시",
  },
  {
    id: "llm-stack",
    title: "LLM & Prompt Engineering",
    description: "OpenAI & LangChain 실습, Retrieval-Augmented Generation 워크플로우 구성.",
    progress: 25,
    milestone: "RAG PoC 설계",
  },
  {
    id: "mlops",
    title: "MLOps with Supabase",
    description: "Supabase · Vercel 기반 ML 파이프라인 구축 및 실시간 데이터 파이프 구현.",
    progress: 55,
    milestone: "CI/CD 자동화 파이프라인",
  },
  {
    id: "portfolio",
    title: "Portfolio & Narrative",
    description: "프로젝트 결과 정리, 메트릭 정의, 커리어 스토리텔링 디자이닝.",
    progress: 70,
    milestone: "포트폴리오 초안 완성",
  },
];

export const roadmapPlaylists: Record<
  string,
  { label: string; suggestion: RoadmapItem[] }
> = {
  "ai-product-manager": {
    label: "AI 프로덕트 매니저",
    suggestion: [
      defaultRoadmap[0],
      defaultRoadmap[1],
      {
        id: "user-research",
        title: "AI UX & 사용자 리서치",
        description: "AI 인터랙션 플로우 설계, 사용자 페인포인트 기반 기능 우선순위화.",
        progress: 30,
        milestone: "프로덕트 디스커버리 워크샵",
      },
      defaultRoadmap[3],
    ],
  },
  "data-scientist": {
    label: "데이터 사이언티스트",
    suggestion: [
      defaultRoadmap[0],
      {
        id: "feature-store",
        title: "Feature Engineering & Experimentation",
        description: "Feature Store 설계와 실험 관리, A/B 테스트 자동화.",
        progress: 45,
        milestone: "실험 템플릿 구축",
      },
      defaultRoadmap[2],
      defaultRoadmap[3],
    ],
  },
  "ai-educator": {
    label: "AI 에듀케이터",
    suggestion: [
      defaultRoadmap[0],
      {
        id: "curriculum-design",
        title: "AI 커리큘럼 디자인",
        description: "러닝 아웃컴 기반 교육 설계와 멀티미디어 학습 자료 제작.",
        progress: 60,
        milestone: "시그니처 강의안 완성",
      },
      defaultRoadmap[3],
    ],
  },
};

export const initialDocuments: UploadedDocument[] = [
  {
    id: "doc-openai-whitepaper",
    name: "OpenAI GPT-4o Whitepaper.pdf",
    type: "pdf",
    uploadedAt: "2025-11-04",
  },
  {
    id: "doc-langchain",
    name: "LangChain Agents Cookbook.md",
    type: "md",
    uploadedAt: "2025-11-02",
  },
  {
    id: "doc-rag-design",
    name: "RAG 설계 메모.txt",
    type: "txt",
    uploadedAt: "2025-10-28",
  },
];

export const initialNotes: Note[] = [
  {
    id: "note-rag-summary",
    title: "RAG 파이프라인 요약",
    summary:
      "문서 임베딩 → 벡터 스토리지 → 쿼리 확장 → LLM 프롬프트가 핵심 흐름. 데이터 최신성 확보가 관건.",
    tags: ["retrieval", "prompt", "evaluation"],
    updatedAt: "10분 전",
  },
  {
    id: "note-evaluation",
    title: "LLM 평가 전략",
    summary:
      "자동 평가(BLEU, Rouge)보다 인적 평가 기준 설계 필요. Supabase Functions로 평가 루틴 자동화 가능.",
    tags: ["guardrail", "supabase", "metrics"],
    updatedAt: "27분 전",
  },
  {
    id: "note-team-brief",
    title: "팀 브리핑 핵심 메모",
    summary:
      "학습 목표, 예상 일정, 리소스 요구사항을 한 장으로 정리해 스폰서 공유. 대시보드 연동 준비.",
    tags: ["communication", "roadmap"],
    updatedAt: "1시간 전",
  },
];

export const initialMessages: ChatMessage[] = [
  {
    id: "msg-ai-welcome",
    author: "ai",
    content:
      "안녕하세요! 업로드한 자료를 기반으로 오늘의 학습 목표를 요약해 드릴까요?",
    timestamp: "10:02",
  },
  {
    id: "msg-user-question",
    author: "user",
    content: "LangChain으로 맞춤형 학습 어시스턴트를 만들고 싶어요. 핵심 스텝을 정리해줘.",
    timestamp: "10:04",
  },
  {
    id: "msg-ai-response",
    author: "ai",
    content:
      "1) 사용자 페르소나 정의 2) RAG 데이터 파이프 구축 3) 에이전트 워크플로우 설계 4) 지속 평가 세팅을 추천해요.",
    timestamp: "10:05",
  },
];

export const portfolioSnapshot: Portfolio = {
  totalHours: 186,
  completedCourses: 9,
  topics: ["Generative AI", "Product Strategy", "Prompt Engineering", "MLOps"],
  skills: {
    "LLM Engineering": 78,
    "Product Strategy": 65,
    "MLOps": 58,
    "AI Ethics": 52,
    "Data Storytelling": 72,
  },
  timeline: [
    {
      id: "timeline-rag",
      title: "RAG 기반 FAQ Assistant 출시",
      description: "사내 고객지원팀의 반복 문의를 줄이기 위한 AI 에이전트 프로토타입.",
      date: "2025-10-12",
    },
    {
      id: "timeline-ai-ops",
      title: "Supabase + Vercel 파이프라인 구축",
      description: "실시간 피드백 데이터를 수집해 모델 재학습 주기 단축.",
      date: "2025-09-03",
    },
    {
      id: "timeline-learning-sprint",
      title: "Generative AI Research Sprint",
      description: "LangGraph 활용 연구로 팀 워크플로우 자동화 사례 발굴.",
      date: "2025-07-22",
    },
  ],
  nextSkills: [
    {
      id: "next-evals",
      title: "LLM Evaluations Automation",
      description: "TruLens와 Supabase Edge Functions로 품질 모니터링 자동화.",
    },
    {
      id: "next-governance",
      title: "AI Governance Toolkit",
      description: "사내 윤리 체크리스트와 데이터 거버넌스 가이드 정립.",
    },
    {
      id: "next-storytelling",
      title: "Narrative Dashboarding",
      description: "Notion + Recharts로 의사결정용 스토리텔링 강화.",
    },
  ],
};
