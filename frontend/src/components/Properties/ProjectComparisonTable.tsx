import Link from "next/link";
import { MICROMARKETS } from "@/lib/micromarkets";
import type { PropertyHomes } from "@/types/properyHomes";

/**
 * CMS prices are typed freehand ("₹ 5.40 Cr", "2.98 CR " + "Onwards",
 * "12 Cr Onwards"). Normalise them to one style for a scannable table.
 */
export function formatRate(rate?: string, priceLabel?: string): string {
  const text = (rate ?? "")
    .replace(/₹\s*/g, "")
    .replace(/\bcr\b/gi, "Cr")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "On request";
  if (!/\d/.test(text)) return text;
  const label =
    priceLabel && !text.toLowerCase().includes(priceLabel.toLowerCase()) ? ` ${priceLabel}` : "";
  return `₹${text}${label}`;
}

const ProjectComparisonTable = ({
  projects,
  caption,
}: {
  projects: PropertyHomes[];
  caption: string;
}) => (
  <div className="overflow-x-auto rounded-2xl border border-dark/10 dark:border-white/10">
    <table className="w-full min-w-[640px] text-left text-sm md:text-base">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-dark/5 dark:bg-white/10 text-dark dark:text-white">
        <tr>
          <th scope="col" className="px-4 py-3 font-semibold">Project</th>
          <th scope="col" className="px-4 py-3 font-semibold">Location</th>
          <th scope="col" className="px-4 py-3 font-semibold">Configuration</th>
          <th scope="col" className="px-4 py-3 font-semibold">Starting price</th>
          <th scope="col" className="px-4 py-3 font-semibold">HARERA registration</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-dark/10 dark:divide-white/10 text-dark/80 dark:text-white/80">
        {projects.map((project) => {
          const market = project.micromarket ? MICROMARKETS[project.micromarket] : undefined;
          return (
            <tr key={project._id}>
              <th scope="row" className="px-4 py-3 font-medium text-dark dark:text-white">
                <Link href={`/properties/${project.slug}`} className="hover:text-primary underline-offset-4 hover:underline">
                  {project.name}
                </Link>
              </th>
              <td className="px-4 py-3">
                {market ? (
                  <Link href={`/location/${project.micromarket}`} className="hover:text-primary">
                    {market.displayName}
                  </Link>
                ) : (
                  project.location
                )}
              </td>
              <td className="px-4 py-3">{project.configuration || "–"}</td>
              <td className="px-4 py-3 whitespace-nowrap">{formatRate(project.rate, project.priceLabel)}</td>
              <td className="px-4 py-3">
                {project.reraNumber ? (
                  <span className="font-mono text-xs md:text-sm">{project.reraNumber}</span>
                ) : (
                  "Registered"
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default ProjectComparisonTable;
