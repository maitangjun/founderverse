import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";

interface TeamMember {
  name: string;
  role: string;
  background: string;
  achievements: string;
}

interface Competitor {
  id: string;
  name: string;
  category: string;
  foundedYear: number;
  yearsInOperation: number;
  founder: string;
  foundingBackground: string;
  foundingTeamInfo?: string;
  foundingTeamMembers?: TeamMember[];
  region: string;
  targetUsers: string;
  scale: string;
  coverage: string;
  positioning: string;
  coreActivities: string | Array<{ name: string; description: string; link?: string }>;
  frequency: string;
  contentSystem: string;
  investmentResources: string;
  businessModel: string;
  onlinePlatform: string;
  membershipThreshold: string;
  estimatedRevenue?: string;
  differentiation: string;
  keyHighlight: string;
  website: string;
  socialMedia?: Record<string, string | undefined>;
}

interface CategoryInfo {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface CompetitorCardProps {
  competitor: Competitor;
  categoryInfo?: CategoryInfo;
}

export default function CompetitorCard({
  competitor,
  categoryInfo,
}: CompetitorCardProps) {
  const [, navigate] = useLocation();
  
  const handleCardClick = () => {
    navigate(`/competitor?id=${competitor.id}`);
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer bg-white border border-purple-100 hover:border-purple-300 hover:-translate-y-1 group"
      onClick={handleCardClick}
    >
      <div className="p-4 border-b border-purple-50">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-lg text-purple-900 leading-tight flex-1">
            {competitor.name}
          </h3>
          {categoryInfo && (
            <Badge className="whitespace-nowrap bg-purple-100 text-purple-900 border-0 text-xs px-3 py-1">
              {categoryInfo.name}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>成立于 {competitor.foundedYear}年</span>
          <span className="text-purple-300">•</span>
          <span>{competitor.region}</span>
        </div>
      </div>

      <div className="p-4 flex-1 space-y-3">
        <div>
          <p className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-1">
            创始团队
          </p>
          <p className="text-sm text-purple-700 leading-relaxed">
            {competitor.foundingTeamInfo || competitor.foundingBackground || "暂无信息"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-1">
            目标用户
          </p>
          <p className="text-sm text-purple-700 leading-relaxed">
            {competitor.targetUsers}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
            <p className="text-xs text-purple-500 mb-0.5">规模</p>
            <p className="text-sm font-medium text-purple-900">
              {competitor.scale}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
            <p className="text-xs text-purple-500 mb-0.5">覆盖</p>
            <p className="text-sm font-medium text-purple-900">
              {competitor.coverage}
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
          <p className="text-xs font-medium text-purple-900 mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            核心价值
          </p>
          <p className="text-sm text-purple-700 leading-relaxed">
            {competitor.keyHighlight}
          </p>
        </div>

        {competitor.businessModel && (
          <div>
            <p className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-1">
              商业模式
            </p>
            <p className="text-sm text-purple-700 leading-relaxed">
              {competitor.businessModel}
            </p>
          </div>
        )}

        {competitor.estimatedRevenue && (
          <div>
            <p className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-1">
              营收预估
            </p>
            <p className="text-sm text-purple-700 leading-relaxed">
              {competitor.estimatedRevenue}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white px-4 py-3 border-t border-purple-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 truncate flex-1">
            点击查看详情
          </span>
          <span className="flex items-center gap-1.5 text-purple-700 group-hover:text-purple-900 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Card>
  );
}
