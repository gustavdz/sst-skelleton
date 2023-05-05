import { StackContext, StaticSite, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";

export const FrontendStack = ({ stack, app }: StackContext): void => {
  const { api } = use(ApiStack);
  const { auth } = use(AuthStack);
  const { bucket } = use(StorageStack);

  const configEnv = {
    REACT_APP_API_URL: api.customDomainUrl || api.url,
    REACT_APP_REGION: app.region,
    REACT_APP_BUCKET: bucket.bucketName,
    REACT_APP_USER_POOL_ID: auth.userPoolId,
    REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
    REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
  };
  // Define our React app
  const site: StaticSite = new StaticSite(stack, "CreateReactAppSite", {
    path: "frontend",
    buildOutput: "build",
    buildCommand: "npm run build",
    // Pass in our environment variables
    environment: configEnv,
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "http://localhost:3000",
  });
};
