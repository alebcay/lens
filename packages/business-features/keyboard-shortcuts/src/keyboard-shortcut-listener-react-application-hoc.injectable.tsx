import { getInjectable } from "@ogre-tools/injectable";
import { KeyboardShortcutListener } from "./keyboard-shortcut-listener";
import { reactApplicationHigherOrderComponentInjectionToken } from "@meniscus/react-application";

export const keyboardShortcutListenerReactApplicationHocInjectable = getInjectable({
  id: "keyboard-shortcut-listener-react-application-hoc",
  instantiate: () => KeyboardShortcutListener,

  injectionToken: reactApplicationHigherOrderComponentInjectionToken,
});
