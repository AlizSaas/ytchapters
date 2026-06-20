import { buttonVariants } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon, Sparkles, Zap, TrendingUp, Film } from 'lucide-react'
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='overflow-hidden'>
      <MaxWidthWrapper>
        <div className='py-24 md:py-32 relative text-center'>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered YouTube Chapters
          </div>
          <h1 className='text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60'>
            Easy timestamps for your YouTube videos
          </h1>
          <p className='mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            Generate timestamps for your YouTube videos and Shorts with ease.
            Just paste your video URL and let AI create perfect chapters instantly.
          </p>
          <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link href={'/signin'}
              className={buttonVariants({
                variant: 'default',
                size: 'lg',
                className: 'group px-8 h-12 text-base'
              })}>
              Get Started Free
              <ArrowRightIcon className='ml-2 h-4 w-4 group-hover:translate-x-1 transition' />
            </Link>
            <Link
              href={'/about'}
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
                className: 'px-8 h-12 text-base'
              })}
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[
            {
              icon: Sparkles,
              title: 'AI-Powered Timestamps',
              description: 'Our AI automatically generates accurate timestamps for your video content.',
            },
            {
              icon: Film,
              title: 'Videos & Shorts',
              description: 'Works with both regular YouTube videos and YouTube Shorts.',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Generate chapters in seconds. Just paste a URL and you\'re done.',
            },
            {
              icon: TrendingUp,
              title: 'SEO Boost',
              description: 'Timestamps improve your video SEO and make content more discoverable.',
            }
          ].map((feature, index) => (
            <div
              className='bg-card border border-border p-6 rounded-xl hover:shadow-md hover:border-primary/30 transition-all duration-300'
              key={index}
            >
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>
              <p className='text-muted-foreground text-sm leading-relaxed'>{feature.description}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>

      <div className='bg-gradient-to-b from-background to-secondary/20 py-24 md:py-32 mt-16'>
        <MaxWidthWrapper>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>See it in action</h2>
            <p className='text-lg text-muted-foreground max-w-xl mx-auto'>
              Generate professional timestamps for any YouTube video or Short in just a few clicks.
            </p>
          </div>

          <div className='relative max-w-3xl mx-auto'>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-xl" />
            <Image
              width={800}
              height={450}
              src={'/laptop.png'}
              alt='demo image'
              className='relative rounded-xl shadow-2xl border border-border'
            />
          </div>

          <div className="mt-16 text-center">
            <Link
              href={'/signin'}
              className={buttonVariants({
                variant: 'default',
                size: 'lg',
                className: 'px-8 h-12 text-base'
              })}
            >
              Start generating chapters
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  )
}
