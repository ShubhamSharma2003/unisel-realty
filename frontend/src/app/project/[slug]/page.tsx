import { readFileSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return [
    { slug: 'oberoi-realty-gurgaon' }
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const titles: Record<string, string> = {
    'oberoi-realty-gurgaon': 'Oberoi Realty Exclusive Launch — Ultra Luxury, Sector 58 Gurugram',
  };

  const descriptions: Record<string, string> = {
    'oberoi-realty-gurgaon': 'Explore Oberoi Realty exclusive launch project in Sector 58, Gurugram. Ultra-luxury properties with world-class amenities.',
  };

  return {
    title: titles[slug] || 'Project',
    description: descriptions[slug] || 'Explore our exclusive projects',
    robots: { index: true, follow: true },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const htmlPath = join(process.cwd(), 'src', 'app', 'project', `${slug}.html`);
    const htmlContent = readFileSync(htmlPath, 'utf-8');

    return (
      <IframeWrapper htmlContent={htmlContent} />
    );
  } catch (error) {
    notFound();
  }
}

function IframeWrapper({ htmlContent }: { htmlContent: string }) {
  return (
    <iframe
      srcDoc={htmlContent}
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
        display: 'block',
      }}
      title="Project Page"
    />
  );
}