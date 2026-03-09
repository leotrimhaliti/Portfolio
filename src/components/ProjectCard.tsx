import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Project } from "@/lib/schemas";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import Icon from "./Icon";

interface Props {
  project: Project;
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

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        {image &&
          (imageLink ? (
            <Link href={imageLink} target="_blank" rel="noopener noreferrer">
              <div className="group relative aspect-video w-full overflow-hidden bg-zinc-900">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ) : (
            <div className="group relative aspect-video w-full overflow-hidden bg-zinc-900">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
          ))}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pt-4">
        <CardTitle>{name}</CardTitle>
        <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
          {description}
        </Markdown>
      </CardContent>
      <CardFooter className="flex h-full flex-col items-start justify-between gap-4">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.toSorted().map((tag) => (
              <Badge
                key={tag}
                className="px-1 py-0 text-[10px]"
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links.toSorted().map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  <Icon name={link.icon} className="size-3" />
                  {link.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
