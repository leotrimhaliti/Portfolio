import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Award, ExternalLink, LucideProps, Mail, Newspaper } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <GitHubLogoIcon className={className} />
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <LinkedInLogoIcon className={className} />
);

const icons = {
  award: Award,
  github: GithubIcon,
  globe: ExternalLink,
  linkedin: LinkedinIcon,
  mail: Mail,
  newspaper: Newspaper,
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

const Icon = ({ name, className }: IconProps) => {
  const SelectedIcon = icons[name];
  return <SelectedIcon className={className} />;
};

export default Icon;
