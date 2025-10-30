import ParticlesComponent from '@/components/particles';
import SettingsForm from '@/components/ui/settings-form';
import StatusBarContainer from '@/components/status-bar/container';
import { FFmpegProvider } from '@/lib/ffmpeg-provider';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { SettingsProvider } from '@/lib/settings-provider';
import { StatusBarProvider } from '@/lib/status-bar/context';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { CountryProvider } from '@/lib/country-provider';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap'
});

export const metadata: Metadata = {
    metadataBase: new URL('https://www.qobuz-dl.com/'), // Site URL
    title: {
        default: process.env.NEXT_PUBLIC_APPLICATION_NAME + ' - A frontend browser client for downloading music for Qobuz.',
        template: process.env.NEXT_PUBLIC_APPLICATION_NAME!
    },
    description: 'A frontend browser client for downloading music for Qobuz.',
    openGraph: {
        images:
            process.env.NEXT_PUBLIC_APPLICATION_NAME!.toLowerCase() === 'qobuz-dl'
                ? [{ url: '/logo/qobuz-banner.png', width: 650, height: 195, alt: 'Qobuz Logo' }]
                : []
    },
    keywords: [
        `${process.env.NEXT_PUBLIC_APPLICATION_NAME!}`,
        'music',
        'downloader',
        'hi-res',
        'qobuz',
        'flac',
        'alac',
        'mp3',
        'aac',
        'opus',
        'wav',
        'qobuz download'
    ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${inter.className} antialiased`} suppressHydrationWarning>
                <FFmpegProvider>
                    <CountryProvider>
                        <StatusBarProvider>
                            <SettingsProvider>
                                <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
                                    <ParticlesComponent className='z-[-1] h-full w-full fixed' />
                                    <div className='fixed justify-between items-start flex w-full max-w-screen p-4 z-[10]'>
                                        <div className='flex flex-col gap-2'>
                                            <SettingsForm />
                                        </div>
                                    </div>
                                    <div className='flex flex-col min-h-screen'>
                                        <main className='px-6 pb-12 pt-32 md:pt-24 2xl:pt-60 min-h-full flex-1 flex flex-col items-center justify-center gap-2 z-[2] overflow-x-hidden max-w-screen overflow-y-hidden'>
                                            {children}
                                        </main>
                                        <Toaster />
                                        <StatusBarContainer />
                                    </div>
                                </ThemeProvider>
                            </SettingsProvider>
                        </StatusBarProvider>
                        <script src='https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.9.7/dist/ffmpeg.min.js'></script>
                        <script src='https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.js'></script>
                    </CountryProvider>
                </FFmpegProvider>
                <Analytics />
            </body>
        </html>
    );
}
