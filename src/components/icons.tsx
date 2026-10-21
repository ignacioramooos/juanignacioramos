/**
 * Single icon set for the whole site: Phosphor, one light weight.
 * Exports keep the old names so call sites stay unchanged.
 */
import { forwardRef, type ComponentType } from "react";
import * as P from "@phosphor-icons/react";
import type { IconProps as PIconProps } from "@phosphor-icons/react";

export type IconProps = Omit<PIconProps, "ref"> & { strokeWidth?: number | string };
export type LucideIcon = ComponentType<IconProps>;

const make = (Icon: ComponentType<PIconProps>, name: string) => {
  const C = forwardRef<SVGSVGElement, IconProps>(({ strokeWidth: _s, weight = "light", size = 18, ...rest }, ref) => (
    <Icon ref={ref} weight={weight} size={size} {...rest} />
  ));
  C.displayName = name;
  return C;
};

export const ArrowLeft = make(P.ArrowLeft, "ArrowLeft");
export const ArrowRight = make(P.ArrowRight, "ArrowRight");
export const Bot = make(P.Sparkle, "Bot");
export const Box = make(P.Cube, "Box");
export const Briefcase = make(P.Wrench, "Briefcase");
export const Calendar = make(P.Calendar, "Calendar");
export const CalendarDays = make(P.CalendarDots, "CalendarDays");
export const Camera = make(P.Aperture, "Camera");
export const Check = make(P.Check, "Check");
export const CheckCircle2 = make(P.CheckCircle, "CheckCircle2");
export const ChevronDown = make(P.CaretDown, "ChevronDown");
export const ChevronLeft = make(P.CaretLeft, "ChevronLeft");
export const ChevronRight = make(P.CaretRight, "ChevronRight");
export const ChevronUp = make(P.CaretUp, "ChevronUp");
export const Circle = make(P.Circle, "Circle");
export const Compass = make(P.Compass, "Compass");
export const Construction = make(P.Hammer, "Construction");
export const Copy = make(P.Copy, "Copy");
export const DollarSign = make(P.CurrencyDollarSimple, "DollarSign");
export const Dot = make(P.DotOutline, "Dot");
export const ExternalLink = make(P.ArrowUpRight, "ExternalLink");
export const Eye = make(P.Eye, "Eye");
export const EyeOff = make(P.EyeSlash, "EyeOff");
export const File = make(P.File, "File");
export const FileSpreadsheet = make(P.FileXls, "FileSpreadsheet");
export const FileText = make(P.FileText, "FileText");
export const FileType2 = make(P.FilePdf, "FileType2");
export const FolderOpen = make(P.FolderOpen, "FolderOpen");
export const Fuel = make(P.GasPump, "Fuel");
export const Github = make(P.GithubLogo, "Github");
export const Globe = make(P.GlobeSimple, "Globe");
export const GraduationCap = make(P.GraduationCap, "GraduationCap");
export const GripVertical = make(P.DotsSixVertical, "GripVertical");
export const Home = make(P.House, "Home");
export const Image = make(P.Image, "Image");
export const ImagePlus = make(P.ImageSquare, "ImagePlus");
export const Instagram = make(P.InstagramLogo, "Instagram");
export const Languages = make(P.Translate, "Languages");
export const Lightbulb = make(P.Lightbulb, "Lightbulb");
export const Linkedin = make(P.LinkedinLogo, "Linkedin");
export const Loader2 = make(P.CircleNotch, "Loader2");
export const Lock = make(P.LockSimple, "Lock");
export const LogOut = make(P.SignOut, "LogOut");
export const Mail = make(P.EnvelopeSimple, "Mail");
export const MapPin = make(P.MapPinSimple, "MapPin");
export const Maximize2 = make(P.CornersOut, "Maximize2");
export const Menu = make(P.List, "Menu");
export const MessageCircle = make(P.ChatCircle, "MessageCircle");
export const Minimize2 = make(P.CornersIn, "Minimize2");
export const Moon = make(P.Moon, "Moon");
export const MoreHorizontal = make(P.DotsThree, "MoreHorizontal");
export const Package = make(P.Package, "Package");
export const PanelLeft = make(P.SidebarSimple, "PanelLeft");
export const Phone = make(P.Phone, "Phone");
export const Play = make(P.Play, "Play");
export const Plus = make(P.Plus, "Plus");
export const Presentation = make(P.Presentation, "Presentation");
export const Printer = make(P.Printer, "Printer");
export const Rocket = make(P.Planet, "Rocket");
export const RotateCcw = make(P.ArrowCounterClockwise, "RotateCcw");
export const Save = make(P.FloppyDisk, "Save");
export const Search = make(P.MagnifyingGlass, "Search");
export const Send = make(P.PaperPlaneTilt, "Send");
export const Sheet = make(P.Table, "Sheet");
export const Sun = make(P.Sun, "Sun");
export const TowerControl = make(P.Broadcast, "TowerControl");
export const Trash2 = make(P.Trash, "Trash2");
export const TrendingUp = make(P.ChartLineUp, "TrendingUp");
export const Upload = make(P.UploadSimple, "Upload");
export const Users = make(P.UsersThree, "Users");
export const Video = make(P.VideoCamera, "Video");
export const X = make(P.X, "X");

// Bottom-nav specific glyphs
export const Orbit = make(P.Planet, "Orbit");
export const Constellation = make(P.ShootingStar, "Constellation");
