import Projects from "@/components/Projects";

export default async function ProjectPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">my projects.</h1>

      <p className="max-w-prose text-sm text-muted-foreground sm:text-base">
        Shipped work for real clients and personal projects. Where a
        &quot;Source&quot; link is missing, the code is private client work —
        I&apos;m happy to walk through the architecture in an interview.
      </p>

      <Projects />
    </article>
  );
}
