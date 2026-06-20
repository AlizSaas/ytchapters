"use client";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import SubmissionButton from "@/components/SubmitionButton";
import { generateChapters } from "./action";
import { useRouter } from "next/navigation";
import { Film, Sparkles, Zap } from "lucide-react";

const OmgBruh = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await generateChapters(formData);
    if (result.success) {
      router.push("/dashboard");
    } else {
      router.push(`/error?error=${result.error}`);
    }
  };

  return (
    <MaxWidthWrapper className="py-12 md:py-24 min-h-[calc(100vh-5rem)]">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          AI-Powered Chapter Generation
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Generate timestamps for your YouTube videos
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Paste any YouTube video or Shorts link and let AI create perfect
          chapters for your content in seconds.
        </p>

        <form
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          action={handleSubmit}
        >
          <div className="flex-1">
            <label className="sr-only">Enter video URL</label>
            <Input
              placeholder="Paste YouTube video or Shorts URL..."
              name="link"
              className="h-12 text-base px-4"
            />
          </div>
          <SubmissionButton text="Generate" />
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          Supports regular videos and YouTube Shorts
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border shadow-sm">
            <div className="p-3 rounded-full bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">AI-Powered</h3>
            <p className="text-sm text-muted-foreground text-center">
              Smart chapter detection using advanced AI
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border shadow-sm">
            <div className="p-3 rounded-full bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground text-center">
              Generate chapters in just seconds
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border shadow-sm">
            <div className="p-3 rounded-full bg-primary/10">
              <Film className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">Videos &amp; Shorts</h3>
            <p className="text-sm text-muted-foreground text-center">
              Works with both regular videos and Shorts
            </p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default OmgBruh;