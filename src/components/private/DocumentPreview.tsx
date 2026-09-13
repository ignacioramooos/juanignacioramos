import { X, ExternalLink } from "lucide-react";
import type { DriveFile } from "./DocumentTree";

interface Props {
  file: DriveFile;
  onClose: () => void;
  isEs: boolean;
}

export const DocumentPreview = ({ file, onClose, isEs }: Props) => {
  const src = `https://drive.google.com/file/d/${file.id}/preview`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={file.name}
      onClick={onClose}
    >
      <div
        className="flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <p className="min-w-0 flex-1 truncate text-sm font-medium">{file.name}</p>
          {file.webViewLink && (
            <a
              href={file.webViewLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {isEs ? "Abrir en Drive" : "Open in Drive"}
              <ExternalLink size={13} />
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={isEs ? "Cerrar" : "Close"}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X size={17} />
          </button>
        </div>
        <iframe
          src={src}
          title={file.name}
          className="w-full flex-1 border-0 bg-background"
          allow="autoplay"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
};
