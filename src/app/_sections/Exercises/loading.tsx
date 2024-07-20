import { Divider, Skeleton } from '@nextui-org/react'

export default function LoadingExercise() {
  return (
    <div className="flex h-[550px] flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="flex items-end gap-3">
        <Skeleton className="h-8 w-96 rounded-md" />
      </div>

      <div className="mt-3 text-xs text-gray-900">
        <div className="flex items-start gap-1">
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
      </div>

      <Divider className="my-2" />
      <div className="flex flex-col-reverse gap-6 overflow-hidden md:h-full md:flex-row">
        <div className="hidden w-48 flex-col md:flex">
          <Skeleton className="h-6 w-24 rounded-md" />
          <div className="min-h-[50%] flex-1 overflow-auto">
            <Skeleton className="mt-2 h-5 w-full rounded-md" />
            <Skeleton className="mt-2 h-5 w-1/2 rounded-md" />
            <Skeleton className="mt-2 h-5 w-3/5 rounded-md" />
            <Skeleton className="mt-2 h-5 w-3/5 rounded-md" />
            <Skeleton className="mt-2 h-5 w-full rounded-md" />
            <Skeleton className="mt-2 h-5 w-3/4 rounded-md" />
          </div>
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="mt-2 h-5 w-full rounded-md" />
          <Skeleton className="mt-2 h-5 w-3/4 rounded-md" />
        </div>

        <div className="flex max-h-[174px] gap-x-3 overflow-auto md:hidden">
          <div className="flex-1 overflow-auto">
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="mt-2 h-5 w-1/2 rounded-md" />
            <Skeleton className="mt-2 h-5 w-full rounded-md" />
            <Skeleton className="mt-2 h-5 w-3/4 rounded-md" />
            <Skeleton className="mt-2 h-5 w-full rounded-md" />
          </div>
          <div className="flex-1 overflow-auto">
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="mt-2 h-5 w-full rounded-md" />
            <Skeleton className="mt-2 h-5 w-full rounded-md" />
          </div>
        </div>

        <div
          className="h-divider w-full shrink-0 border-none bg-divider md:mt-5 md:h-auto md:w-divider"
          role="separator"
        />

        <div className="max-h-52 flex-1 overflow-auto md:max-h-none">
          <Skeleton className="h-6 w-24 rounded-md" />

          <div className="p-3">
            <ul>
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="pb-8 last:pb-0">
                  <div className="relative">
                    {index + 1 !== 3 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-4 top-5 -ml-px h-full w-0.5 bg-gray-200"
                      />
                    )}

                    <div className="relative flex space-x-3">
                      <div>
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <Skeleton className="h-4 w-full rounded-md" />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
