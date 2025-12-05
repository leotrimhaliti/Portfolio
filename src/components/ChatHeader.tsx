export default function ChatHeader() {
  return (
    <section className="flex w-full items-center justify-start gap-3">
      <div className="flex flex-col items-start">
        <p className="text-sm font-medium">Chat with</p>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-green-500" />
          <p className="text-xs text-muted-foreground">Leo Support</p>
        </div>
      </div>
    </section>
  );
}

