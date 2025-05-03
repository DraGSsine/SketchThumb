/* eslint-disable */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  frontmatter: {
    [key: string]:any ;
  };
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export const getPosts = (): Post[] => {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith('.md')) // Ensure we only read markdown files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data,
        content,
      };
    });

  // Sort posts by date in descending order
  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
};

export const getPostBySlug = (slug: string): Post | undefined => {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      frontmatter: data,
      content,
    };
  } catch (error) {
    // Handle case where file doesn't exist
    console.error(`Error reading post ${slug}:`, error);
    return undefined;
  }
};
