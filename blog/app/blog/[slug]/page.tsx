import NotFound from 'app/components/not-found';
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { Metadata } from 'next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'


export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

//export function generateMetadata({ params }) {
export function generateMetadata({ params }: { params: { slug: string } }): Metadata | undefined {  
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
interface BlogParams {
  params: {
    slug: string;
  };
}

// Update the Blog component to handle serialized MDX content
export default async function Blog({ params }: BlogParams) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    return <NotFound />;
  }

  // Serialize the MDX content
  const mdxSource: MDXRemoteSerializeResult = await serialize(post.content)

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        {/* Pass the serialized content to CustomMDX */}
        <CustomMDX source={mdxSource} />
      </article>
    </section>
  )
}

// //export default function Blog({ params }) {
// export default function Blog({ params }: BlogParams) {
//   let post = getBlogPosts().find((post) => post.slug === params.slug)

//   if (!post) {
//     return <NotFound />;
//   }

//   return (
//     <section>
//       <script
//         type="application/ld+json"
//         suppressHydrationWarning
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             '@context': 'https://schema.org',
//             '@type': 'BlogPosting',
//             headline: post.metadata.title,
//             datePublished: post.metadata.publishedAt,
//             dateModified: post.metadata.publishedAt,
//             description: post.metadata.summary,
//             image: post.metadata.image
//               ? `${baseUrl}${post.metadata.image}`
//               : `/og?title=${encodeURIComponent(post.metadata.title)}`,
//             url: `${baseUrl}/blog/${post.slug}`,
//             author: {
//               '@type': 'Person',
//               name: 'My Portfolio',
//             },
//           }),
//         }}
//       />
//       <h1 className="title font-semibold text-2xl tracking-tighter">
//         {post.metadata.title}
//       </h1>
//       <div className="flex justify-between items-center mt-2 mb-8 text-sm">
//         <p className="text-sm text-neutral-600 dark:text-neutral-400">
//           {formatDate(post.metadata.publishedAt)}
//         </p>
//       </div>
//       <article className="prose">
//         <CustomMDX source={post.content} />
//       </article>
//     </section>
//   )
// }
