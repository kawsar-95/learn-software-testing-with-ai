import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Software Testing with AI - Complete Tutorial" },
  description:
    "Master software testing with Claude AI. Complete tutorial covering prompt engineering, context engineering, skills, agents, MCP servers, and more for QA engineers and SDETs.",
};

export default function Page() {
  return <HomePage />;
}
