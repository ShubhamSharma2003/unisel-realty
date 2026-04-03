export const revalidate = false // Disable ISR - render dynamically

import fs from 'fs'
import path from 'path'

export default function OberioPage() {
  const htmlPath = path.join(process.cwd(), 'src/app/project/oberoi-realty-gurgaon.html')
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8')

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
