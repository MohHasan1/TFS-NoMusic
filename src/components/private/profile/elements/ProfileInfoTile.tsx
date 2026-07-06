export function ProfileInfoTile({ helper, icon: Icon, label, value }: TProps) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/40 p-4">
      <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary-400">
        <Icon className="size-4.5" />
      </div>
      <p className="text-xs uppercase tracking-[0.18em] text-primary-300/80">{label}</p>
      <p className="mt-2 text-base font-medium text-primary-200">{value}</p>
      <p className="mt-1 text-sm leading-relaxed text-foreground/70">{helper}</p>
    </div>
  );
}

type TProps = {
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
};
