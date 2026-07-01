type StatCardProps = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-blue-900/20 bg-gradient-to-br from-blue-700 to-navy-900 p-6 transition-colors duration-200 hover:border-white/30">
      <p className="font-mono text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{label}</p>
    </div>
  );
}
