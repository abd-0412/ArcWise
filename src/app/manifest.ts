import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ARCWISE',
    short_name: 'ARCWISE',
    description: 'Predictive Arc-Fault and Contact Overheating Interception System',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a', // Tailwind slate-900 (deep blue/navy tone)
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
