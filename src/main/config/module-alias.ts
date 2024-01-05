import { resolve } from "path";

import { addAlias } from "module-alias";
addAlias("@domain", resolve(__dirname, "../../domain"));
addAlias("@app", resolve(__dirname,"../../app"));
addAlias("@infra", resolve(__dirname,"../../infra"));
addAlias("@main", resolve(__dirname,"../../main"));
addAlias("@presentation", resolve(__dirname,"../../presentation"));
