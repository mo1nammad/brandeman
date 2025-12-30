"use client";

import { useRef, useEffect } from "react";
import { useCompletion } from "@ai-sdk/react";
import { useRouter } from "next/navigation";

import CustomMarkup from "@/components/markup";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type Props = {
  brandId: string;
  redirect?: {
    type: "push" | "replace";
    url: string;
  };
};

export default function ResultStreamUi({ brandId, redirect }: Props) {
  const router = useRouter();

  const startedRef = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);

  const { completion, complete, error, isLoading } = useCompletion({
    api: "/api/generate/brand",
    body: {
      brandId,
    },
    streamProtocol: "text",
    onFinish: () => {
      if (redirect) router[redirect.type](redirect.url);
    },
  });

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    complete("");
  }, [complete, brandId]);

  useEffect(() => {
    if (!error) return;

    toast.error("مشکلی در سرور وجود دارد");
    console.log(error);
  }, [error]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [completion]);

  return (
    <div className="prose w-full max-w-7xl mx-auto whitespace-pre-wrap my-12 px-5">
      {completion ? (
        <CustomMarkup content={completion} />
      ) : (
        <span className="text-2xl">در حال تولید هویت برند...</span>
      )}
      {isLoading && !completion && (
        <div className="space-y-1.5 mt-6">
          <Skeleton className="w-2/5 h-3.5" />
          <Skeleton className="w-3/5 h-3.5" />
          <Skeleton className="w-4/5 h-3.5" />
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
