import { useLocation } from "wouter";
import { ArrowLeft, Globe, Zap, ExternalLink, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import data from "@/data/competitors.json";

interface TeamMember {
  name: string;
  role: string;
  background: string;
  achievements: string;
}

export default function CompetitorDetail() {
  const [, navigate] = useLocation();
  
  const params = new URLSearchParams(window.location.search);
  const competitorId = params.get("id");
  
  const competitor = data.competitors.find((c) => c.id === competitorId);
  const category = competitor ? data.categories.find((cat) => cat.id === competitor.category) : null;

  if (!competitor || !category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-purple-900 mb-4">社区未找到</h1>
          <Button onClick={() => navigate("/hub")} className="bg-purple-600 hover:bg-purple-700">
            返回社区列表
          </Button>
        </div>
      </div>
    );
  }

  const basicInfo = [
    { label: "创始人", value: competitor.founder },
    { label: "成立时间", value: `${competitor.foundedYear}年·${competitor.yearsInOperation}年` },
    { label: "地区", value: competitor.region },
    { label: "用户规模", value: competitor.scale },
    { label: "目标用户", value: competitor.targetUsers },
    { label: "覆盖城市", value: competitor.coverage },
  ];

  const businessInfo = [
    { label: "投资资源", value: competitor.investmentResources },
    { label: "商业模式", value: competitor.businessModel },
    { label: "线上平台", value: competitor.onlinePlatform },
    { label: "会员门槛", value: competitor.membershipThreshold },
    { label: "年营收预估", value: competitor.estimatedRevenue || "暂无公开数据" },
    { label: "差异化", value: competitor.differentiation },
  ];

  const renderContentSystem = (content: any) => {
    if (!content) return null;
    
    if (typeof content === "string") {
      return <p className="text-purple-800 leading-relaxed text-xs">{content}</p>;
    }
    
    const items = [];
    if (content.courses?.length) {
      items.push(
        <div key="courses">
          <p className="text-xs font-medium text-purple-700 mb-1">课程</p>
          <div className="space-y-1">
            {content.courses.map((c: any, i: number) => (
              c.link ? (
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:text-purple-800 underline">{c.name}</a>
              ) : (
                <p key={i} className="text-xs text-purple-800">{c.name}</p>
              )
            ))}
          </div>
        </div>
      );
    }
    if (content.podcasts?.length) {
      items.push(
        <div key="podcasts">
          <p className="text-xs font-medium text-purple-700 mb-1">播客</p>
          <div className="space-y-1">
            {content.podcasts.map((p: any, i: number) => (
              p.link ? (
                <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:text-purple-800 underline">{p.name}</a>
              ) : (
                <p key={i} className="text-xs text-purple-800">{p.name}</p>
              )
            ))}
          </div>
        </div>
      );
    }
    if (content.interviews?.length) {
      items.push(
        <div key="interviews">
          <p className="text-xs font-medium text-purple-700 mb-1">采访</p>
          <div className="space-y-1">
            {content.interviews.map((i: any, idx: number) => (
              i.link ? (
                <a key={idx} href={i.link} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:text-purple-800 underline">{i.name}</a>
              ) : (
                <p key={idx} className="text-xs text-purple-800">{i.name}</p>
              )
            ))}
          </div>
        </div>
      );
    }
    if (content.media?.length) {
      items.push(
        <div key="media">
          <p className="text-xs font-medium text-purple-700 mb-1">媒体</p>
          <div className="space-y-1">
            {content.media.map((m: any, i: number) => (
              m.link ? (
                <a key={i} href={m.link} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:text-purple-800 underline">{m.name}</a>
              ) : (
                <p key={i} className="text-xs text-purple-800">{m.name}</p>
              )
            ))}
          </div>
        </div>
      );
    }
    
    return items.length > 0 ? <div className="space-y-2">{items}</div> : null;
  };

  const socialLinks = [];
  if (competitor.website) socialLinks.push({ name: "官网", href: competitor.website, icon: <Globe className="w-3 h-3" /> });
  if (competitor.socialMedia?.linkedin) socialLinks.push({ name: "LinkedIn", href: competitor.socialMedia.linkedin, icon: "in" });
  if ((competitor.socialMedia as any)?.x) socialLinks.push({ name: "X", href: (competitor.socialMedia as any).x, icon: "x" });
  if ((competitor.socialMedia as any)?.twitter) socialLinks.push({ name: "Twitter", href: (competitor.socialMedia as any).twitter, icon: "x" });
  if (competitor.socialMedia?.facebook) socialLinks.push({ name: "Facebook", href: competitor.socialMedia.facebook, icon: "f" });
  if (competitor.socialMedia?.instagram) socialLinks.push({ name: "Instagram", href: competitor.socialMedia.instagram, icon: "ig" });
  if (competitor.socialMedia?.luma) socialLinks.push({ name: "Luma", href: competitor.socialMedia.luma, icon: "l" });

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-purple-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/hub")}
              className="gap-1 text-purple-700 hover:text-purple-800 hover:bg-purple-50 p-2 h-auto"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-purple-900 truncate">{competitor.name}</h1>
              <p className="text-gray-500 text-xs truncate">{competitor.positioning}</p>
            </div>
            <Badge className="text-xs px-2 py-0.5 bg-purple-100 text-purple-900 border-0 shrink-0">
              {category.name}
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-3">
          <Card className="p-3 bg-purple-50 border-purple-100 rounded-lg">
            <h2 className="text-xs font-semibold text-purple-900 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-900" />
              核心价值
            </h2>
            <p className="text-purple-800 leading-relaxed text-xs">{competitor.keyHighlight}</p>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {basicInfo.map((info, idx) => (
              <Card key={idx} className="p-2.5 border-purple-100 rounded-lg">
                <p className="text-[10px] text-purple-500 mb-0.5">{info.label}</p>
                <p className="text-xs text-purple-900 leading-tight">{info.value}</p>
              </Card>
            ))}
          </div>

          {Array.isArray(competitor.coreActivities) && competitor.coreActivities.length > 0 && (
            <Card className="p-3 border-purple-100 rounded-lg">
              <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-2">核心活动</h3>
              <div className="space-y-2">
                {competitor.coreActivities.map((activity, actIdx) => (
                  <div key={actIdx} className="border border-purple-100 rounded-lg p-2.5 bg-purple-50">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-purple-900 text-xs">{activity.name}</h4>
                      {activity.link && (
                        <a
                          href={activity.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-700 hover:text-purple-900 text-[10px] flex items-center gap-0.5 font-medium"
                        >
                          链接
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-purple-800 text-xs leading-relaxed">{activity.description}</p>
                    {(activity as any).frequency && (
                      <p className="text-[10px] text-purple-600 mt-1">频率：{(activity as any).frequency}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {competitor.contentSystem && (
            <Card className="p-3 border-purple-100 rounded-lg">
              <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-2">内容体系</h3>
              {renderContentSystem(competitor.contentSystem)}
            </Card>
          )}

          <div className="grid grid-cols-2 gap-2">
            {businessInfo.map((info, idx) => (
              <Card key={idx} className="p-2.5 border-purple-100 rounded-lg">
                <p className="text-[10px] text-purple-500 mb-0.5">{info.label}</p>
                <p className="text-xs text-purple-900 leading-tight">{info.value}</p>
              </Card>
            ))}
          </div>

          {socialLinks.length > 0 && (
            <Card className="p-3 border-purple-100 rounded-lg">
              <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" />
                官方链接
              </h3>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs transition-colors"
                  >
                    {typeof link.icon === "string" ? (
                      <span className="text-[10px] font-medium">{link.icon}</span>
                    ) : (
                      link.icon
                    )}
                    {link.name}
                  </a>
                ))}
              </div>
            </Card>
          )}

          {(competitor as any).foundingTeamMembers && (competitor as any).foundingTeamMembers.length > 0 && (
            <Card className="p-3 border-purple-100 rounded-lg">
              <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-2">创始团队</h3>
              <div className="space-y-2">
                {(competitor as any).foundingTeamMembers.map((member: TeamMember, memberIdx: number) => (
                  <div key={memberIdx} className="border border-purple-100 rounded-lg p-2.5 bg-purple-50">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-900 font-semibold text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-900 text-xs">{member.name}</h4>
                        <p className="text-[10px] text-purple-600">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-purple-800 text-xs leading-relaxed">{member.background}</p>
                    {member.achievements && (
                      <p className="text-[10px] text-purple-600 mt-1">成就：{member.achievements}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {competitor.pressCoverage && competitor.pressCoverage.length > 0 && (
            <Card className="p-3 border-purple-100 rounded-lg">
              <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-2">媒体报道</h3>
              <div className="space-y-2">
                {competitor.pressCoverage.map((coverage: any, idx: number) => (
                  <a
                    key={idx}
                    href={coverage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-purple-100 rounded-lg p-2.5 hover:border-purple-200 transition-colors bg-purple-50 hover:bg-purple-100"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-purple-900 text-xs">{coverage.title}</h4>
                      <span className="text-[10px] text-purple-500">{coverage.source}</span>
                    </div>
                    <p className="text-purple-800 text-xs leading-relaxed">{coverage.description}</p>
                    {coverage.date && (
                      <p className="text-[10px] text-purple-500 mt-1">{coverage.date}</p>
                    )}
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
