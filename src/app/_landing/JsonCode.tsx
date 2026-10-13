import { Fragment } from 'react'

const TOKEN =
  /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g

/** JSON text with its keys, strings and numbers told apart by color */
export function JsonCode({ text }: { text: string }) {
  const nodes: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null

  TOKEN.lastIndex = 0
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))

    const [whole, string, colon, literal] = match

    if (string && colon) {
      nodes.push(
        <span key={match.index} className="text-steel-light">
          {string}
        </span>,
        colon
      )
    } else if (string) {
      nodes.push(
        <span key={match.index} className="text-volt">
          {string}
        </span>
      )
    } else {
      nodes.push(
        <span
          key={match.index}
          className={literal ? 'text-steel' : 'text-volt'}
        >
          {whole}
        </span>
      )
    }
    last = match.index + whole.length
  }
  if (last < text.length) nodes.push(text.slice(last))

  return (
    <>
      {nodes.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
    </>
  )
}
