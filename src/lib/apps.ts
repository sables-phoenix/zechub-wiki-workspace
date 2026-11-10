export type AppId =
  | "home"
  | "start"
  | "wallets"
  | "use"
  | "learn"
  | "build"
  | "ecosystem"
  | "library"
  | "network"
  | "donate"
  | "contribute"
  | "settings";

export type DesktopApp = {
  id: AppId;
  label: string;
  dockLabel: string;
  href: string;
  dock: boolean;
  matches: (pathname: string) => boolean;
};

const within = (pathname: string, base: string): boolean =>
  pathname === base || pathname.startsWith(`${base}/`);

export const desktopApps: readonly DesktopApp[] = [
  {
    id: "home",
    label: "Home",
    dockLabel: "Home",
    href: "/",
    dock: true,
    matches: (pathname) => pathname === "/",
  },
  {
    id: "start",
    label: "Start Here",
    dockLabel: "Start",
    href: "/start-here",
    dock: true,
    matches: (pathname) => within(pathname, "/start-here"),
  },
  {
    id: "wallets",
    label: "Wallets",
    dockLabel: "Wallets",
    href: "/wallets",
    dock: true,
    matches: (pathname) => within(pathname, "/wallets"),
  },
  {
    id: "use",
    label: "Using Zcash",
    dockLabel: "Use",
    href: "/using-zcash",
    dock: true,
    matches: (pathname) =>
      within(pathname, "/using-zcash") ||
      within(pathname, "/zcash-use-cases") ||
      within(pathname, "/privacy-tools"),
  },
  {
    id: "learn",
    label: "Learn",
    dockLabel: "Learn",
    href: "/learn",
    dock: true,
    matches: (pathname) =>
      within(pathname, "/learn") ||
      within(pathname, "/zcash-tech") ||
      within(pathname, "/zero-to-zero-knowledge") ||
      within(pathname, "/glossary-and-faqs"),
  },
  {
    id: "build",
    label: "Build",
    dockLabel: "Build",
    href: "/build",
    dock: true,
    matches: (pathname) =>
      within(pathname, "/build") ||
      within(pathname, "/guides") ||
      within(pathname, "/research") ||
      within(pathname, "/tutorials"),
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    dockLabel: "Ecosystem",
    href: "/ecosystem",
    dock: true,
    matches: (pathname) =>
      within(pathname, "/ecosystem") ||
      within(pathname, "/zcash-community") ||
      within(pathname, "/zcash-organizations") ||
      within(pathname, "/zfav-club"),
  },
  {
    id: "library",
    label: "Library",
    dockLabel: "Library",
    href: "/library",
    dock: true,
    matches: (pathname) => within(pathname, "/library"),
  },
  {
    id: "network",
    label: "Network",
    dockLabel: "Network",
    href: "/network",
    dock: false,
    matches: (pathname) => within(pathname, "/network"),
  },
  {
    id: "donate",
    label: "Donate",
    dockLabel: "Donate",
    href: "/donate",
    dock: false,
    matches: (pathname) => within(pathname, "/donate"),
  },
  {
    id: "contribute",
    label: "Contribute",
    dockLabel: "Contribute",
    href: "/contribute",
    dock: false,
    matches: (pathname) => within(pathname, "/contribute"),
  },
  {
    id: "settings",
    label: "Settings",
    dockLabel: "Settings",
    href: "/settings",
    dock: false,
    matches: (pathname) => within(pathname, "/settings"),
  },
];

export const dockApps: readonly DesktopApp[] = desktopApps.filter((app) => app.dock);

export const getActiveApp = (pathname: string): DesktopApp | undefined =>
  desktopApps.find((app) => app.matches(pathname));

export type WindowMeta = {
  app: DesktopApp;
  subtitle: string;
};

const subtitleFor = (pathname: string): string => {
  if (pathname === "/") return "Welcome";
  if (pathname === "/start-here") return "Overview";
  if (within(pathname, "/start-here")) return "Article";
  if (pathname === "/wallets") return "Overview";
  if (pathname === "/using-zcash") return "Overview";
  if (within(pathname, "/using-zcash")) return "Article";
  if (pathname === "/zcash-use-cases") return "Use cases";
  if (within(pathname, "/zcash-use-cases")) return "Article";
  if (pathname === "/privacy-tools") return "Privacy tools";
  if (within(pathname, "/privacy-tools")) return "Article";
  if (pathname === "/learn") return "Zcash Tech";
  if (pathname === "/zcash-tech") return "Zcash Tech";
  if (within(pathname, "/zcash-tech")) return "Article";
  if (pathname === "/zero-to-zero-knowledge") return "Zero to Zero";
  if (within(pathname, "/zero-to-zero-knowledge")) return "Article";
  if (pathname === "/glossary-and-faqs") return "Glossary";
  if (within(pathname, "/glossary-and-faqs")) return "Article";
  if (pathname === "/build") return "Guides";
  if (pathname === "/guides") return "Guides";
  if (within(pathname, "/guides")) return "Article";
  if (pathname === "/research") return "Research";
  if (within(pathname, "/research")) return "Article";
  if (pathname === "/tutorials") return "Tutorials";
  if (within(pathname, "/tutorials")) return "Article";
  if (pathname === "/ecosystem") return "Zcash Community";
  if (pathname === "/zcash-organizations") return "Organizations";
  if (within(pathname, "/zcash-organizations")) return "Organization";
  if (pathname === "/zcash-community") return "Community";
  if (within(pathname, "/zcash-community")) return "Article";
  if (pathname === "/zfav-club") return "ZFAV Club";
  if (within(pathname, "/zfav-club")) return "Article";
  if (pathname === "/library") return "Site Navigation";
  if (pathname === "/network") return "Dashboard";
  if (pathname === "/donate") return "Donate to ZecHub";
  if (pathname === "/contribute") return "Help Build ZecHub";
  if (within(pathname, "/contribute")) return "Article";
  if (pathname === "/settings") return "Preferences";
  return "Workspace";
};

const fallbackApp: DesktopApp = {
  id: "home",
  label: "ZecHub",
  dockLabel: "ZecHub",
  href: "/",
  dock: false,
  matches: () => false,
};

export const getWindowMeta = (pathname: string): WindowMeta => ({
  app: getActiveApp(pathname) ?? fallbackApp,
  subtitle: subtitleFor(pathname),
});
