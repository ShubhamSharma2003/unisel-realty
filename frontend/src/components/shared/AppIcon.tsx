import type { ComponentType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calculator,
  Check,
  CheckCircle,
  ChevronDown,
  Circle,
  CircleAlert,
  Clock,
  Facebook,
  Globe2,
  Home,
  House,
  Instagram,
  Link2,
  LoaderCircle,
  Lock,
  Mail,
  MailOpen,
  MapPin,
  Maximize2,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Rocket,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Store,
  Sun,
  TrendingUp,
  Twitter,
  X,
  type LucideProps,
} from "lucide-react";

type AppIconProps = Omit<LucideProps, "ref"> & {
  icon: string;
};

const ICONS: Record<string, ComponentType<LucideProps>> = {
  "ic:baseline-whatsapp": MessageCircle,
  "lineicons:arrow-all-direction": Maximize2,
  "ph:arrow-left-bold": ArrowLeft,
  "ph:arrow-right": ArrowRight,
  "ph:arrow-right-bold": ArrowRight,
  "ph:buildings": Building2,
  "ph:calculator": Calculator,
  "ph:caret-down": ChevronDown,
  "ph:chart-line-up": TrendingUp,
  "ph:check": Check,
  "ph:check-circle": CheckCircle,
  "ph:check-circle-fill": CheckCircle,
  "ph:circle-notch": LoaderCircle,
  "ph:clock": Clock,
  "ph:envelope": Mail,
  "ph:envelope-open-fill": MailOpen,
  "ph:facebook-logo-bold": Facebook,
  "ph:globe": Globe2,
  "ph:house-simple": House,
  "ph:house-simple-fill": House,
  "ph:instagram-logo-bold": Instagram,
  "ph:link": Link2,
  "ph:list": Menu,
  "ph:lock": Lock,
  "ph:map-pin": MapPin,
  "ph:map-pin-fill": MapPin,
  "ph:phone-bold": Phone,
  "ph:rocket-launch": Rocket,
  "ph:share-network": Share2,
  "ph:sliders-horizontal": SlidersHorizontal,
  "ph:sparkle": Sparkles,
  "ph:storefront": Store,
  "ph:trending-up": TrendingUp,
  "ph:warning-circle-fill": CircleAlert,
  "ph:x-logo-bold": Twitter,
  "solar:arrow-right-linear": ArrowRight,
  "solar:buildings-2-linear": Building2,
  "solar:home-2-linear": Home,
  "solar:moon-bold": Moon,
  "solar:sun-bold": Sun,
  "tabler:x": X,
};

export function AppIcon({
  icon,
  width,
  height,
  size,
  strokeWidth = 2,
  "aria-label": ariaLabel,
  ...props
}: AppIconProps) {
  const Icon = ICONS[icon] ?? Circle;
  const iconSize = size ?? width ?? height ?? "1em";

  return (
    <Icon
      {...props}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      size={iconSize}
      strokeWidth={strokeWidth}
    />
  );
}
