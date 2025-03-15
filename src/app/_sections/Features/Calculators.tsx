import { DotPattern } from '@/components/ui/dot-pattern'
import { SparklesCore } from '@/components/ui/sparkles'
import { cn } from '@/lib/utils'
import { MoveRightIcon } from 'lucide-react'

export default function CalculatorsFeature() {
  return (
    <div className="relative flex size-full min-h-[9rem] items-center justify-center">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]'
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-32">
          <div className="absolute -left-10 top-0 h-1/2 w-10 translate-y-1/2">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={800}
              className="h-full w-full"
              particleColor="#000000"
            />
          </div>
          <div className="absolute left-0 top-0 h-1/2 w-[2px] translate-y-1/2 bg-gradient-to-b from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute left-0 top-0 h-1/2 w-px translate-y-1/2 bg-gradient-to-b from-transparent via-indigo-500 to-transparent" />
          <div className="absolute left-0 top-0 h-1/3 w-[3px] translate-y-full bg-gradient-to-b from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute left-0 top-0 h-1/3 w-px translate-y-full bg-gradient-to-b from-transparent via-sky-500 to-transparent"></div>
        </div>
      </div>

      <div className="flex w-full items-center space-x-2">
        <p
          className={cn(
            '[mask-image:linear-gradient(to_right,#000_50%,transparent)]',
            'w-1/2 whitespace-nowrap text-lg font-semibold slashed-zero lining-nums tracking-tight text-gray-500'
          )}
        >
          BMI = weight (kg) / height<sup>2</sup> (m)
        </p>
        <div className="relative flex h-40 w-1/2 items-center justify-end overflow-hidden [mask-image:linear-gradient(to_left,#000_50%,transparent)]">
          <div
            className={cn(
              'h-8 w-1/2 min-w-44 rounded-md border border-gray-600',
              'bg-gradient-to-r from-orange-500 via-lime-500 to-sky-500',
              'flex items-end space-x-6'
            )}
          >
            {Array.from({ length: 7 }).map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  'w-px bg-gray-500',
                  idx % 2 === 0 ? 'h-full' : 'h-1/2'
                )}
              ></div>
            ))}
          </div>
          <div className="absolute right-0 top-0 flex -translate-x-10 translate-y-1/2 flex-col items-center">
            <p className="text-sm">Normal</p>
            <MoveRightIcon className="h-4 w-4 rotate-90" />
          </div>
          <div className="absolute bottom-0 right-0 flex -translate-x-3 -translate-y-[275%] space-x-6 text-xs text-gray-600">
            <p>34.9</p>
            <p>29.9</p>
            <p>24.9</p>
            <p>18.5</p>
          </div>
        </div>
      </div>
    </div>
  )
}
