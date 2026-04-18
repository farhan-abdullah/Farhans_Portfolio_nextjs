import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap.js";
import "./custom.css";

/**
 * Layout dell'admin panel Payload.
 *
 * Importa `./custom.css` che sovrascrive le CSS variables di Payload
 * e i selettori globali (.btn, .nav, .card, .field-type, .table ecc.)
 * per allineare l'estetica al portfolio (teal #00d4aa + navy).
 *
 * NON avvolgere RootLayout in un <div> Tailwind: l'admin ha il suo
 * layout e i wrapper custom creano conflitti con l'hydration di Payload
 * (causa possibile di "removeChild" errors).
 */
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
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
