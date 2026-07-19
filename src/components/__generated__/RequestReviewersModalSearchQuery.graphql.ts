/**
 * @generated SignedSource<<419b9539bccf19a73001936dcdc690ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RequestReviewersModalSearchQuery$variables = {
  name: string;
  owner: string;
  q: string;
};
export type RequestReviewersModalSearchQuery$data = {
  readonly repository: {
    readonly assignableUsers: {
      readonly nodes: ReadonlyArray<{
        readonly avatarUrl: any;
        readonly id: string;
        readonly login: string;
        readonly name: string | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
};
export type RequestReviewersModalSearchQuery = {
  response: RequestReviewersModalSearchQuery$data;
  variables: RequestReviewersModalSearchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "q"
},
v3 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 20
    },
    {
      "kind": "Variable",
      "name": "query",
      "variableName": "q"
    }
  ],
  "concreteType": "UserConnection",
  "kind": "LinkedField",
  "name": "assignableUsers",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        (v4/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "login",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "size",
              "value": 40
            }
          ],
          "kind": "ScalarField",
          "name": "avatarUrl",
          "storageKey": "avatarUrl(size:40)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RequestReviewersModalSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "RequestReviewersModalSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "81bc6260857a7750fd0388eebad10c19",
    "id": null,
    "metadata": {},
    "name": "RequestReviewersModalSearchQuery",
    "operationKind": "query",
    "text": "query RequestReviewersModalSearchQuery(\n  $owner: String!\n  $name: String!\n  $q: String!\n) {\n  repository(owner: $owner, name: $name) {\n    assignableUsers(query: $q, first: 20) {\n      nodes {\n        id\n        login\n        name\n        avatarUrl(size: 40)\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9787e7022c70b45d6c117b48690c1300";

export default node;
