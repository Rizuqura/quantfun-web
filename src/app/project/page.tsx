import type { Metadata } from "next";
import ProjectGallery from "@/components/projects/ProjectGallery";

export const metadata: Metadata = {
  title: "Project | QuantFun Technologies",
  description: "Meet Wonnyy Terminal: a micro-corporate and data science workspace with an agent marketplace, free model integration and LLM support, by QuantFun.",
};

export default function ProjectPage() {
  return <ProjectGallery />;
}
