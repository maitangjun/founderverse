import { useState, useMemo } from "react";
import { Search, X, ArrowLeft, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import CompetitorCard from "@/components/CompetitorCard";
import data from "@/data/competitors.json";

export default function CompetitorHub() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompetitors = useMemo(() => {
    return data.competitors.filter((competitor) => {
      const matchesCategory = !selectedCategory || competitor.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        competitor.positioning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (competitor.keyHighlight || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryInfo = (categoryId: string) => {
    return data.categories.find((cat) => cat.id === categoryId);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-purple-100 bg-white/95 backdrop-blur-sm">
        <div className="container py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2 mb-3 text-purple-700 hover:text-purple-800 hover:bg-purple-50"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Button>
          
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-xl font-semibold text-purple-900 tracking-tight">全球创业者社区</h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/list")}
              className="gap-2 text-purple-700 hover:text-purple-800 hover:bg-purple-50"
            >
              <List className="w-4 h-4" />
              列表视图
            </Button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <Input
              placeholder="搜索社区..."
              className="pl-9 pr-8 py-2 bg-purple-50 border-purple-200 text-purple-900 placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-200 rounded-lg text-sm h-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 p-0.5 hover:bg-purple-100 rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container py-5">
        <div className="flex flex-wrap gap-2 mb-5">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full text-sm px-4 py-1.5 h-auto ${
              selectedCategory === null 
                ? "bg-purple-600 hover:bg-purple-700 text-white" 
                : "bg-white border border-purple-200 text-purple-800 hover:text-purple-900 hover:bg-purple-50"
            }`}
          >
            全部
            <span className="ml-1.5 text-gray-500">({data.competitors.length})</span>
          </Button>
          {data.categories.map((category) => {
            const count = data.competitors.filter((c) => c.category === category.id).length;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full text-sm px-4 py-1.5 h-auto ${
                  selectedCategory === category.id 
                    ? "bg-purple-600 hover:bg-purple-700 text-white" 
                    : "bg-white border border-purple-200 text-purple-800 hover:text-purple-900 hover:bg-purple-50"
                }`}
              >
                {category.name}
                <span className="ml-1.5 text-gray-500">({count})</span>
              </Button>
            );
          })}
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500">
            共 <span className="font-semibold text-purple-900">{filteredCompetitors.length}</span> 个社区
            {searchQuery && <span className="text-purple-700 ml-1">搜索: "{searchQuery}"</span>}
          </p>
        </div>

        {filteredCompetitors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCompetitors.map((competitor) => (
              <CompetitorCard
                key={competitor.id}
                competitor={competitor}
                categoryInfo={getCategoryInfo(competitor.category)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-10 text-center bg-white border-purple-100">
            <p className="text-purple-900 mb-1">未找到匹配的社区</p>
            <p className="text-gray-500 text-sm">尝试调整搜索条件或筛选条件</p>
          </Card>
        )}
      </main>
    </div>
  );
}
