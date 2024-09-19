// app/posts/[id]/page.tsx
import { useRouter } from 'next/router';

const posts = [
  { id: '1', title: 'First Blog Post', content: 'This is the first post' },
  { id: '2', title: 'Second Blog Post', content: 'This is the second post' },
  { id: '3', title: 'Third Blog Post', content: 'This is the third post' },
];

export default function PostPage({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
