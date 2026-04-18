import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap.js";
import "./custom.css";

const serverFunction = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default function Layout({ children }) {
  return (
    <div className="[&_.app-wrap]:bg-[radial-gradient(circle_at_top_left,hsl(var(--accent)/0.12),transparent_34%),radial-gradient(circle_at_90%_10%,hsl(var(--accent)/0.08),transparent_26%),#0f0f0f] [&_.app-header]:backdrop-blur-xl [&_.app-header]:supports-[backdrop-filter]:bg-black/45 [&_.collection-edit]:mx-auto [&_.collection-edit]:max-w-[1280px] [&_.collection-list]:mx-auto [&_.collection-list]:max-w-[1280px] [&_.dashboard]:mx-auto [&_.dashboard]:max-w-[1280px] [&_.render-fields]:rounded-xl">
      <RootLayout
        config={config}
        importMap={importMap}
        serverFunction={serverFunction}
      >
        {children}
      </RootLayout>
    </div>
  );
}
