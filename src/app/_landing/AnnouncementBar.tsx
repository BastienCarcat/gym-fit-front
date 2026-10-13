import { siteConfig } from '@/config/site'

/** Announces the v2 above the navigation. To remove once the launch is old news. */
export function AnnouncementBar() {
  return (
    <div className="bg-volt text-ink">
      <p className="mx-auto max-w-7xl px-4 py-2 text-center text-sm sm:px-6 lg:px-8">
        <span className="font-extrabold">The v2 is here:</span>{' '}
        <span className="hidden md:inline">
          5,800 exercises to filter by muscle, equipment and category, each with
          its muscle heatmap.
        </span>
        <span className="md:hidden">5,800 exercises and muscle heatmaps.</span>{' '}
        <a
          className="whitespace-nowrap font-bold underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          href={siteConfig.documentation_url}
          rel="noreferrer"
          target="_blank"
        >
          Explore the v2 <span aria-hidden="true">→</span>
        </a>
      </p>
    </div>
  )
}
