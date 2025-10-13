'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'technical' | 'support';
}

const faqItems: FaqItem[] = [
  {
    id: '1',
    question: 'What is Keyshare?',
    answer:
      'Keyshare is a secure platform for sharing secrets with colleagues using short-lived, one-time codes. It lets you share API keys, tokens, and passwords without using insecure channels like Slack or email.',
    category: 'general',
  },
  {
    id: '2',
    question: 'How secure is Keyshare?',
    answer:
      'Very secure! Keyshare uses AES-256-GCM encryption for secrets, HMAC-SHA256 for code hashing, and never stores secrets in plaintext. Codes expire after 10 minutes (configurable) and can only be used once. Rate limiting protects against brute-force attacks.',
    category: 'general',
  },
  {
    id: '3',
    question: 'How do I share a secret?',
    answer:
      "Run 'keyshare init' in your terminal, paste your secret, and you'll get an 8-character code (e.g., AB12XY9Q). Share this code with your colleague through any channel. The code expires after 10 minutes and can only be used once.",
    category: 'technical',
  },
  {
    id: '4',
    question: 'How do I retrieve a shared secret?',
    answer:
      "Run 'keyshare fetch' and enter the code you received. The secret will be written to your .env file automatically. You can also use flags like --no-write to just display it, or --env-file to specify a different file.",
    category: 'technical',
  },
  {
    id: '5',
    question: 'Can I revoke a share before it expires?',
    answer:
      "Yes! Run 'keyshare revoke --code AB12XY9Q' to immediately revoke a share. This is useful if you shared a code by mistake or the recipient no longer needs access.",
    category: 'technical',
  },
  {
    id: '6',
    question: 'What happens if someone tries to brute-force codes?',
    answer:
      "Keyshare has built-in rate limiting (max 5 attempts per minute by default) and tracks failed attempts. After 5 failed attempts, the share is automatically locked. All attempts are logged with IP addresses and timestamps.",
    category: 'technical',
  },
  {
    id: '7',
    question: 'Can I use Keyshare in my company?',
    answer:
      'Absolutely! Keyshare is open-source and can be self-hosted. Deploy it with Docker Compose, configure your own master encryption key, and use HTTPS/TLS in production. Perfect for teams that need secure secret sharing.',
    category: 'general',
  },
  {
    id: '8',
    question: 'How can I contribute to Keyshare?',
    answer:
      'We welcome contributions! You can contribute by improving the CLI, adding features to the server, fixing bugs, or enhancing documentation. Check our GitHub repository at github.com/FuadTesfaye/keyshare-package for contribution guidelines.',
    category: 'support',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'technical', label: 'Technical' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'support', label: 'Support' },
];

export default function Faq2() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFaqs =
    activeCategory === 'all'
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-black min-h-screen text-white relative flex flex-col justify-center">
      {/* Background effects matching hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black/70 to-gray-950 blur-3xl"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="absolute top-20 -left-20 h-60 w-60 rounded-full bg-purple-600/20 blur-[100px]"></div>
        <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-blue-600/20 blur-[100px]"></div>
      </div>
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-20">
        <div className="mb-12 flex flex-col items-center">
          <Badge
            variant="outline"
            className="border-primary mb-4 px-3 py-1 text-xs font-medium tracking-wider uppercase"
          >
            FAQs
          </Badge>

          <h2 className="text-foreground mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="text-muted-foreground max-w-2xl text-center">
            Find answers to common questions about Keyshare and how to
            securely share secrets with your team.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  'border-border h-fit overflow-hidden rounded-xl border',
                  expandedId === faq.id
                    ? 'shadow-3xl bg-card/50'
                    : 'bg-card/50',
                )}
                style={{ minHeight: '88px' }}
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <h3 className="text-foreground text-lg font-medium">
                    {faq.question}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    {expandedId === faq.id ? (
                      <MinusIcon className="text-primary h-5 w-5" />
                    ) : (
                      <PlusIcon className="text-primary h-5 w-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-border border-t px-6 pt-2 pb-6">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a
            href="#"
            className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 font-medium transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
