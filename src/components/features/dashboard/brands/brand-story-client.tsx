"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { BrandStoryApiResponse } from "@/types/brand";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function BrandStoryClient() {
  const params = useParams();

  const { data, isLoading, isError, isSuccess } = useQuery<
    BrandStoryApiResponse | undefined
  >({
    queryKey: ["brandStory", params.brandId],
    queryFn: async () => {
      const response = await fetch(`/api/brand/${params.brandId}/story`, {
        cache: "force-cache",
        next: {
          revalidate: 30 * 60,
        },
      });

      if (!response.ok) return undefined;

      const data = await response.json();
      return data;
    },
  });

  if (isLoading) return <div>در حال بارگزاری...</div>;

  if (isError || (isSuccess && !data))
    return (
      <div className="flex flex-col items-center justify-center">
        <h3>مشکلی پیش آمد</h3>
        <Link href="/dashboard/brands">
          <Button>بازگشت</Button>
        </Link>
      </div>
    );

  const aiResponse = data?.story.output as {
    text: string;
  };

  // TODO : create` custom markup component
  return (
    <div
      className="rounded-xl border bg-card text-card-foreground shadow-sm"
      dir="rtl"
    >
      <article
        className="
        p-8 max-w-none prose 
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
        <ReactMarkdown>{aiResponse.text}</ReactMarkdown>
      </article>
    </div>
  );
}
