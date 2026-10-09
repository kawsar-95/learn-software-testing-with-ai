import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Software Testing with AI - Complete Tutorial" },
  description:
    "A tutorial for QA engineers and SDETs on software testing with Claude Code: getting started, foundations, configuration, extensions, and automation.",
};

export default function Page() {
  return <HomePage />;
}
