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

interface Props {
  node: FolderNode;
  depth?: number;
  onSelect: (file: DriveFile) => void;
  isEs: boolean;
}

export const DocumentTree = ({ node, depth = 0, onSelect, isEs }: Props) => {
  const empty = node.files.length === 0 && node.folders.length === 0;

  return (
    <div className={depth === 0 ? "space-y-8" : "space-y-4"}>
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
        <ul className="grid gap-2 sm:grid-cols-2">
          {node.files.map((file) => {
            const Icon = iconFor(file.mimeType);
            const size = humanSize(file.size);
            return (
              <li key={file.id}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary">
                  <button
                    type="button"
                    onClick={() => onSelect(file)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <Icon size={17} className="shrink-0 text-muted-foreground" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{file.name}</span>
                      {size && <span className="block text-xs text-muted-foreground">{size}</span>}
                    </span>
                  </button>
                  {file.webViewLink && (
                    <a
                      href={file.webViewLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={isEs ? "Abrir en Drive" : "Open in Drive"}
                      className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {empty && (
        <p className="text-sm text-muted-foreground">{isEs ? "Vacía." : "Empty."}</p>
      )}

      {node.folders.map((child) => (
        <div
          key={child.id}
          className={depth === 0 ? "" : "border-l border-border pl-4"}
        >
          <DocumentTree node={child} depth={depth + 1} onSelect={onSelect} isEs={isEs} />
        </div>
      ))}
    </div>
  );
};
