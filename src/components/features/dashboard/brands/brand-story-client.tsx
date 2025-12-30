"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { BrandStoryApiResponse } from "@/types/brand";

import CustomMarkup from "@/components/markup";
import BrandStoryVersionBar from "./brand-story-version-bar";
import { Button } from "@/components/ui/button";

type Props = {
  latestVersion: number;
};

export default function BrandStoryClient({ latestVersion }: Props) {
  const params = useParams();

  const [storyVersion, setStoryVersion] = useState(latestVersion);

  const { data, isLoading, isError, isSuccess } =
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

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        return data;
      },
    });

  if (isLoading) return <div>در حال بارگزاری...</div>;

  if (isError || !isSuccess)
    return (
      <div className="flex flex-col items-center justify-center">
        <h3>مشکلی پیش آمد</h3>
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
