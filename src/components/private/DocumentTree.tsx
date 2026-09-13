import { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  FileType2,
  Image as ImageIcon,
  Video,
  File as FileIcon,
  ExternalLink,
} from "lucide-react";

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  thumbnailLink?: string;
}

export interface FolderNode {
  id: string;
  name: string;
  files: DriveFile[];
  folders: FolderNode[];
}

const iconFor = (mimeType: string) => {
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return FileSpreadsheet;
  if (mimeType === "application/pdf") return FileType2;
  if (mimeType.startsWith("image/")) return ImageIcon;
  if (mimeType.startsWith("video/")) return Video;
  if (mimeType.includes("document") || mimeType.includes("word")) return FileText;
  return FileIcon;
};

const humanSize = (size?: string) => {
  if (!size) return null;
  const bytes = Number(size);
  if (!Number.isFinite(bytes) || bytes <= 0) return null;
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value < 10 && unit > 0 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`;
};

const DocumentCard = ({
  file,
  onSelect,
  isEs,
}: {
  file: DriveFile;
  onSelect: (file: DriveFile) => void;
  isEs: boolean;
}) => {
  const Icon = iconFor(file.mimeType);
  const size = humanSize(file.size);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showThumb = Boolean(file.thumbnailLink) && !failed;

  return (
    <li className="group relative">
      <button
        type="button"
        onClick={() => onSelect(file)}
        className="block w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:border-primary"
      >
        <span className="relative block aspect-[4/3] w-full overflow-hidden bg-muted">
          {showThumb ? (
            <>
              {!loaded && <span className="absolute inset-0 animate-pulse bg-muted" />}
              <img
                src={file.thumbnailLink}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className={`h-full w-full object-cover object-top transition-opacity duration-300 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-muted">
              <Icon size={34} className="text-muted-foreground" strokeWidth={1.4} />
            </span>
          )}
        </span>
        <span className="flex items-start gap-2 px-3.5 py-3">
          <Icon size={15} className="mt-0.5 shrink-0 text-muted-foreground" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">{file.name}</span>
            {size && <span className="block text-xs text-muted-foreground">{size}</span>}
          </span>
        </span>
      </button>
      {file.webViewLink && (
        <a
          href={file.webViewLink}
          target="_blank"
          rel="noreferrer"
          aria-label={isEs ? "Abrir en Drive" : "Open in Drive"}
          className="absolute right-2 top-2 rounded-full bg-background/85 p-1.5 text-muted-foreground opacity-0 backdrop-blur transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
        >
          <ExternalLink size={14} />
        </a>
      )}
    </li>
  );
};

interface Props {
  node: FolderNode;
  depth?: number;
  onSelect: (file: DriveFile) => void;
  isEs: boolean;
}

export const DocumentTree = ({ node, depth = 0, onSelect, isEs }: Props) => {
  const empty = node.files.length === 0 && node.folders.length === 0;

  return (
    <div className={depth === 0 ? "space-y-10" : "space-y-4"}>
      {depth > 0 && (
        <h3
          className={`font-display font-bold tracking-tight ${
            depth === 1 ? "text-lg" : "text-base text-muted-foreground"
          }`}
        >
          {node.name}
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            {node.files.length} {isEs ? "archivos" : "files"}
          </span>
        </h3>
      )}

      {node.files.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {node.files.map((file) => (
            <DocumentCard key={file.id} file={file} onSelect={onSelect} isEs={isEs} />
          ))}
        </ul>
      )}

      {empty && <p className="text-sm text-muted-foreground">{isEs ? "Vacía." : "Empty."}</p>}

      {node.folders.map((child) => (
        <div key={child.id} className={depth === 0 ? "" : "border-l border-border pl-4"}>
          <DocumentTree node={child} depth={depth + 1} onSelect={onSelect} isEs={isEs} />
        </div>
      ))}
    </div>
  );
};
