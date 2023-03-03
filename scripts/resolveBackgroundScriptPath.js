import path from 'path'
import fs from 'fs'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function main() {
  const manifestFile = fs.readFileSync(path.resolve(__dirname, '../dist/manifest.json'), 'utf8')
  const viteManifestFile = fs.readFileSync(path.resolve(__dirname, '../dist/vite-manifest.json'), 'utf8')

  if (!manifestFile || !viteManifestFile) return 1

  const manifest = JSON.parse(manifestFile)
  const viteManifest = JSON.parse(viteManifestFile)

  manifest.background.service_worker = viteManifest[manifest.background.service_worker].file

  const rewritedManifest = JSON.stringify(manifest, null, 2)
  fs.writeFileSync(path.resolve(__dirname, '../dist/manifest.json'), rewritedManifest)
}

main()
