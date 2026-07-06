import { company } from "@/lib/site-data";

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-[#FFFAF3]/95 px-6 py-3 backdrop-blur-md md:hidden">
      <a
        href={company.phoneHref}
        className="block rounded-full bg-orange-500 py-3 text-center text-sm font-semibold text-white"
      >
        Позвонить: {company.phone}
      </a>
    </div>
  );
}
