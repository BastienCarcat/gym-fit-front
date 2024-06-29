import { Divider, Skeleton } from '@nextui-org/react'

export default function LoadingExercise() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
      <div className="flex items-end gap-3">
        <Skeleton className="h-8 w-1/2 rounded-md" />
      </div>

      <div className="mt-3 text-xs text-gray-900">
        <div className="flex items-start gap-1">
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
        <div className="mt-2 flex items-start gap-1">
          <Skeleton className="h-4 w-80 rounded-md" />
        </div>
      </div>

      <Divider className="my-2" />
      <div className="mt-5 flex gap-6">
        <div className="flex gap-6">
          <div className="min-w-48">
            <Skeleton className="h-6 w-24 rounded-md" />

            <div className="mt-3">
              <Skeleton className="h-5 w-full rounded-md" />
              <Skeleton className="mt-2 h-5 w-full rounded-md" />
              <Skeleton className="mt-2 h-5 w-full rounded-md" />
            </div>

            <Divider className="my-3" />

            <Skeleton className="h-6 w-24 rounded-md" />

            <div className="mt-3">
              <Skeleton className="h-5 w-full rounded-md" />
              <Skeleton className="mt-2 h-5 w-full rounded-md" />
            </div>
          </div>

          <Divider orientation="vertical" />
        </div>

        <div className="flex-1">
          <Skeleton className="h-6 w-24 rounded-md" />

          <div className="p-3">
            <ul role="list">
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    {index + 1 !== 3 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
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
