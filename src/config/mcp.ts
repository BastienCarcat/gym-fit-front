import { siteConfig } from '@/config/site'

/** The MCP server of the API (gym-fit-api: src/mcp) */
export const MCP_URL = `${siteConfig.api_url}/mcp`

/** The same server for the assistants that sign in with OAuth (Claude, ChatGPT) */
export const MCP_OAUTH_URL = 'https://mcp.gymfit-api.com/mcp'

export const MCP_SERVER_NAME = 'gymfit'

/** The page of the site that presents the MCP server */
export const MCP_PAGE_PATH = '/mcp'

export const KEY_PLACEHOLDER = 'YOUR_API_KEY'

/** What an assistant can do with the server, one line per group of tools */
export const MCP_TOOLS = [
  'Search the 5,800 exercises with filters, and read one in full',
  'Find alternatives to an exercise, easier and harder versions',
  'Draw the muscle heatmap of an exercise as an SVG',
  'Search the muscles and their groups',
  'Calculate BMR, TDEE, BMI and ideal body weight',
  'Read your usage and what is left of your quota'
]

export interface McpClient {
  id: string
  name: string
  /** Where the configuration goes */
  where: string
  snippet: (key: string) => string
  /** Opens the client with the server to add, for the clients that have such a link */
  installUrl?: (key: string) => string
}

const headers = (key: string) => ({ 'X-API-Key': key })

const json = (value: unknown) => JSON.stringify(value, null, 2)

/** The clients that take a key in a header; each names its fields its own way */
export const MCP_CLIENTS: McpClient[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    where: 'Run it in a terminal, in your project',
    snippet: (key) =>
      `claude mcp add --transport http ${MCP_SERVER_NAME} ${MCP_URL} \\\n  --header "X-API-Key: ${key}"`
  },
  {
    id: 'cursor',
    name: 'Cursor',
    where: '~/.cursor/mcp.json, or .cursor/mcp.json in a project',
    snippet: (key) =>
      json({
        mcpServers: {
          [MCP_SERVER_NAME]: { url: MCP_URL, headers: headers(key) }
        }
      }),
    installUrl: (key) =>
      `cursor://anysphere.cursor-deeplink/mcp/install?name=${MCP_SERVER_NAME}&config=${encodeURIComponent(
        btoa(JSON.stringify({ url: MCP_URL, headers: headers(key) }))
      )}`
  },
  {
    id: 'vscode',
    name: 'VS Code',
    where: '.vscode/mcp.json, or "MCP: Open User Configuration"',
    snippet: (key) =>
      json({
        servers: {
          [MCP_SERVER_NAME]: {
            type: 'http',
            url: MCP_URL,
            headers: headers(key)
          }
        }
      }),
    installUrl: (key) =>
      `vscode:mcp/install?${encodeURIComponent(
        JSON.stringify({
          name: MCP_SERVER_NAME,
          type: 'http',
          url: MCP_URL,
          headers: headers(key)
        })
      )}`
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    where: '~/.codeium/windsurf/mcp_config.json',
    snippet: (key) =>
      json({
        mcpServers: {
          [MCP_SERVER_NAME]: { serverUrl: MCP_URL, headers: headers(key) }
        }
      })
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    where: '~/.gemini/settings.json',
    snippet: (key) =>
      json({
        mcpServers: {
          [MCP_SERVER_NAME]: { httpUrl: MCP_URL, headers: headers(key) }
        }
      })
  }
]

/** `gf_` and 43 characters: what the dashboard creates */
export function looksLikeApiKey(value: string): boolean {
  return /^gf_[A-Za-z0-9_-]{43}$/.test(value)
}
