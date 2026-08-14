import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Project } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import Icon from "./Icon";

interface Props {
  project: Project;
}

const caseStudyLabels = ["Problem", "Brief", "What I built", "Result"] as const;
type CaseStudyLabel = (typeof caseStudyLabels)[number];
type CaseStudySection = { label: CaseStudyLabel; content: string };

function parseCaseStudy(description: string) {
  const sections = caseStudyLabels.reduce<CaseStudySection[]>(
    (items, label) => {
      const start = `**${label}:**`;
      const startIndex = description.indexOf(start);

      if (startIndex === -1) return items;

      const contentStart = startIndex + start.length;
      const contentEnd =
        caseStudyLabels
          .map((nextLabel) =>
            description.indexOf(`**${nextLabel}:**`, contentStart),
          )
          .filter((markerIndex) => markerIndex !== -1)
          .sort((a, b) => a - b)[0] ?? description.length;

      const content = description
        .slice(contentStart, contentEnd)
        .trim();

      if (content) {
        items.push({ label, content });
      }

      return items;
    },
    [],
  );

  const hasBuildAndResult = sections.some((section) => section.label === "What I built") &&
    sections.some((section) => section.label === "Result");

  return hasBuildAndResult ? sections : null;
}

export function ProjectCard({ project }: Props) {
  const { name, href, description, image, tags, links } = project;

  // Get the best link for the image: website first, then GitHub, return null if no valid link
  const getImageLink = (): string | null => {
    if (!links || links.length === 0) return null;
    // Look for a non-GitHub link (website) first
    const websiteLink = links.find((link) => !link.href.includes("github.com"));
    if (websiteLink) return websiteLink.href;
    // Don't make it clickable if it's only GitHub (repo might be private)
    return null;
  };

  const imageLink = getImageLink();
  const caseStudy = parseCaseStudy(description);
  const imageFrame = (
    <div className="group relative h-48 w-full overflow-hidden bg-zinc-900 sm:h-44">
      <Image
        src={image ?? ""}
        alt={name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );

  return (
    <Card className="grid h-full overflow-hidden [grid-template-rows:theme(spacing.48)_1fr_theme(spacing.40)] sm:[grid-template-rows:theme(spacing.44)_1fr_theme(spacing.40)]">
      <CardHeader className="p-0">
        {image &&
          (imageLink ? (
            <Link href={imageLink} target="_blank" rel="noopener noreferrer">
              {imageFrame}
            </Link>
          ) : (
            imageFrame
          ))}
      </CardHeader>
      <CardContent className="flex min-h-[19rem] flex-col px-6 py-5 sm:min-h-[21rem]">
        <CardTitle>{name}</CardTitle>
        {caseStudy ? (
          <dl className="mt-5 grid gap-3 text-xs leading-relaxed">
            {caseStudy.map((section) => (
              <div key={section.label} className="grid min-h-[4.25rem] gap-1">
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-foreground/70">
                  {section.label === "What I built" ? "Built" : section.label}
                </dt>
                <dd className="line-clamp-3 text-pretty text-muted-foreground">
                  {section.content}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="prose mt-5 max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex h-40 flex-col items-start justify-between gap-4 border-t bg-muted/20 px-6 py-4">
        <div className="flex h-14 flex-wrap content-start gap-1.5 overflow-hidden">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 bg-background/70 px-2 py-0.5 text-[10px] font-medium leading-5 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {links.length > 0 && (
          <div className="flex w-full flex-wrap gap-2">
            {links.map((link) => (
              <Link
                href={link.href}
                key={`${link.name}-${link.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  links.length === 1 && "min-w-24",
                )}
              >
                <Icon name={link.icon} className="size-3.5" />
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
