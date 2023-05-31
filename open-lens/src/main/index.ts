import { autoRegister } from "@ogre-tools/injectable-extension-for-auto-registration";
import { runInAction } from "mobx";
import {
  mainExtensionApi as Main,
  commonExtensionApi as Common,
  registerLensCore,
} from "@meniscus/core/main";
import { createContainer } from "@ogre-tools/injectable";
import { registerMobX } from "@ogre-tools/injectable-extension-for-mobx";
import { registerFeature } from "@meniscus/feature-core";
import { applicationFeature, startApplicationInjectionToken } from '@meniscus/application'
import { applicationFeatureForElectronMain } from '@meniscus/application-for-electron-main'
import { messagingFeatureForMain } from "@meniscus/messaging-for-main";
import { loggerFeature } from "@meniscus/logger";
import { randomFeature } from "@meniscus/random";
import { kubeApiSpecificsFeature } from "@meniscus/kube-api-specifics";

const environment = "main";

const di = createContainer(environment, {
  detectCycles: false,
});

registerMobX(di);

runInAction(() => {
  registerLensCore(di, environment);

  registerFeature(di,
    loggerFeature,
  );

  registerFeature(
    di,
    applicationFeature,
    applicationFeatureForElectronMain,
    messagingFeatureForMain,
    randomFeature,
    kubeApiSpecificsFeature,
  );

  try {
    autoRegister({
      di,
      targetModule: module,
      getRequireContexts: () => [
        require.context("./", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
        require.context("../common", true, CONTEXT_MATCHER_FOR_NON_FEATURES),
      ],
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

const startApplication = di.inject(startApplicationInjectionToken);

startApplication().catch((error) => {
  console.error(error);
  process.exit(1);
})

export {
  Mobx,
  Pty,
} from "@meniscus/core/main";

export const LensExtensions = {
  Main,
  Common,
}
