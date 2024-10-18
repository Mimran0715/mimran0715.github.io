import { BlogPosts } from 'app/components/posts'
import Image from 'next/image';
import './global.css' // Adjust the path to match your CSS file location

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
      <Image
     src="/nextjs-github-pages/vercel.svg"
     alt="Vercel Logo"
     width={100}
     height={24}
     priority
   />
    </section>
  )
}
