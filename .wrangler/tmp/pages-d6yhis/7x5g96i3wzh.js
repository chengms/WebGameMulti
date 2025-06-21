// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: ["/proxy/*"],
  exclude: ["/assets/*", "/games/*", "/*.js", "/*.css", "/*.html", "/*.ico", "/*.png", "/*.jpg", "/*.jpeg", "/*.svg", "/favicon.svg"]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "E:\\Code\\web\\WebGameMulti\\.wrangler\\tmp\\pages-d6yhis\\functionsWorker-0.7335879485352692.mjs";
import { isRoutingRuleMatch } from "E:\\Code\\web\\WebGameMulti\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "E:\\Code\\web\\WebGameMulti\\.wrangler\\tmp\\pages-d6yhis\\functionsWorker-0.7335879485352692.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=7x5g96i3wzh.js.map
