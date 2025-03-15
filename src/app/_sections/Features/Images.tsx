import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useMemo } from 'react'

export default function ImagesFeature() {
  const images = useMemo(
    () => [
      {
        src: '/ex_squat_image.png'
      },
      {
        src: '/ex_bench_press_image.png'
      },
      {
        src: '/ex_front_squat_image.png'
      },
      {
        src: '/ex_leg_curl_image.png'
      },
      {
        src: '/ex_plank_image.png'
      }
    ],
    []
  )
  return (
    <div className="relative h-full min-h-[9rem] w-full overflow-hidden">
      <Marquee pauseOnHover className="absolute top-0 h-full [--duration:20s]">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={cn(
              'relative w-40 cursor-pointer overflow-hidden rounded-xl border px-1',
              'border-neutral-200 bg-neutral-50',
              'transform-gpu transition-all duration-300 ease-out hover:scale-[1.1]'
            )}
          >
            <div className="relative size-full">
              <Image
                src={img.src}
                alt="avatar"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
