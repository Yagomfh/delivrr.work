import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

function Root({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("p-2 rounded-md border border-border bg-card", className)}
    >
      {children}
    </div>
  );
}

function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className={cn("flex items-center justify-between", className)}>
        {children}
      </div>
      <Separator />
    </>
  );
}

function Content({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>{children}</div>
  );
}

function Footer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Separator />
      <div className={cn("", className)}>{children}</div>
    </>
  );
}

function Icon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center size-10 rounded-lg bg-primary/10 border border-primary/20",
        className
      )}
    >
      {children}
    </div>
  );
}

function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={cn("text-sm font-semibold", className)}>{children}</h3>;
}

function Description({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>
  );
}
export const MainCard = {
  Root,
  Header,
  Content,
  Footer,
  Icon,
  Title,
  Description,
};
