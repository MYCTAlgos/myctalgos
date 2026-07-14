type ServiceCardProps = {
  title: string;
  description: string;
};

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <div className="group rounded-2xl border border-navy-900/10 bg-mist-50 p-8 transition-colors duration-200 hover:border-blue-500/40">
      <div className="mb-6 h-px w-8 bg-blue-500" />
      <h3 className="mb-3 text-lg font-medium text-navy-900">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-500">{description}</p>
    </div>
  );
}
