import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
};

export default function CustomMarkup({ content }: Props) {
  return (
    <article
      dir="rtl"
      className="
        p-8 max-w-none rounded-xl bg-card prose 
        /* Body & Headings */
        prose-p:text-foreground/90 prose-headings:text-foreground
        /* Emphasis & Bold */
        prose-strong:text-foreground prose-em:text-foreground
        /* Lists: Fix colors and RTL spacing */
        prose-ol:text-muted-foreground prose-ul:text-muted-foreground
        prose-ol:pr-6 prose-ol:pl-0 prose-ul:pr-6 prose-ul:pl-0
        prose-li:marker:text-primary
        /* Blockquotes: Move border to right side for RTL */
        prose-blockquote:text-muted-foreground 
        prose-blockquote:border-l-0 prose-blockquote:border-r-4 
        prose-blockquote:border-border
        /* Horizontal Rule */
        prose-hr:border-border
      "
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
