import { onRequest as __proxy_js_onRequest } from "E:\\Code\\web\\WebGameMulti\\functions\\proxy.js"

export const routes = [
    {
      routePath: "/proxy",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__proxy_js_onRequest],
    },
  ]