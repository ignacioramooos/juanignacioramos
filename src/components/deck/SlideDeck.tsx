import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import type { Deck, Slide } from "@/data/decks/types";

const W = 1920;
const H = 1080;

const SlideView = ({ slide, index, total }: { slide: Slide; index: number; total: number }) => {
  const isTitle = slide.variant === "title";
  return (
    <div className="slide-content flex flex-col bg-background text-foreground px-[120px] py-[80px]">
      <div className="flex items-start justify-between">
        {slide.kicker ? (
          <span className="slide-kicker text-primary">{slide.kicker}</span>
        ) : (
          <span />
        )}
        <span className="slide-page rounded-full border border-border px-5 py-2 text-muted-foreground">
          {index + 1} / {total}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${isTitle ? "justify-center" : "justify-start pt-[40px]"}`}>
        <h2
          className={`font-display font-bold tracking-tight ${isTitle ? "slide-title-lg" : "slide-title"}`}
        >
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="slide-subtitle mt-[28px] max-w-[1300px] text-muted-foreground">{slide.subtitle}</p>
        )}

        <div className="mt-[48px] space-y-[36px]">
          {slide.blocks?.map((block, i) => {
            if (block.type === "lead")
              return (
                <p key={i} className="slide-body-lg max-w-[1400px] text-muted-foreground">
                  {block.text}
                </p>
              );

            if (block.type === "bullets")
              return (
                <ul key={i} className="grid grid-cols-2 gap-x-[64px] gap-y-[28px]">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex gap-[20px]">
                      <span className="mt-[16px] h-[10px] w-[10px] shrink-0 rounded-full bg-primary" />
                      <span className="slide-body">
                        {item.title && <strong className="font-semibold">{item.title}: </strong>}
                        <span className="text-muted-foreground">{item.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              );

            if (block.type === "stats")
              return (
                <div key={i} className="grid grid-cols-3 gap-[32px]">
                  {block.items.map((s, j) => (
                    <div key={j} className="rounded-[24px] border border-border p-[36px]">
                      <div className="font-display slide-title text-primary">{s.value}</div>
                      <div className="slide-body mt-[16px] text-muted-foreground">{s.label}</div>
                      {s.note && <div className="slide-caption mt-[10px] text-muted-foreground">{s.note}</div>}
                    </div>
                  ))}
                </div>
              );

            if (block.type === "table")
              return (
                <table key={i} className="w-full border-collapse text-left">
                  <thead>
                    <tr>
                      {block.head.map((h, j) => (
                        <th
                          key={j}
                          className="slide-caption border-b border-border pb-[16px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-border/60">
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={`slide-body py-[18px] pr-[24px] ${k === 0 ? "font-medium" : "text-muted-foreground"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );

            if (block.type === "quote")
              return (
                <blockquote key={i} className="slide-body-lg border-l-[6px] border-primary pl-[32px] italic">
                  {block.text}
                  {block.source && (
                    <footer className="slide-caption mt-[14px] not-italic text-muted-foreground">
                      {block.source}
                    </footer>
                  )}
                </blockquote>
              );

            return (
              <figure key={i}>
                <img
                  src={block.src}
                  alt={block.alt}
                  className="max-h-[520px] w-full rounded-[24px] object-cover"
                  loading="lazy"
                />
                {block.caption && (
                  <figcaption className="slide-caption mt-[14px] text-muted-foreground">{block.caption}</figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>

      {slide.footer && <div className="slide-footer text-muted-foreground">{slide.footer}</div>}
    </div>
  );
};

export const SlideDeck = ({ deck, onExit }: { deck: Deck; onExit?: () => void }) => {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(0.3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const total = deck.slides.length;
  const go = useCallback(
    (delta: number) => setIndex((i) => Math.min(total - 1, Math.max(0, i + delta))),
    [total],
  );

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / W, height / H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Escape" && !document.fullscreenElement) {
        onExit?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onExit]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await rootRef.current?.requestFullscreen();
    } catch {
      /* ignore */
    }
  };

  return (
    <div ref={rootRef} className="flex h-full w-full flex-col bg-background">
      <div
        ref={stageRef}
        className={`relative w-full overflow-hidden rounded-2xl border border-border bg-background ${
          isFullscreen ? "flex-1 rounded-none border-0" : "aspect-video"
        }`}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: W,
            height: H,
            marginLeft: -W / 2,
            marginTop: -H / 2,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <SlideView slide={deck.slides[index]} index={index} total={total} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-1 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous slide"
            className="rounded-full border border-border p-2 transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(1)}
            disabled={index === total - 1}
            aria-label="Next slide"
            className="rounded-full border border-border p-2 transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
          <span className="ml-2 text-sm text-muted-foreground">
            {index + 1} / {total}
          </span>
        </div>

        <div className="hidden flex-1 items-center gap-1.5 md:flex">
          {deck.slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i === index ? "bg-primary" : "bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={toggleFullscreen}
          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm transition-colors hover:bg-muted"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          {isFullscreen ? "Exit" : "Present"}
        </button>
      </div>
    </div>
  );
};
