import type { Metadata } from "next";
import ProjectGallery from "@/components/projects/ProjectGallery";

export const metadata: Metadata = {
  title: "Project | QuantFun Technologies",
  description: "Explore projects in finance, research, programming, and design.",
};

export default function ProjectPage() {
  return <ProjectGallery />;
}
