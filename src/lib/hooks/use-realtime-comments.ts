"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function useRealtimeComments(postId: string) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`post-${postId}-comments`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "forum_comments",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, router]);
}
