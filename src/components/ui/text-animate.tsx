'use client'

import { AnimatePresence, motion, MotionProps, Variants } from 'motion/react'
import { ElementType } from 'react'

import { cn } from '@/lib/utils'

type AnimationType = 'text' | 'word' | 'character' | 'line'
type AnimationVariant =
  | 'fadeIn'
  | 'blurIn'
  | 'blurInUp'
  | 'blurInDown'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleUp'
  | 'scaleDown'

type SegmentClassName = Record<string, string>

interface TextAnimateProps extends MotionProps {
  /**
   * The text content to animate
   */
  children: string
  /**
   * The class name to be applied to the component
   */
  className?: string
  /**
   * The class name to be applied to each segment
   */
  segmentClassName?: SegmentClassName
  /**
   * The delay before the animation starts
   */
  delay?: number
  /**
   * The duration of the animation
   */
  duration?: number
  /**
   * Custom motion variants for the animation
   */
  variants?: Variants
  /**
   * The element type to render
   */
  as?: ElementType
  /**
   * How to split the text ("text", "word", "character")
   */
  by?: AnimationType
  /**
   * Whether to start animation when component enters viewport
   */
  startOnView?: boolean
  /**
   * Whether to animate only once
   */
  once?: boolean
  /**
   * The animation preset to use
   */
  animation?: AnimationVariant
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06
}

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3
        }
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 }
      }
    }
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.3
        }
      },
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        transition: { duration: 0.3 }
      }
    }
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 }
        }
      },
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        y: 20,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 }
        }
      }
    }
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: -20 },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 }
        }
      }
    }
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.3
        }
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.3
        }
      }
    }
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 }
      },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.3 }
      }
    }
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 }
      },
      exit: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 }
      }
    }
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 }
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.3 }
      }
    }
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 300
          }
        }
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.3 }
      }
    }
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 300
          }
        }
      },
      exit: {
        scale: 1.5,
        opacity: 0,
        transition: { duration: 0.3 }
      }
    }
  }
}

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  as: Component = 'p',
  startOnView = true,
  once = false,
  by = 'word',
  animation = 'fadeIn',
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion.create(Component)

  let segments: string[] = []

  switch (by) {
    case 'word':
      segments = children.split(/(\s+)/)
      break
    case 'character':
      segments = children.split('')
      break
    case 'line':
      segments = children.split('\n')
      break
    case 'text':
    default:
      segments = [children]
      break
  }

  const showVariant = defaultItemAnimationVariants[animation].item.show

  const finalVariants = animation
    ? {
        container: {
          ...defaultItemAnimationVariants[animation].container,
          show: {
            ...defaultItemAnimationVariants[animation].container.show,
            transition: {
              delayChildren: delay,
              staggerChildren: duration / segments.length
            }
          },
          exit: {
            ...defaultItemAnimationVariants[animation].container.exit,
            transition: {
              staggerChildren: duration / segments.length,
              staggerDirection: -1
            }
          }
        },

        item: {
          ...defaultItemAnimationVariants[animation].item,
          show: {
            ...defaultItemAnimationVariants[animation].item.show,
            transition: {
              ...((typeof showVariant !== 'function' &&
                showVariant.transition) ||
                {}),
              ...(segments.length <= 1 && { duration: duration })
            }
          }
        }
      }
    : { container: defaultContainerVariants, item: defaultItemVariants }

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        animate={startOnView ? undefined : 'show'}
        className={cn('whitespace-pre-wrap', className)}
        exit="exit"
        initial="hidden"
        variants={finalVariants.container}
        viewport={{ once }}
        whileInView={startOnView ? 'show' : undefined}
        {...props}
      >
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            className={cn(
              by === 'line' ? 'block' : 'inline-block whitespace-pre',
              by === 'character' && '',
              segmentClassName?.[`${segment}-${i}`] || ''
            )}
            custom={i * staggerTimings[by]}
            variants={finalVariants.item}
          >
            {segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  )
}
