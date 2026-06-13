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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-purple-900 mb-4">社区未找到</h1>
          <Button onClick={() => navigate("/hub")} className="bg-purple-600 hover:bg-purple-700">
            返回社区列表
          </Button>
        </div>
      </div>
    );
  }

  const dimensions = [
    { label: "创始人", value: competitor.founder },
    { label: "成立时间", value: `成立于${competitor.foundedYear}年，已运营${competitor.yearsInOperation}年` },
    { label: "地区", value: competitor.region },
    { label: "目标用户", value: competitor.targetUsers },
    { label: "用户规模", value: competitor.scale },
    { label: "城市覆盖", value: competitor.coverage },
    { label: "创始团队", value: competitor.foundingTeamInfo || competitor.foundingBackground || "暂无信息" },
    { label: "社区定位", value: competitor.positioning },
    { label: "核心活动", value: competitor.coreActivities },
    { label: "活动频率", value: competitor.frequency },
    { label: "内容体系", value: competitor.contentSystem },
    { label: "投资资源", value: competitor.investmentResources },
    { label: "商业模式", value: competitor.businessModel },
    { label: "线上平台", value: competitor.onlinePlatform },
    { label: "会员门槛", value: competitor.membershipThreshold },
    { label: "年营收预估", value: competitor.estimatedRevenue || "暂无公开数据" },
    { label: "差异化", value: competitor.differentiation },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-purple-100 bg-white/95 backdrop-blur-sm">
        <div className="container py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/hub")}
            className="gap-2 mb-4 text-purple-700 hover:text-purple-800 hover:bg-purple-50"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Button>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-purple-900 tracking-tight">{competitor.name}</h1>
              <p className="text-gray-500 mt-1">{competitor.positioning}</p>
            </div>
            <Badge className="text-sm px-3 py-1.5 bg-purple-100 text-purple-900 border-0">
              {category.name}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-6 bg-purple-50 border-purple-100 rounded-xl">
              <h2 className="text-base font-semibold text-purple-900 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-900" />
                核心价值
              </h2>
              <p className="text-purple-800 leading-relaxed text-sm">
                {competitor.keyHighlight}
              </p>
            </Card>

            <Card className="p-6 mt-4 rounded-xl border-purple-100 bg-white">
              <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-4">
                快速信息
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-purple-500 mb-1">创始人</p>
                  <p className="font-medium text-purple-900 text-sm">{competitor.founder}</p>
                </div>
                <div>
                  <p className="text-xs text-purple-500 mb-1">成立时间</p>
                  <p className="font-medium text-purple-900 text-sm">成立于{competitor.foundedYear}年</p>
                  <p className="text-xs text-purple-600">已运营{competitor.yearsInOperation}年</p>
                </div>
                <div>
                  <p className="text-xs text-purple-500 mb-1">用户规模</p>
                  <p className="font-medium text-purple-900 text-sm">{competitor.scale}</p>
                </div>
                <div>
                  <p className="text-xs text-purple-500 mb-1">地理覆盖</p>
                  <p className="font-medium text-purple-900 text-sm">{competitor.region}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 mt-4 rounded-xl border-purple-100 bg-white">
              <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                官方链接
              </h3>
              <div className="space-y-3">
                <a 
                  href={competitor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors group"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">官方网站</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
                {competitor.socialMedia?.linkedin && (
                  <a 
                    href={competitor.socialMedia.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452 h-3.554 v-5.569 c0-1.328-0.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939 v5.667 H9.351 V9 h3.414 v1.561 h0.046 c0.477-0.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455 v6.286z M5.337 7.433 c-1.144 0-2.063-0.926-2.063-2.065 0-1.138 0.92-2.063 2.063-2.063 1.14 0 2.064 0.925 2.064 2.063 0 1.139-0.925 2.065-2.064 2.065zm1.782 13.019 H3.555 V9 h3.564 v11.452zM22.225 0 H1.771 C0.792 0 0 0.774 0 1.729 v20.542 C0 23.227 0.792 24 1.771 24 h20.451 C23.2 24 24 23.227 24 22.271 V1.729 C24 0.774 23.2 0 22.222 0 h0.003z" />
                    </svg>
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                )}
                {(competitor.socialMedia as any)?.x && (
                  <a 
                    href={(competitor.socialMedia as any).x} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25 h3.063 l-6.747 7.728 l7.484 11.772 h-6.189 l-4.883-6.259 l-5.6 6.259 h-3.064 l7.228-8.284 l-7.05-11.516 h6.262 l4.372 5.763 zm-1.441 17.748 h1.696 L6.55 4.199 H4.758 z" />
                    </svg>
                    <span className="text-sm font-medium">X</span>
                  </a>
                )}
                {(competitor.socialMedia as any)?.twitter && (
                  <a 
                    href={(competitor.socialMedia as any).twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25 h3.063 l-6.747 7.728 l7.484 11.772 h-6.189 l-4.883-6.259 l-5.6 6.259 h-3.064 l7.228-8.284 l-7.05-11.516 h6.262 l4.372 5.763 zm-1.441 17.748 h1.696 L6.55 4.199 H4.758 z" />
                    </svg>
                    <span className="text-sm font-medium">Twitter</span>
                  </a>
                )}
                {competitor.socialMedia?.facebook && (
                  <a 
                    href={competitor.socialMedia.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073 c0-6.627-5.373-12-12-12 S0 5.447 0 12.073 c0 5.99 4.388 10.954 10.125 11.854 v-8.385 H7.078 v-3.47 h3.047 V9.43 c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686 0.235 2.686 0.235 v2.953 h-1.526 c-1.491 0-1.956 0.925-1.956 1.874 v2.25 h3.328 l-0.532 3.47 h-2.796 v8.385 C19.612 23.027 24 18.062 24 12.073 z" />
                    </svg>
                    <span className="text-sm font-medium">Facebook</span>
                  </a>
                )}
                {competitor.socialMedia?.instagram && (
                  <a 
                    href={competitor.socialMedia.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163 c3.204 0 3.584 0.012 4.85 0.07 3.252 0.148 4.771 1.691 4.919 4.919 0.058 1.265 0.069 1.645 0.069 4.849 0 3.205-0.012 3.584-0.069 4.849-0.149 3.225-1.664 4.771-4.919 4.919-1.266 0.058-1.644 0.07-4.85 0.07-3.204 0-3.584-0.012-4.849-0.07-3.26-0.149-4.771-1.699-4.919-4.92-0.058-1.265-0.07-1.645-0.07-4.849 0-3.204 0.013-3.583 0.07-4.849 0.149-3.227 1.664-4.771 4.919-4.919 1.266-0.057 1.645-0.069 4.849-0.069zm0-2.163 c-3.259 0-3.667 0.014-4.947 0.072-4.358 0.2-6.78 2.618-6.98 6.98-0.059 1.281-0.073 1.689-0.073 4.948 0 3.259 0.014 3.668 0.072 4.948 0.2 4.358 2.618 6.78 6.98 6.98 1.281 0.058 1.689 0.072 4.948 0.072 3.259 0 3.668-0.014 4.948-0.072 4.354-0.2 6.782-2.618 6.979-6.98 0.059-1.28 0.073-1.689 0.073-4.948 0-3.259-0.014-3.667-0.072-4.947-0.196-4.354-2.617-6.78-6.979-6.98-1.281-0.059-1.69-0.073-4.949-0.073zm0 5.838 c-3.403 0-6.162 2.759-6.162 6.162 s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163 c0-3.403-2.759-6.162-6.162-6.162zm0 10.162 c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4 s4 1.791 4 4 c0 2.21-1.791 4-4 4zm6.406-11.845 c-0.796 0-1.441 0.645-1.441 1.44 s0.645 1.44 1.441 1.44 c0.795 0 1.439-0.645 1.439-1.44 s-0.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                )}
                {competitor.socialMedia?.luma && (
                  <a 
                    href={competitor.socialMedia.luma} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <span className="text-sm font-medium">Luma</span>
                  </a>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4">
              {dimensions.map((dim, idx) => {
                let content;
                if (dim.label === "核心活动" && Array.isArray(competitor.coreActivities)) {
                  content = (
                    <div className="space-y-3">
                      {competitor.coreActivities.map((activity, actIdx) => (
                        <div key={actIdx} className="border border-purple-100 rounded-xl p-4 hover:border-purple-200 transition-colors bg-purple-50">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-purple-900">{activity.name}</h4>
                            {activity.link && (
                              <a
                                href={activity.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-700 hover:text-purple-900 text-sm flex items-center gap-1 font-medium"
                              >
                                访问链接
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-purple-800 leading-relaxed text-sm">{activity.description}</p>
                        </div>
                      ))}
                    </div>
                  );
                } else if (dim.label === "创始团队" && (competitor as any).foundingTeamMembers && (competitor as any).foundingTeamMembers.length > 0) {
                  content = (
                    <div className="space-y-3">
                      {(competitor as any).foundingTeamMembers.map((member: TeamMember, memberIdx: number) => (
                        <div key={memberIdx} className="border border-purple-100 rounded-xl p-4 bg-purple-50">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-900 font-semibold text-base">
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-medium text-purple-900">{member.name}</h4>
                              <p className="text-sm text-purple-600">{member.role}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-1">背景</p>
                              <p className="text-purple-800 leading-relaxed text-sm">{member.background}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-1">成就</p>
                              <p className="text-purple-800 leading-relaxed text-sm">{member.achievements}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                } else if (typeof dim.value === "string") {
                  content = (
                    <p className="text-purple-800 leading-relaxed text-sm">
                      {dim.value}
                    </p>
                  );
                } else {
                  content = null;
                }
                
                return (
                  <div key={idx} className="p-5 rounded-xl border border-purple-100 bg-white hover:border-purple-200 transition-colors">
                    <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-2">
                      {dim.label}
                    </h3>
                    {content}
                  </div>
                );
              })}
              {competitor.pressCoverage && competitor.pressCoverage.length > 0 && (
                <div className="p-5 rounded-xl border border-purple-100 bg-white hover:border-purple-200 transition-colors">
                  <h3 className="text-xs font-semibold text-purple-500 uppercase tracking-wider mb-2">
                    媒体报道
                  </h3>
                  <div className="space-y-3">
                    {competitor.pressCoverage.map((coverage: any, idx: number) => (
                      <a
                        key={idx}
                        href={coverage.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border border-purple-100 rounded-xl p-4 hover:border-purple-200 transition-colors bg-purple-50 hover:bg-purple-100"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-purple-900">{coverage.title}</h4>
                          <span className="text-xs text-purple-500">{coverage.source}</span>
                        </div>
                        <p className="text-purple-800 leading-relaxed text-sm">{coverage.description}</p>
                        {coverage.date && (
                          <p className="text-xs text-purple-500 mt-2">{coverage.date}</p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
