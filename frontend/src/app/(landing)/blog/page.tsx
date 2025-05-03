import Link from 'next/link';
import type { Metadata } from 'next';
import { getPosts, Post } from '@/lib/posts'; // Import from the new location
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

// Add static generation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day (in seconds)

export const metadata: Metadata = {
  title: "Blog | scrive - AI Thumbnail Maker",
  description: "Read articles about sketching thumbnails, using an AI thumbnail maker, and improving your content creation workflow.",
  alternates: {
    canonical: "https://scrive.pro/blog", // Replace with your actual domain
  },
  keywords: ['sketching thumbnails', 'ai thumbnail maker', 'thumbnail design', 'content creation'],
  openGraph: {
    title: "Blog | scrive - AI Thumbnail Maker",
    description: "Expert tips and guides for creating eye-catching thumbnails with sketching and AI tools.",
    url: "https://scrive.pro/blog",
    siteName: "scrive - AI Thumbnail Maker",
    images: [
      {
        url: "https://scrive.pro/logo.png",
        width: 1200,
        height: 630,
        alt: "scrive AI Thumbnail Maker Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | scrive - AI Thumbnail Maker",
    description: "Expert tips and guides for creating eye-catching thumbnails with sketching and AI tools.",
    images: ["https://scrive.pro/logo.png"],
  },
};

// Helper function to create an excerpt (you can customize this)
const createExcerpt = (content: string, length: number = 150): string => {
  // Remove markdown headings, images, etc. for a cleaner excerpt
  const plainText = content
    .replace(/^#+\s+.*/gm, '') // Remove headings
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\*\*|\*|_|`/g, '') // Remove markdown formatting
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  if (plainText.length <= length) {
    return plainText;
  }
  return plainText.substring(0, length) + '...';
};

const BlogIndexPage = () => {
  const posts = getPosts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-12 md:mb-16 text-center">
        scrive Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
            <Card className="h-full flex flex-col rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.frontmatter.title}
                </CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400 pt-1">
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                  {/* Use excerpt from frontmatter if available, otherwise generate one */}
                  {post.frontmatter.excerpt || createExcerpt(post.content)}
                </p>
              </CardContent>
              <CardFooter>
                <span className="flex items-center text-blue-600 dark:text-blue-400 group-hover:underline font-medium">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogIndexPage;
