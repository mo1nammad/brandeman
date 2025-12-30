"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { BrandStoryApiResponse } from "@/types/brand";

import { Button } from "@/components/ui/button";
import CustomMarkup from "@/components/markup";
import BrandStoryVersionBar from "./brand-story-version-bar";
import { toast } from "sonner";

type Props = {
  latestVersion: number;
};

export default function BrandStoryClient({ latestVersion }: Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const shouldRevalidate = searchParams.get("revalidate") === "true";

  const [storyVersion, setStoryVersion] = useState(latestVersion);

  // fetch brand data
  const { data, isLoading, isError, isSuccess, refetch, error } =
    useQuery<BrandStoryApiResponse>({
      queryKey: ["brandStory", params.brandId, storyVersion],
      queryFn: async () => {
        const response = await fetch(
          `/api/brand/${params.brandId}/story?version=${storyVersion}`,
          {
            cache: "no-store",
            next: {
              revalidate: 30 * 60,
            },
          }
        );

        if (!response.ok) {
          const message = await response.text();

          switch (response.status) {
            case 307:
              router.replace(message);
              break;

            default:
              toast.error("مشکلی در دریافت اطلاعات پیش آمد", {
                description: message,
              });
              throw new Error(message);
          }
        }

        const data: BrandStoryApiResponse = await response.json();

        return data;
      },
    });

  // life cycle
  useEffect(() => {
    if (data?.storyCount === 0) {
      router.replace(`/dashboard/brands/${params.brandId}?regenerate=true`);
    }
  }, [data?.storyCount, router, params.brandId]);

  useEffect(() => {
    if (shouldRevalidate) {
      refetch();
      router.replace(`/dashboard/brands/${params.brandId}`);
    }
  }, [refetch, router, params.brandId, shouldRevalidate]);

  if (isLoading) return <div>در حال بارگزاری...</div>;

  if (isError || !isSuccess)
    return (
      <div className="flex flex-col items-center justify-center">
        <h3>{error ? error.message : "مشکلی پیش آمد"}</h3>
        <Link href="/dashboard/brands">
          <Button>بازگشت</Button>
        </Link>
      </div>
    );

  const aiResponse = data.story.output as {
    text: string;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <BrandStoryVersionBar
        activeVersion={storyVersion}
        versions={data.brandInfo.versions}
        onChangeVersion={setStoryVersion}
        content={aiResponse.text}
        storyId={data.story.id}
      />
      <CustomMarkup content={aiResponse.text} />
    </div>
  );
}
