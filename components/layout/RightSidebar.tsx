// components/layout/RightSidebar.tsx
import Link from "next/link";
import { getFeaturedPersons, getPersonCount } from "@/lib/data";
import { resolveImageSrc } from "@/lib/utils";

export function RightSidebar() {
  const featured = getFeaturedPersons().slice(0, 4);
  const count = getPersonCount();

  return (
    <div className="space-y-3">
      {/* Stats card */}
      <div className="bg-white rounded-xl card-shadow p-4">
        <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-3">
          Familjen
        </h3>
        <div className="space-y-2">
          {[
            { label: "Personer", value: count },
            { label: "Generationer", value: 4 },
            { label: "År historia", value: "200+" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">{label}</span>
              <span className="text-sm font-semibold text-text-primary">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured persons card */}
      {featured.length > 0 && (
        <div className="bg-white rounded-xl card-shadow p-4">
          <h3 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-3">
            Kända personer
          </h3>
          <div className="space-y-3">
            {featured.map((person) => {
              const isKarin = person.side === "Karins sida";
              return (
                <Link
                  key={person.id}
                  href={`/people/${person.id}`}
                  className="flex items-center gap-2.5 group"
                >
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border"
                    style={{
                      borderColor: isKarin ? "#D9C07A" : "#B8D4B0",
                      background: isKarin ? "#FBF7EC" : "#EFF5EC",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImageSrc(person.image, person.id, person.gender)}
                      alt={person.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="text-sm font-medium group-hover:underline"
                    style={{ color: isKarin ? "#8B6A10" : "#1E3A1E" }}
                  >
                    {person.firstName}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
