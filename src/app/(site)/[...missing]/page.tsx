import { notFound } from 'next/navigation'

/**
 * Unknown paths. With a root layout per language, Next.js answers them with a
 * bare page: this sends them to the 404 of the English layout instead.
 */
export default function MissingPage() {
  notFound()
}
