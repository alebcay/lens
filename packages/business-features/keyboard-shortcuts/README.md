# @meniscus/keyboard-shortcuts

This Feature enables keyboard shortcuts in Lens

# Usage

```bash
$ npm install @meniscus/keyboard-shortcuts
```

```typescript
import { keyboardShortcutsFeature } from "@meniscus/keyboard-shortcuts";
import { registerFeature } from "@meniscus/feature-core";
import { createContainer } from "@ogre-tools/injectable";

const di = createContainer("some-container");

registerFeature(di, keyboardShortcutsFeature);
```

## Extendability
