'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { BorderBeam } from '@/components/ui/border-beam';
import { CardHoverEffect } from '@/components/ui/pulse-card';
import {
  Globe,
  Users,
  Heart,
  Lightbulb,
  Sparkles,
  Rocket,
  Target,
} from 'lucide-react';

interface AboutUsProps {
  title?: string;
  subtitle?: string;
  mission?: string;
  vision?: string;
  values?: Array<{
    title: string;
    description: string;
    icon: keyof typeof iconComponents;
  }>;
  className?: string;
}

const iconComponents = {
  Users: Users,
  Heart: Heart,
  Lightbulb: Lightbulb,
  Globe: Globe,
  Sparkles: Sparkles,
  Rocket: Rocket,
  Target: Target,
};

const defaultValues: AboutUsProps['values'] = [
  {
    title: 'Security First',
    description:
      'AES-256-GCM encryption, HMAC-SHA256 code hashing, and secrets never stored in plaintext. Your data is protected by military-grade security.',
    icon: 'Lightbulb',
  },
  {
    title: 'Developer Friendly',
    description:
      'Simple CLI with beautiful output, clipboard support, and optional QR codes. Share secrets in seconds, not minutes.',
    icon: 'Users',
  },
  {
    title: 'Short-Lived & One-Time',
    description:
      'Codes expire after 10 minutes (configurable) and can only be used once. Automatic cleanup ensures no lingering secrets.',
    icon: 'Sparkles',
  },
  {
    title: 'Rate Limited',
    description:
      'Protection against brute-force attacks with configurable rate limiting, attempt tracking, and comprehensive audit logs.',
    icon: 'Globe',
  },
];

export default function AboutUs1() {
  const aboutData = {
    title: 'About Keyshare',
    subtitle:
      'A secure, developer-friendly platform for sharing secrets with colleagues using short-lived, one-time codes.',
    mission:
      'Our mission is to eliminate insecure secret sharing via Slack, email, or unencrypted channels. We provide developers with a simple, secure way to share API keys, tokens, and passwords that expires automatically and can only be used once.',
    vision:
      'We envision a world where sharing secrets is as easy as sharing a link, but infinitely more secure. Where developers never have to choose between convenience and security.',
    values: defaultValues,
    className: 'relative overflow-hidden py-20',
  };

  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, amount: 0.1 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.1 });

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-black text-white">
      {/* Background effects matching hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black/70 to-gray-950 blur-3xl"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="absolute top-20 -left-20 h-60 w-60 rounded-full bg-purple-600/20 blur-[100px]"></div>
        <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-blue-600/20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h1 className="bg-gradient-to-r from-white/70 via-white to-slate-500/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            {aboutData.title}
          </h1>
          <p className="text-slate-300/90 mt-6 text-xl">
            {aboutData.subtitle}
          </p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div ref={missionRef} className="relative mx-auto mb-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative z-10 grid gap-12 md:grid-cols-2"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="group border-purple-500/20 relative block overflow-hidden rounded-2xl border bg-black/40 p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="via-purple-500/40 from-transparent to-transparent"
              />

              <div className="from-purple-500/20 to-purple-500/5 mb-6 inline-flex aspect-square h-16 w-16 flex-1 items-center justify-center rounded-2xl bg-gradient-to-br backdrop-blur-sm">
                <Rocket className="text-purple-400 h-8 w-8" />
              </div>

              <div className="space-y-4">
                <h2 className="from-purple-400/90 to-purple-400/70 mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                  Our Mission
                </h2>

                <p className="text-slate-300/90 text-lg leading-relaxed">
                  {aboutData.mission}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="group border-blue-500/20 relative block overflow-hidden rounded-2xl border bg-black/40 p-10 backdrop-blur-3xl"
            >
              <BorderBeam
                duration={8}
                size={300}
                className="from-transparent via-blue-500/40 to-transparent"
                reverse
              />
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 backdrop-blur-sm">
                <Target className="h-8 w-8 text-blue-400" />
              </div>

              <h2 className="mb-4 bg-gradient-to-r from-blue-400/90 to-blue-400/70 bg-clip-text text-3xl font-bold text-transparent">
                Our Vision
              </h2>

              <p className="text-slate-300/90 text-lg leading-relaxed">
                {aboutData.vision}
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div ref={valuesRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            <h2 className="bg-gradient-to-r from-white/70 via-white to-slate-500/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Our Core Values
            </h2>
            <p className="text-slate-300/90 mx-auto mt-4 max-w-2xl text-lg">
              The principles that guide everything we do and every decision we
              make.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutData.values?.map((value, index) => {
              const IconComponent = iconComponents[value.icon];

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.2,
                    ease: 'easeOut',
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <CardHoverEffect
                    icon={<IconComponent className="h-6 w-6" />}
                    title={value.title}
                    description={value.description}
                    variant={
                      index === 0
                        ? 'purple'
                        : index === 1
                          ? 'blue'
                          : index === 2
                            ? 'amber'
                            : 'rose'
                    }
                    glowEffect={true}
                    size="lg"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
