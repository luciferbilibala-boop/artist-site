import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    coverImage: z.string(),
    description: z.string().optional(),
    coverAltText: z.string().optional(),
    order: z.number(),
    category: z.string(),
    images: z.array(z.object({
      src: z.string(),
      id: z.string().optional(),
      caption: z.string().optional(),
      width: z.number().optional(),
      altText: z.string().optional(),
      artworkType: z.string().optional(),
      medium: z.string().optional(),
      dimensions: z.string().optional(),
      year: z.string().optional(),
      description: z.string().optional(),
    })).optional(),
    detailImages: z.array(z.object({
      src: z.string(),
      id: z.string().optional(),
      caption: z.string().optional(),
      altText: z.string().optional(),
    })).optional(),
    diptychImages: z.array(z.object({
      src: z.string(),
      id: z.string().optional(),
      caption: z.string().optional(),
      altText: z.string().optional(),
      artworkType: z.string().optional(),
      medium: z.string().optional(),
      dimensions: z.string().optional(),
      year: z.string().optional(),
    })).optional(),
    exhibitionImages: z.array(z.object({
      src: z.string(),
      id: z.string().optional(),
      caption: z.string().optional(),
      altText: z.string().optional(),
    })).optional(),
    publishedAt: z.date().optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    category: z.string(),
    coverImage: z.string().optional(),
    type: z.enum(['text', 'image-text', 'video']),
    videoUrl: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const archive = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    video: z.string().optional(),
    category: z.enum(['秩序', '物证', '失控']),
    tags: z.array(z.string()),
    excerpt: z.string(),
    location: z.string().optional(),
  }),
});

const studio = defineCollection({
  type: 'content',
  schema: z.object({
    sourceSeries: z.string(),
    sourceWork: z.string(),
    sourceImage: z.string(),
    availability: z.enum(['Available', 'Private Collection']),
    signature: z.string().optional(),
    certificate: z.boolean().optional(),
    framingStatus: z.string().optional(),
    collectorNote: z.string().optional(),
    inquiryLink: z.string().optional(),
  }),
});

export const collections = { works, notes, archive, studio };
