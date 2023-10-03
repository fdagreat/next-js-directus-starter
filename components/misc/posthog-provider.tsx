"use client"

import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

export function CustomPostHogProvider({ children }: any) {
  // Check that PostHog is client-side (used to handle Next.js SSR)
  if (typeof window !== "undefined") {
    posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") posthog.debug()
        console.log("PostHog debug enabled")
      },
      capture_pageview: true,
    })
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}