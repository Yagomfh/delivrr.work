import { createFileRoute } from "@tanstack/react-router";
import {
  useSession,
  signOut,
  authClient,
} from "@/integrations/better-auth/auth-client";
import { MainCard } from "@/components/cards/main-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistance } from "date-fns";
import {
  Monitor,
  Smartphone,
  Tablet,
  LogOut,
  Trash2,
  Shield,
  Clock,
  MapPin,
  MonitorDot,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_app/settings/_settings/security")({
  head: () => ({
    meta: [
      {
        title: "Security Settings | delivrr.work",
      },
      {
        name: "description",
        content:
          "Manage your active sessions, security settings, and account access.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/settings/security`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // Fetch all sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const result = await authClient.listSessions();
      return result.data || [];
    },
  });

  // Revoke session mutation
  const revokeSession = useMutation({
    mutationFn: async (token: string) => {
      await authClient.revokeSession({ token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Session revoked successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to revoke session"
      );
    },
  });

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      window.location.href = "/sign-in";
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to sign out"
      );
    }
  };

  const currentSessionToken = session?.session?.token;
  const currentSession = sessions.find((s) => s.token === currentSessionToken);
  const otherSessions = sessions.filter((s) => s.token !== currentSessionToken);

  const getDeviceIcon = (userAgent?: string | null) => {
    if (!userAgent) return Monitor;
    const ua = userAgent.toLowerCase();
    if (
      ua.includes("mobile") ||
      ua.includes("android") ||
      ua.includes("iphone")
    ) {
      return Smartphone;
    }
    if (ua.includes("tablet") || ua.includes("ipad")) {
      return Tablet;
    }
    return Monitor;
  };

  const getDeviceName = (
    userAgent?: string | null,
    ipAddress?: string | null
  ) => {
    if (!userAgent) return "Unknown Device";
    const ua = userAgent.toLowerCase();

    // Browser detection
    let browser = "Unknown Browser";
    if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
    else if (ua.includes("firefox")) browser = "Firefox";
    else if (ua.includes("safari") && !ua.includes("chrome"))
      browser = "Safari";
    else if (ua.includes("edg")) browser = "Edge";
    else if (ua.includes("opera")) browser = "Opera";

    // OS detection
    let os = "";
    if (ua.includes("windows")) os = "Windows";
    else if (ua.includes("mac")) os = "macOS";
    else if (ua.includes("linux")) os = "Linux";
    else if (ua.includes("android")) os = "Android";
    else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad"))
      os = "iOS";

    const deviceInfo = os ? `${os} • ${browser}` : browser;
    return ipAddress ? `${deviceInfo} • ${ipAddress}` : deviceInfo;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Current Session */}
      {currentSession && (
        <MainCard.Root className="p-6 flex flex-col gap-4">
          <MainCard.Header>
            <div className="flex items-center gap-3">
              <MainCard.Icon>
                <Shield className="size-5 text-primary" />
              </MainCard.Icon>
              <div className="flex flex-col gap-1">
                <MainCard.Title>Current Session</MainCard.Title>
                <MainCard.Description>
                  This is your active session
                </MainCard.Description>
              </div>
            </div>
            <Badge
              variant="default"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Active
            </Badge>
          </MainCard.Header>

          <MainCard.Content>
            {(() => {
              const DeviceIcon = getDeviceIcon(currentSession.userAgent);
              return (
                <DeviceIcon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
              );
            })()}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {getDeviceName(
                  currentSession.userAgent,
                  currentSession.ipAddress
                )}
              </p>
              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>
                    {formatDistance(
                      new Date(currentSession.createdAt),
                      new Date(),
                      { addSuffix: true }
                    )}
                  </span>
                </div>
                {currentSession.ipAddress && (
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    <span>{currentSession.ipAddress}</span>
                  </div>
                )}
              </div>
            </div>
          </MainCard.Content>

          <MainCard.Footer>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="w-fit"
            >
              <LogOut className="size-4" />
              Sign Out
            </Button>
          </MainCard.Footer>
        </MainCard.Root>
      )}

      {/* Other Active Sessions */}
      <MainCard.Root className="p-6 flex flex-col gap-4">
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon>
              <MonitorDot className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Active Sessions</MainCard.Title>
              <MainCard.Description>
                Manage your active sessions across devices
              </MainCard.Description>
            </div>
          </div>
          {otherSessions.length > 0 && (
            <Badge variant="secondary">
              {otherSessions.length}{" "}
              {otherSessions.length === 1 ? "session" : "sessions"}
            </Badge>
          )}
        </MainCard.Header>

        <MainCard.Content>
          {isLoading ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">
                Loading sessions...
              </p>
            </div>
          ) : otherSessions.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">
                No other active sessions
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              {otherSessions.map((sessionItem, index) => {
                const DeviceIcon = getDeviceIcon(sessionItem.userAgent);
                const isRevoking =
                  revokeSession.isPending &&
                  revokeSession.variables === sessionItem.token;

                return (
                  <div key={sessionItem.id}>
                    <div className="flex items-start gap-3">
                      <DeviceIcon className="size-4 text-muted-foreground mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">
                          {getDeviceName(
                            sessionItem.userAgent,
                            sessionItem.ipAddress
                          )}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="size-3" />
                            <span>
                              {formatDistance(
                                new Date(sessionItem.createdAt),
                                new Date(),
                                { addSuffix: true }
                              )}
                            </span>
                          </div>
                          {sessionItem.ipAddress && (
                            <div className="flex items-center gap-1">
                              <MapPin className="size-3" />
                              <span>{sessionItem.ipAddress}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => revokeSession.mutate(sessionItem.token)}
                        disabled={isRevoking}
                        className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="size-4" />
                        {isRevoking ? "Revoking..." : "Revoke"}
                      </Button>
                    </div>
                    {index < otherSessions.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </MainCard.Content>
      </MainCard.Root>
    </div>
  );
}
