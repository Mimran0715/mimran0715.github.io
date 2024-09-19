import Image from "next/image";

export default function Home() {
  const posts = [
    { id: '1', title: 'First Blog Post', content: 'This is the first post' },
    { id: '2', title: 'Second Blog Post', content: 'This is the second post' },
    { id: '3', title: 'Third Blog Post', content: 'This is the third post' },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-2xl font-bold">My Blog</h1>
        <ul className="list-disc">
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Footer links and content */}
      </footer>
    </div>
  );
}


