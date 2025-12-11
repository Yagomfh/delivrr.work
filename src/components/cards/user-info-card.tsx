import { MainCard } from "@/components/cards/main-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface UserInfoCardProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function UserInfoCard({ name, email, image }: UserInfoCardProps) {
  return (
    <MainCard className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 border-2 border-border">
            <AvatarImage
              src={image || undefined}
              alt={name || ""}
              sizes="64px"
            />
            <AvatarFallback className="text-lg">
              {getInitials(name || "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-base font-medium">{name || "—"}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{email || "—"}</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">
                Member since{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainCard>
  );
}
