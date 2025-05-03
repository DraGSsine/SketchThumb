/* eslint-disable */

import { getPostBySlug } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default function BlogPost({ params }:  any) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          href="/blog"
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8 font-medium group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        {/* Article header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {formattedDate}
          </p>
        </div>

        {/* Article content */}
        <div className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg prose-img:shadow-md max-w-none text-slate-800 dark:text-slate-200">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* Article footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Link
                href="/blog"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                &larr; Back to all articles
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Tags:
              </span>
              {frontmatter.tags ? (
                frontmatter.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full text-sm">
                    sketching thumbnails
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full text-sm">
                    ai thumbnail maker
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
