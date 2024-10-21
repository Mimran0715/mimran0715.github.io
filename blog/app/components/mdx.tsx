import { MDXRemote, MDXRemoteProps, MDXRemoteSerializeResult } from 'next-mdx-remote'
//import { MDXComponents } from 'mdx/types'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import Image from 'next/image'
import { highlight } from 'sugar-high'
import React from 'react'

// Custom types for Table component
type TableData = {
  headers: string[]
  rows: string[][]
}

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

// Define the props for CustomLink with correct types
type CustomLinkProps = {
  href: string
  children: React.ReactNode
}

// Adjust the CustomLink component to handle the 'href' properly
function CustomLink({ href, children, ...props }: CustomLinkProps) {
  // Ensure href is provided as a string
  if (typeof href !== 'string') {
    return null // Safeguard against undefined or non-string href
  }

  // Internal links (starts with '/') should use Next.js Link
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  // Anchor links (starts with '#') should be rendered as anchor tags
  if (href.startsWith('#')) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  // External links should open in a new tab
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

// RoundedImage Component
type RoundedImageProps = {
  src: string
  alt: string
}

function RoundedImage({ src, alt }: RoundedImageProps) {
  return <Image alt={alt} src={src} className="rounded-lg" />
}

// // Code Highlighting Component
// function Code({ children, ...props }: { children: string }) {
//   let codeHTML = highlight(children)
//   return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
// }


// Define the props
type CodeProps = React.HTMLAttributes<HTMLElement> & {
  children: string
}

// Code component that returns React nodes without using dangerouslySetInnerHTML
function Code({ children, ...props }: CodeProps) {
  // Split highlighted code into lines and wrap each line in <span>
  const highlightedCode = highlight(children).split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ))

  return (
    <code {...props}>
      {highlightedCode}
    </code>
  )
}

// Slugify function for headings
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

// Heading generation function
// function createHeading(level: number) {
//   const Heading = ({ children }: { children: string }) => {
//     let slug = slugify(children)
//     return React.createElement(
//       `h${level}`,
//       { id: slug },
//       [
//         React.createElement('a', {
//           href: `#${slug}`,
//           key: `link-${slug}`,
//           className: 'anchor',
//         }),
//       ],
//       children
//     )
//   }
//   Heading.displayName = `Heading${level}`
//   return Heading
// }

function createHeading(level: number) {
  const Heading: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
    children,
    ...props
  }) => {
    const slug = slugify(children?.toString() || '')

    return React.createElement(
      `h${level}`,
      { id: slug, ...props }, // Spread the rest of the props
      [
        <a href={`#${slug}`} key={`link-${slug}`} className="anchor" />,
        children, // Render the children inside the heading
      ]
    )
  }

  Heading.displayName = `Heading${level}`
  return Heading
}


//Define MDX components
const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  // a: CustomLink,
  // code: Code,
  Table,
}

// type CustomMDXProps = MDXRemoteProps & {
//   components?: MDXComponents
// }

// Define the props for CustomMDX
type CustomMDXProps = {
  source: MDXRemoteSerializeResult // Correct typing for MDXRemote source
  components?: MDXComponents
}

// export function CustomMDX(props: CustomMDXProps) {
//   return (
//     <MDXRemote
//       {...props}
//       components={{ ...components, ...(props.components || {}) }}
//     />
//   )
// }

export function CustomMDX({ source, components: customComponents }: CustomMDXProps) {
  return (
    <MDXRemote
      {...source}
      components={{ ...components, ...(customComponents || {}) }}
    />
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}