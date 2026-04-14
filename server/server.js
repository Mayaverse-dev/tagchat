import express from 'express'
import { createHash } from 'crypto'
import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 8420

const PASSWORD_HASH = createHash('sha256').update('avatigaman').digest('hex')
const RELEASES_DIR = join(__dirname, 'releases')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function checkAuth(req, res, next) {
  const token = req.headers['x-auth-token'] || req.query.token || req.cookies?.token
  if (token === PASSWORD_HASH) return next()

  const auth = req.headers.authorization
  if (auth) {
    const decoded = Buffer.from(auth.replace('Basic ', ''), 'base64').toString()
    const [, pass] = decoded.split(':')
    if (pass === 'avatigaman') {
      res.cookie?.('token', PASSWORD_HASH, { httpOnly: true, maxAge: 86400000 })
      return next()
    }
  }
  return res.status(401).send('Unauthorized')
}

function getLatestVersion() {
  if (!existsSync(RELEASES_DIR)) return null
  const dirs = readdirSync(RELEASES_DIR)
    .filter(d => statSync(join(RELEASES_DIR, d)).isDirectory())
    .sort()
    .reverse()
  return dirs[0] || null
}

function findFile(version, patterns) {
  const dir = join(RELEASES_DIR, version)
  if (!existsSync(dir)) return null
  const files = readdirSync(dir)
  for (const pattern of patterns) {
    const match = files.find(f => f.includes(pattern))
    if (match) return join(dir, match)
  }
  return null
}

// Landing page (no auth needed to see the page)
app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, 'landing.html'))
})

// Auth check endpoint
app.post('/auth', (req, res) => {
  const { password } = req.body
  if (password === 'avatigaman') {
    res.json({ token: PASSWORD_HASH })
  } else {
    res.status(401).json({ error: 'Wrong password' })
  }
})

// Download endpoints (auth required)
app.get('/download/mac', checkAuth, (_req, res) => {
  const version = getLatestVersion()
  if (!version) return res.status(404).send('No releases available')
  const file = findFile(version, ['.dmg'])
  if (!file) return res.status(404).send('macOS build not found')
  res.download(file)
})

app.get('/download/windows', checkAuth, (_req, res) => {
  const version = getLatestVersion()
  if (!version) return res.status(404).send('No releases available')
  const file = findFile(version, ['.exe', '.msi'])
  if (!file) return res.status(404).send('Windows build not found')
  res.download(file)
})

// Tauri updater endpoint — no auth (the app itself calls this)
app.get('/update/:target/:current_version', (req, res) => {
  const { target, current_version } = req.params
  const latest = getLatestVersion()

  if (!latest || latest === current_version) {
    return res.status(204).send()
  }

  const isMac = target.includes('darwin') || target.includes('macos')
  const isWin = target.includes('windows')

  let sigFile, updateFile, platform
  if (isMac) {
    platform = 'macos'
    updateFile = findFile(latest, ['.app.tar.gz'])
    sigFile = findFile(latest, ['.app.tar.gz.sig'])
  } else if (isWin) {
    platform = 'windows'
    updateFile = findFile(latest, ['.nsis.zip'])
    sigFile = findFile(latest, ['.nsis.zip.sig'])
  }

  if (!updateFile || !sigFile) {
    return res.status(204).send()
  }

  const sig = readFileSync(sigFile, 'utf-8').trim()
  const host = req.headers.host
  const proto = req.headers['x-forwarded-proto'] || 'http'

  res.json({
    version: latest,
    notes: `TagChat v${latest}`,
    pub_date: new Date().toISOString(),
    platforms: {
      [target]: {
        signature: sig,
        url: `${proto}://${host}/artifacts/${latest}/${updateFile.split('/').pop()}`
      }
    }
  })
})

// Serve update artifacts (no auth — Tauri updater needs direct access)
app.use('/artifacts', express.static(RELEASES_DIR))

// Version info
app.get('/api/version', (_req, res) => {
  const version = getLatestVersion()
  res.json({ version: version || '0.0.0', available: !!version })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`TagChat download server running on http://localhost:${PORT}`)
  console.log(`Releases dir: ${RELEASES_DIR}`)
  const v = getLatestVersion()
  if (v) console.log(`Latest version: ${v}`)
  else console.log('No releases found — place builds in server/releases/<version>/')
})
