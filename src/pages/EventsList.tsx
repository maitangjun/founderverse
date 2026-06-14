import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import eventsData from "@/data/events.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, ExternalLink, Grid } from "lucide-react";

const EventsList = () => {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const events = eventsData;

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(events.map((event: any) => event.region))];
    return uniqueRegions;
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event: any) => {
      const matchesSearch = 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.focus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = !selectedRegion || event.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [events, searchTerm, selectedRegion]);

  const getRegionColor = (region: string) => {
    const colors: Record<string, string> = {
      "北美": "bg-blue-100 text-blue-900",
      "欧洲": "bg-green-100 text-green-900",
      "亚太": "bg-purple-100 text-purple-900",
      "中国": "bg-red-100 text-red-900",
      "大洋洲/澳洲": "bg-yellow-100 text-yellow-900",
    };
    return colors[region] || "bg-gray-100 text-gray-900";
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
          <h1 className="text-3xl font-semibold text-purple-900 tracking-tight">活动列表</h1>
          <Button
            variant="ghost"
            onClick={() => navigate("/events")}
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
                    placeholder="搜索活动名称、国家或主题..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 py-3 bg-purple-50 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl text-base"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedRegion ? "default" : "ghost"}
                  onClick={() => setSelectedRegion(null)}
                  className={!selectedRegion ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  全部
                </Button>
                {regions.map((region) => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "ghost"}
                    onClick={() => setSelectedRegion(region)}
                    className={selectedRegion === region ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-purple-100">
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-semibold text-purple-900">活动列表 ({filteredEvents.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-purple-100">
                  <TableHead className="w-14 text-purple-600 font-medium">#</TableHead>
                  <TableHead className="text-purple-600 font-medium">地区</TableHead>
                  <TableHead className="text-purple-600 font-medium">国家</TableHead>
                  <TableHead className="text-purple-600 font-medium">活动名称</TableHead>
                  <TableHead className="text-purple-600 font-medium">活动主题</TableHead>
                  <TableHead className="w-24 text-purple-600 font-medium">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event: any, index: number) => (
                  <TableRow
                    key={event.id}
                    className="cursor-pointer hover:bg-purple-50 transition-colors border-b border-purple-50"
                  >
                    <TableCell className="text-purple-800">{index + 1}</TableCell>
                    <TableCell>
                      <Badge className={`${getRegionColor(event.region)} border-0`}>
                        {event.region}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-purple-900">{event.country}</TableCell>
                    <TableCell className="font-medium text-purple-900">{event.name}</TableCell>
                    <TableCell className="text-purple-800 max-w-md">{event.focus}</TableCell>
                    <TableCell>
                      {event.website ? (
                        <a
                          href={event.website.startsWith('http') ? event.website : `https://${event.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-900"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          访问
                        </a>
                      ) : (
                        <span className="text-purple-300">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredEvents.length === 0 && (
              <div className="p-10 text-center text-purple-400">
                没有找到匹配的活动
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventsList;
