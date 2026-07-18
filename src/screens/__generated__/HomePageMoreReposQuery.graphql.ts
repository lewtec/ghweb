/**
 * @generated SignedSource<<2a67cb3c0de7a0cc169e1479253fa8bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HomePageMoreReposQuery$variables = Record<PropertyKey, never>;
export type HomePageMoreReposQuery$data = {
  readonly viewer: {
    readonly repositories: {
      readonly nodes: ReadonlyArray<{
        readonly description: string | null | undefined;
        readonly id: string;
        readonly isPrivate: boolean;
        readonly name: string;
        readonly nameWithOwner: string;
        readonly owner: {
          readonly login: string;
        };
        readonly pushedAt: any | null | undefined;
      } | null | undefined> | null | undefined;
    };
  };
};
export type HomePageMoreReposQuery = {
  response: HomePageMoreReposQuery$data;
  variables: HomePageMoreReposQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  "OWNER",
  "COLLABORATOR",
  "ORGANIZATION_MEMBER"
],
v1 = [
  {
    "kind": "Literal",
    "name": "affiliations",
    "value": (v0/*: any*/)
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "PUSHED_AT"
    }
  },
  {
    "kind": "Literal",
    "name": "ownerAffiliations",
    "value": (v0/*: any*/)
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameWithOwner",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPrivate",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pushedAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomePageMoreReposQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Repository",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "owner",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "repositories(affiliations:[\"OWNER\",\"COLLABORATOR\",\"ORGANIZATION_MEMBER\"],first:10,orderBy:{\"direction\":\"DESC\",\"field\":\"PUSHED_AT\"},ownerAffiliations:[\"OWNER\",\"COLLABORATOR\",\"ORGANIZATION_MEMBER\"])"
          }
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
    "name": "HomePageMoreReposQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Repository",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "owner",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "repositories(affiliations:[\"OWNER\",\"COLLABORATOR\",\"ORGANIZATION_MEMBER\"],first:10,orderBy:{\"direction\":\"DESC\",\"field\":\"PUSHED_AT\"},ownerAffiliations:[\"OWNER\",\"COLLABORATOR\",\"ORGANIZATION_MEMBER\"])"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ac9d2bd5e6b617c5ddd0698a3539c26a",
    "id": null,
    "metadata": {},
    "name": "HomePageMoreReposQuery",
    "operationKind": "query",
    "text": "query HomePageMoreReposQuery {\n  viewer {\n    repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {\n      nodes {\n        id\n        nameWithOwner\n        name\n        owner {\n          __typename\n          login\n          id\n        }\n        description\n        isPrivate\n        pushedAt\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "abd065b267c581a5d9f42c60e5d9e8c4";

export default node;
