'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * LexicalRenderer - Renders Lexical JSON to React components
 *
 * Handles all Payload Lexical node types and decorators:
 * - Text with formatting (bold, italic, strikethrough, code)
 * - Paragraphs
 * - Headings (h1-h6)
 * - Lists (ordered and unordered)
 * - Blockquotes
 * - Horizontal rules
 * - Links
 * - Images
 */

const LexicalRenderer = ({ data, className = '' }) => {
  if (!data || !data.root || !data.root.children) {
    return null;
  }

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      {data.root.children.map((node, index) => (
        <RenderNode key={`${node.type}-${index}`} node={node} />
      ))}
    </div>
  );
};

/**
 * Main node renderer - dispatches to specific handlers based on node type
 */
const RenderNode = ({ node }) => {
  switch (node.type) {
    case 'paragraph':
      return <ParagraphNode node={node} />;

    case 'heading':
      return <HeadingNode node={node} />;

    case 'list':
      return <ListNode node={node} />;

    case 'listitem':
      return <ListItemNode node={node} />;

    case 'quote':
      return <BlockquoteNode node={node} />;

    case 'horizontalrule':
      return <HorizontalRuleNode />;

    case 'upload':
      return <UploadNode node={node} />;

    default:
      if (node.children) {
        return (
          <Fragment key={node.type}>
            {node.children.map((child, idx) => (
              <RenderNode key={`${child.type}-${idx}`} node={child} />
            ))}
          </Fragment>
        );
      }
      return null;
  }
};

/**
 * Paragraph node renderer
 */
const ParagraphNode = ({ node }) => {
  if (!node.children) return null;

  return (
    <p className="mb-4 leading-7 text-muted-foreground">
      {node.children.map((child, idx) => (
        <RenderTextNode key={`text-${idx}`} node={child} />
      ))}
    </p>
  );
};

/**
 * Heading node renderer
 */
const HeadingNode = ({ node }) => {
  const level = node.tag || 'h2';
  const Tag = level;

  const headingClasses = {
    h1: 'text-4xl font-bold mt-8 mb-4',
    h2: 'text-3xl font-bold mt-6 mb-3',
    h3: 'text-2xl font-bold mt-5 mb-3',
    h4: 'text-xl font-bold mt-4 mb-2',
    h5: 'text-lg font-bold mt-4 mb-2',
    h6: 'text-base font-bold mt-3 mb-2',
  };

  if (!node.children) return null;

  return (
    <Tag className={`${headingClasses[level] || headingClasses.h2} scroll-m-20`}>
      {node.children.map((child, idx) => (
        <RenderTextNode key={`heading-${idx}`} node={child} />
      ))}
    </Tag>
  );
};

/**
 * List node renderer (handles both ordered and unordered lists)
 */
const ListNode = ({ node }) => {
  const isOrdered = node.listType === 'number';
  const Tag = isOrdered ? 'ol' : 'ul';
  const listClasses = isOrdered ? 'list-decimal' : 'list-disc';

  if (!node.children) return null;

  return (
    <Tag className={`${listClasses} pl-6 mb-4 space-y-2 text-muted-foreground`}>
      {node.children.map((child, idx) => (
        <RenderNode key={`list-item-${idx}`} node={child} />
      ))}
    </Tag>
  );
};

/**
 * List item node renderer
 */
const ListItemNode = ({ node }) => {
  if (!node.children) return null;

  return (
    <li className="leading-7">
      {node.children.map((child, idx) => {
        if (child.type === 'paragraph') {
          return (
            <Fragment key={`li-content-${idx}`}>
              {child.children?.map((textChild, textIdx) => (
                <RenderTextNode key={`li-text-${textIdx}`} node={textChild} />
              ))}
            </Fragment>
          );
        }
        return <RenderNode key={`li-node-${idx}`} node={child} />;
      })}
    </li>
  );
};

/**
 * Blockquote node renderer
 */
const BlockquoteNode = ({ node }) => {
  if (!node.children) return null;

  return (
    <blockquote className="border-l-4 border-accent pl-4 py-2 my-4 italic text-muted-foreground bg-muted/30 rounded-r">
      {node.children.map((child, idx) => (
        <RenderNode key={`quote-${idx}`} node={child} />
      ))}
    </blockquote>
  );
};

/**
 * Horizontal rule node renderer
 */
const HorizontalRuleNode = () => {
  return <hr className="my-8 border-t border-border" />;
};

/**
 * Image/Upload node renderer
 */
const UploadNode = ({ node }) => {
  const media = node.value;

  if (!media) return null;

  // Handle nested media object
  const imageUrl = media.url || media;
  const caption = media.caption || node.caption;
  const alt = media.alt || caption || 'Content image';

  if (!imageUrl) return null;

  return (
    <figure className="my-6">
      <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
          priority={false}
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

/**
 * Text node renderer with format support
 * Handles: bold, italic, strikethrough, code, and links
 */
const RenderTextNode = ({ node }) => {
  if (!node) return null;

  // Handle text content
  if (node.type === 'text') {
    let element = <span>{node.text}</span>;

    // Apply inline formats (bold, italic, strikethrough, code)
    if (node.format) {
      if (node.format & 1) {
        // Bold
        element = <strong className="font-bold">{element}</strong>;
      }
      if (node.format & 2) {
        // Italic
        element = <em className="italic">{element}</em>;
      }
      if (node.format & 4) {
        // Strikethrough
        element = <s className="line-through">{element}</s>;
      }
      if (node.format & 8) {
        // Code
        element = (
          <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-accent">
            {element}
          </code>
        );
      }
      if (node.format & 16) {
        // Underline
        element = <u className="underline">{element}</u>;
      }
      if (node.format & 32) {
        // Subscript
        element = <sub className="text-xs">{element}</sub>;
      }
      if (node.format & 64) {
        // Superscript
        element = <sup className="text-xs">{element}</sup>;
      }
    }

    // Handle links
    if (node.type === 'link' || node.linkType) {
      const href = node.url || node.href || '#';
      const isInternal = href.startsWith('/');

      if (isInternal) {
        return (
          <Link href={href} className="text-accent hover:underline">
            {element}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          {element}
        </a>
      );
    }

    return element;
  }

  // Handle link wrapper nodes
  if (node.type === 'link' || (node.linkType && node.children)) {
    const href = node.url || node.href || '#';
    const isInternal = href.startsWith('/');
    const LinkComponent = isInternal ? Link : 'a';
    const linkProps = isInternal
      ? { href }
      : { href, target: '_blank', rel: 'noopener noreferrer' };

    return (
      <LinkComponent {...linkProps} className="text-accent hover:underline">
        {node.children?.map((child, idx) => (
          <RenderTextNode key={`link-text-${idx}`} node={child} />
        ))}
      </LinkComponent>
    );
  }

  // Fallback for unknown text-like nodes
  if (node.text) {
    return <span>{node.text}</span>;
  }

  return null;
};

export default LexicalRenderer;
