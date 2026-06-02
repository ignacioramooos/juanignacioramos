export type ImageFrame = "cover" | "contain";

export interface BlogImageMeta {
  alt: string;
  frame: ImageFrame;
  title?: string;
  url: string;
}

export interface BlogPostImageSource {
  content: string;
  cover_image_url: string | null;
  slug: string;
  title: string;
}

export const coverFramePattern = /<!--\s*cover-frame:\s*(cover|contain)\s*-->\s*/i;
export const markdownImagePattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;

const fullCoverSlugs = new Set(["post-1780430259463"]);

export const getFrameFromTitle = (title?: string | null): ImageFrame =>
  title === "frame:contain" ? "contain" : "cover";

export const getCoverFrame = (post: BlogPostImageSource): ImageFrame => {
  const explicitFrame = post.content.match(coverFramePattern)?.[1] as ImageFrame | undefined;
  if (explicitFrame) return explicitFrame;
  return fullCoverSlugs.has(post.slug) ? "contain" : "cover";
};

export const setCoverFrame = (content: string, frame: ImageFrame) => {
  const marker = `<!-- cover-frame: ${frame} -->`;
  const cleanContent = content.replace(coverFramePattern, "").trimStart();
  return `${marker}\n\n${cleanContent}`.trimEnd();
};

export const getPublicContent = (content: string) => content.replace(coverFramePattern, "").trimStart();

export const getPostImages = (post: BlogPostImageSource): BlogImageMeta[] => {
  const images = new Map<string, BlogImageMeta>();

  if (post.cover_image_url) {
    images.set(post.cover_image_url, {
      alt: `${post.title} cover`,
      frame: getCoverFrame(post),
      url: post.cover_image_url,
    });
  }

  for (const match of post.content.matchAll(markdownImagePattern)) {
    const [, alt, url, title] = match;
    images.set(url, {
      alt: alt || post.title || "Blog image",
      frame: getFrameFromTitle(title),
      title,
      url,
    });
  }

  return Array.from(images.values());
};

export const formatMarkdownImage = (image: Pick<BlogImageMeta, "alt" | "url">, frame: ImageFrame) =>
  `![${image.alt}](${image.url} "frame:${frame}")`;

export const setMarkdownImageFrame = (content: string, imageUrl: string, frame: ImageFrame) =>
  content.replace(markdownImagePattern, (match, alt: string, url: string) => {
    if (url !== imageUrl) return match;
    return formatMarkdownImage({ alt: alt || "Blog image", url }, frame);
  });
