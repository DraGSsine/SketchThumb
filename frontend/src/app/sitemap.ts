import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/posts'; // Import the getPosts function

const BASE_URL = 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all posts
  const posts = getPosts();

  // Create sitemap entries for posts
  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, frontmatter }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: frontmatter.date ? new Date(frontmatter.date) : new Date(), // Use post date if available
    changeFrequency: 'weekly', // Or 'monthly' depending on update frequency
    priority: 0.7, // Adjust priority as needed
  }));

  // Combine static and dynamic entries
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Removed duplicate/incomplete static entries
    {
      url: `${BASE_URL}/auth/signin`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...postEntries, // Add the post entries
  ]
}