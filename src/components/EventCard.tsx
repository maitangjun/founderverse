import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin } from "lucide-react";

interface Event {
  id: number;
  region: string;
  country: string;
  name: string;
  focus: string;
  website: string | null;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="bg-white border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group h-full">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 font-normal text-xs">
                {event.region}
              </Badge>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.country}
              </span>
            </div>
            <h3 className="text-base font-semibold text-purple-900 leading-tight mb-2 group-hover:text-purple-700 transition-colors">
              {event.name}
            </h3>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {event.focus}
        </p>
        
        {event.website && (
          <a
            href={`https://${event.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            访问官网
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}
