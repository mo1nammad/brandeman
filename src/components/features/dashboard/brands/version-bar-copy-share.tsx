import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  content: string;
  shareUrl: string;
};

export default function VersionBarCopyShare({ content, shareUrl }: Props) {
  const [isShared, setIsShared] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shareBrandStory = async () => {
    // Modern browsers (mobile-first)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `داستان برند`,
          text: `داستان هویت برند`,
          url: shareUrl,
        });
      } catch (err) {
        toast.error("اشتراک‌گذاری انجام نشد.");
      }
    }

    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(shareUrl);
    setIsShared(true);
    toast.success("لینک داستان برند کپی شد!");
  };

  const copyBrandStory = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    toast.success("متن داستان برند کپی شد!");
  };

  useEffect(() => {
    if (isShared) {
      const timer = setTimeout(() => setIsShared(false), 2000);
      return () => clearTimeout(timer);
    }
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isShared, isCopied]);

  return (
    <>
      <Button variant="outline" size="icon" onClick={copyBrandStory}>
        {isCopied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <Button variant="outline" size="icon" onClick={shareBrandStory}>
        {isShared ? (
          <Check className="w-4 h-4" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
      </Button>
    </>
  );
}
