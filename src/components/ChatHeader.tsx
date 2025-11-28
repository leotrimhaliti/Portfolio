export default function ChatHeader() {
  return (
    <section className="flex w-full items-center justify-start gap-3">
      <div className="flex flex-col items-start">
        <p className="text-xs">Chat Status</p>
        <div className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-yellow-500" />
          <p className="text-sm font-medium">Under Development</p>
        </div>
      </div>
    </section>
  );
}
