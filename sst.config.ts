import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { StorageStack } from "./stacks/StorageStack";
import { AuthStack } from "./stacks/AuthStack";
import { FrontendStack } from "./stacks/FrontendStack";

const config = {
  config(_input: any) {
    return {
      name: "sst-skelleton",
      region: "us-east-1",
    };
  },
  stacks(app: any) {
    app.stack(StorageStack).stack(AuthStack).stack(ApiStack).stack(FrontendStack);
  },
};

export default config satisfies SSTConfig;
// export default config;
