/**
 * @generated SignedSource<<6318689b10899d180f50e19e91fd4970>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type routerViewerQuery$variables = Record<PropertyKey, never>;
export type routerViewerQuery$data = {
  readonly viewer: {
    readonly avatarUrl: any;
    readonly login: string;
  };
};
export type routerViewerQuery = {
  response: routerViewerQuery$data;
  variables: routerViewerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "routerViewerQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routerViewerQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b150a13114fefe361a3270df916c6cc0",
    "id": null,
    "metadata": {},
    "name": "routerViewerQuery",
    "operationKind": "query",
    "text": "query routerViewerQuery {\n  viewer {\n    login\n    avatarUrl\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "dad5c3c59a8b65bc5a21acd83eba16a8";

export default node;
