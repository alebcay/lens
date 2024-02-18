# @meniscus/react-application

# Usage

```bash
$ npm install @meniscus/react-application
```

```typescript
import { reactApplicationFeature } from "@meniscus/react-application";
import { registerFeature } from "@meniscus/feature-core";
import { createContainer } from "@ogre-tools/injectable";

const di = createContainer("some-container");

registerFeature(di, reactApplicationRootFeature);
```

## Extendability
