import "@meniscus/core/styles";
import "@meniscus/button/styles";
import "@meniscus/error-boundary/styles";
import "@meniscus/tooltip/styles";
import "@meniscus/resizing-anchor/styles";
import "@meniscus/icon/styles";
import "@meniscus/animate/styles";
import "@meniscus/notifications/styles";

import { runInAction } from "mobx";
import {
  rendererExtensionApi as Renderer,
  commonExtensionApi as Common,
  registerLensCore,
  metricsFeature,
} from "@meniscus/core/renderer";
import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";
import { registerFeature } from "@meniscus/feature-core";
import {
  applicationFeature,
  startApplicationInjectionToken
} from "@meniscus/application";
import { createContainer } from "@ogre-tools/injectable";
import { registerMobX } from "@ogre-tools/injectable-extension-for-mobx";
import { registerInjectableReact } from "@ogre-tools/injectable-react";
import { messagingFeatureForRenderer } from "@meniscus/messaging-for-renderer";
import { keyboardShortcutsFeature } from "@meniscus/keyboard-shortcuts";
import { reactApplicationFeature } from "@meniscus/react-application";
import { routingFeature } from "@meniscus/routing";
import { loggerFeature } from "@meniscus/logger";
import { animateFeature } from "@meniscus/animate";
import { clusterSidebarFeature } from "@meniscus/cluster-sidebar";
import { randomFeature } from "@meniscus/random";
import { kubeApiSpecificsFeature } from "@meniscus/kube-api-specifics";
import { notificationsFeature } from "@meniscus/notifications";

const environment = "renderer";

const di = createContainer(environment, {
  detectCycles: false,
});

runInAction(() => {
  registerMobX(di);
  registerInjectableReact(di);
  registerLensCore(di, environment);

  registerFeature(
    di,
    loggerFeature,
  );

  registerFeature(
    di,
    applicationFeature,
    messagingFeatureForRenderer,
    keyboardShortcutsFeature,
    reactApplicationFeature,
    routingFeature,
    metricsFeature,
    animateFeature,
    clusterSidebarFeature,
    randomFeature,
    kubeApiSpecificsFeature,
    notificationsFeature,
  );

  autoRegister({
    di,
    targetModule: module,
    getRequireContexts: () => [
      require.context("./", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
      require.context("../common", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
    ],
  });
});

const startApplication = di.inject(startApplicationInjectionToken);

startApplication();

export {
  React,
  ReactDOM,
  ReactRouter,
  ReactRouterDom,
  Mobx,
  MobxReact,
} from "@meniscus/core/renderer";

export const LensExtensions = {
  Renderer,
  Common,
};
