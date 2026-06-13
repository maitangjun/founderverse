import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import competitorsData from "@/data/competitors.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, ExternalLink, Grid } from "lucide-react";

const CompetitorList = () => {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { categories, competitors } = competitorsData;

  const filteredCompetitors = useMemo(() => {
    return competitors.filter((competitor) => {
      const matchesSearch = 
        competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competitor.website.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || competitor.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [competitors, searchTerm, selectedCategory]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-4 mb-10">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-purple-700 hover:text-purple-800 hover:bg-purple-50"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Button>
          <h1 className="text-3xl font-semibold text-purple-900 tracking-tight">社区列表</h1>
          <Button
            variant="ghost"
            onClick={() => navigate("/hub")}
            className="flex items-center gap-2 text-purple-700 hover:text-purple-800 hover:bg-purple-50 ml-auto"
          >
            <Grid className="w-4 h-4" />
            卡片视图
          </Button>
        </div>

        <Card className="bg-white border-purple-100 mb-8">
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-semibold text-purple-900">筛选和搜索</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <Input
                    placeholder="搜索社区名称或网站..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 py-3 bg-purple-50 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl text-base"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedCategory ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(null)}
                  className={!selectedCategory ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  全部
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-purple-100">
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-semibold text-purple-900">社区列表 ({filteredCompetitors.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-purple-100">
                  <TableHead className="w-14 text-purple-600 font-medium">#</TableHead>
                  <TableHead className="text-purple-600 font-medium">分类</TableHead>
                  <TableHead className="text-purple-600 font-medium">名称</TableHead>
                  <TableHead className="text-purple-600 font-medium">网站</TableHead>
                  <TableHead className="w-24 text-purple-600 font-medium">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompetitors.map((competitor, index) => (
                  <TableRow
                    key={competitor.id}
                    className="cursor-pointer hover:bg-purple-50 transition-colors border-b border-purple-50"
                    onClick={() => navigate(`/competitor?id=${competitor.id}`)}
                  >
                    <TableCell className="text-purple-800">{index + 1}</TableCell>
                    <TableCell>
                      <Badge
                        className="bg-purple-100 text-purple-900 border-0"
                      >
                        {getCategoryName(competitor.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-purple-900">{competitor.name}</TableCell>
                    <TableCell>
                      {competitor.website ? (
                        <a
                          href={competitor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-purple-700 hover:text-purple-900 flex items-center gap-1.5"
                        >
                          <span className="truncate max-w-xs">{competitor.website}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-purple-300">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/competitor?id=${competitor.id}`);
                        }}
                        className="text-purple-700 hover:text-purple-900 hover:bg-purple-100"
                      >
                        查看
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredCompetitors.length === 0 && (
              <div className="p-10 text-center text-purple-400">
                没有找到匹配的社区
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompetitorList;
