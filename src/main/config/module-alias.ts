import { resolve } from "path";

import { addAlias } from "module-alias";

addAlias("@domain", resolve("src/domain"));
addAlias("@app", resolve("src/app"));
addAlias("@infra", resolve("src/infra"));
addAlias("@main", resolve("src/main"));
addAlias("@presentation", resolve("src/presentation"));
