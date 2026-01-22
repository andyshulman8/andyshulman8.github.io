import React from "react";

/**
 * Converts simple markdown-style links [label](url)
 * into React anchor elements without introducing
 * a full markdown parser dependency.
 *
 * Matches patterns like: [Google](https://google.com)
 *
 * @param text - The text containing markdown-style links
 * @returns Array of React nodes with links rendered as anchors
 *
 * Example:
 * ```tsx
 * const content = renderMarkdownLinks("Check out [my site](https://example.com)");
 * // Returns: ["Check out ", <a href="...">my site</a>]
 * ```
 */
export function renderMarkdownLinks(text: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const [full, label, url] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    parts.push(
      <a
        key={start}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="underline text-blue-800 hover:text-blue-500"
      >
        {label}
      </a>,
    );

    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
