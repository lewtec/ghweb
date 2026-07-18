/**
 * @generated SignedSource<<84efbfbf36be5af60c467603e4192a49>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HomePageQuery$variables = Record<PropertyKey, never>;
export type HomePageQuery$data = {
  readonly assignedIssues: {
    readonly issueCount: number;
    readonly nodes: ReadonlyArray<{
      readonly id?: string;
      readonly number?: number;
      readonly repository?: {
        readonly name: string;
        readonly nameWithOwner: string;
        readonly owner: {
          readonly login: string;
        };
      };
      readonly title?: string;
      readonly updatedAt?: any;
    } | null | undefined> | null | undefined;
  };
  readonly myOpenPrs: {
    readonly issueCount: number;
    readonly nodes: ReadonlyArray<{
      readonly id?: string;
      readonly isDraft?: boolean;
      readonly number?: number;
      readonly repository?: {
        readonly name: string;
        readonly nameWithOwner: string;
        readonly owner: {
          readonly login: string;
        };
      };
      readonly title?: string;
      readonly updatedAt?: any;
    } | null | undefined> | null | undefined;
  };
  readonly rateLimit: {
    readonly cost: number;
    readonly limit: number;
    readonly remaining: number;
    readonly resetAt: any;
  } | null | undefined;
  readonly reviewRequests: {
    readonly issueCount: number;
    readonly nodes: ReadonlyArray<{
      readonly id?: string;
      readonly number?: number;
      readonly repository?: {
        readonly name: string;
        readonly nameWithOwner: string;
        readonly owner: {
          readonly login: string;
        };
      };
      readonly title?: string;
      readonly updatedAt?: any;
    } | null | undefined> | null | undefined;
  };
  readonly viewer: {
    readonly avatarUrl: any;
    readonly login: string;
    readonly name: string | null | undefined;
  };
};
export type HomePageQuery = {
  response: HomePageQuery$data;
  variables: HomePageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "concreteType": "RateLimit",
  "kind": "LinkedField",
  "name": "rateLimit",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cost",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "remaining",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "limit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "resetAt",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "first",
  "value": 8
},
v5 = {
  "kind": "Literal",
  "name": "type",
  "value": "ISSUE"
},
v6 = [
  (v4/*: any*/),
  {
    "kind": "Literal",
    "name": "query",
    "value": "is:open is:pr review-requested:@me sort:updated-desc"
  },
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "issueCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameWithOwner",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Repository",
  "kind": "LinkedField",
  "name": "repository",
  "plural": false,
  "selections": [
    (v12/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v14 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v13/*: any*/)
],
v15 = [
  (v4/*: any*/),
  {
    "kind": "Literal",
    "name": "query",
    "value": "is:open is:issue assignee:@me sort:updated-desc"
  },
  (v5/*: any*/)
],
v16 = [
  (v4/*: any*/),
  {
    "kind": "Literal",
    "name": "query",
    "value": "is:open is:pr author:@me sort:updated-desc"
  },
  (v5/*: any*/)
],
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDraft",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Repository",
  "kind": "LinkedField",
  "name": "repository",
  "plural": false,
  "selections": [
    (v12/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        (v18/*: any*/),
        (v1/*: any*/),
        (v8/*: any*/)
      ],
      "storageKey": null
    },
    (v2/*: any*/),
    (v8/*: any*/)
  ],
  "storageKey": null
},
v20 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v19/*: any*/)
],
v21 = {
  "kind": "InlineFragment",
  "selections": [
    (v8/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomePageQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "reviewRequests",
        "args": (v6/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": (v14/*: any*/),
                "type": "PullRequest",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:8,query:\"is:open is:pr review-requested:@me sort:updated-desc\",type:\"ISSUE\")"
      },
      {
        "alias": "assignedIssues",
        "args": (v15/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": (v14/*: any*/),
                "type": "Issue",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:8,query:\"is:open is:issue assignee:@me sort:updated-desc\",type:\"ISSUE\")"
      },
      {
        "alias": "myOpenPrs",
        "args": (v16/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v17/*: any*/),
                  (v13/*: any*/)
                ],
                "type": "PullRequest",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:8,query:\"is:open is:pr author:@me sort:updated-desc\",type:\"ISSUE\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomePageQuery",
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v8/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "reviewRequests",
        "args": (v6/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v18/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v20/*: any*/),
                "type": "PullRequest",
                "abstractKey": null
              },
              (v21/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:8,query:\"is:open is:pr review-requested:@me sort:updated-desc\",type:\"ISSUE\")"
      },
      {
        "alias": "assignedIssues",
        "args": (v15/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v18/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v20/*: any*/),
                "type": "Issue",
                "abstractKey": null
              },
              (v21/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:8,query:\"is:open is:issue assignee:@me sort:updated-desc\",type:\"ISSUE\")"
      },
      {
        "alias": "myOpenPrs",
        "args": (v16/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v18/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v17/*: any*/),
                  (v19/*: any*/)
                ],
                "type": "PullRequest",
                "abstractKey": null
              },
              (v21/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:8,query:\"is:open is:pr author:@me sort:updated-desc\",type:\"ISSUE\")"
      }
    ]
  },
  "params": {
    "cacheID": "93ef7e796c8c0eb4969b45b6a1f82447",
    "id": null,
    "metadata": {},
    "name": "HomePageQuery",
    "operationKind": "query",
    "text": "query HomePageQuery {\n  rateLimit {\n    cost\n    remaining\n    limit\n    resetAt\n  }\n  viewer {\n    login\n    name\n    avatarUrl\n    id\n  }\n  reviewRequests: search(query: \"is:open is:pr review-requested:@me sort:updated-desc\", type: ISSUE, first: 8) {\n    issueCount\n    nodes {\n      __typename\n      ... on PullRequest {\n        id\n        number\n        title\n        updatedAt\n        repository {\n          nameWithOwner\n          owner {\n            __typename\n            login\n            id\n          }\n          name\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  assignedIssues: search(query: \"is:open is:issue assignee:@me sort:updated-desc\", type: ISSUE, first: 8) {\n    issueCount\n    nodes {\n      __typename\n      ... on Issue {\n        id\n        number\n        title\n        updatedAt\n        repository {\n          nameWithOwner\n          owner {\n            __typename\n            login\n            id\n          }\n          name\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  myOpenPrs: search(query: \"is:open is:pr author:@me sort:updated-desc\", type: ISSUE, first: 8) {\n    issueCount\n    nodes {\n      __typename\n      ... on PullRequest {\n        id\n        number\n        title\n        updatedAt\n        isDraft\n        repository {\n          nameWithOwner\n          owner {\n            __typename\n            login\n            id\n          }\n          name\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c0e9f6c477575ca96626a80202554b9f";

export default node;
