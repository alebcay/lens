import { bundledExtensionInjectionToken } from "@k8slens/legacy-extensions";
import { getInjectable } from "@ogre-tools/injectable";
import nodePodMenuManifest from "@meniscus/node-pod-menu/package.json";

const nodePodMenuExtensionInjectable = getInjectable({
  id: "node-pod-menu-extension",
  instantiate: (di) => ({
    manifest: nodePodMenuManifest,
    /**
     * Inline `require` is needed as to delay the loading and execution of the JS file until it is needed.
     *
     * Futhermore there might be code that runs "during load" and shouldn't be executed until everything is
     * setup for the extensions (ie globals).
     */
    main: () => require("@meniscus/node-pod-menu/main").default,
    renderer: () => require("@meniscus/node-pod-menu/renderer").default,
  }),
  injectionToken: bundledExtensionInjectionToken,
});

export default nodePodMenuExtensionInjectable;
