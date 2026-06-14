import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight, Calendar, Users } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <main className="container min-h-screen flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-purple-900 mb-6 tracking-tight">
            全球创业者社区
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            探索全球顶尖创业社区的运营模式、核心价值与发展策略。
            通过系统化的分析，为您的创业社区项目提供参考和启发。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/hub")}
              className="gap-2 px-8 py-6 text-base bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-sm"
            >
              <Users className="w-5 h-5" />
              浏览全球社区
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate("/events")}
              variant="ghost"
              className="gap-2 px-8 py-6 text-base text-purple-700 hover:text-purple-800 hover:bg-purple-50 border border-purple-200 transition-colors shadow-sm"
            >
              <Calendar className="w-5 h-5" />
              全球创投活动
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
