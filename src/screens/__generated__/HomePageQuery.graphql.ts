/**
 * @generated SignedSource<<e66553056587f6176a162a1c253cc022>>
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
        readonly updatedAt: any;
      } | null | undefined> | null | undefined;
    };
    readonly repositoriesContributedTo: {
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
        readonly updatedAt: any;
      } | null | undefined> | null | undefined;
    };
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
  "name": "orderBy",
  "value": {
    "direction": "DESC",
    "field": "PUSHED_AT"
  }
},
v5 = [
  {
    "kind": "Literal",
    "name": "contributionTypes",
    "value": [
      "COMMIT",
      "PULL_REQUEST",
      "ISSUE"
    ]
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
  },
  {
    "kind": "Literal",
    "name": "includeUserRepositories",
    "value": true
  },
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameWithOwner",
  "storageKey": null
},
v8 = {
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPrivate",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pushedAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v13 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Repository",
    "kind": "LinkedField",
    "name": "nodes",
    "plural": true,
    "selections": [
      (v6/*: any*/),
      (v7/*: any*/),
      (v2/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/),
      (v10/*: any*/),
      (v11/*: any*/),
      (v12/*: any*/)
    ],
    "storageKey": null
  }
],
v14 = [
  "OWNER",
  "COLLABORATOR",
  "ORGANIZATION_MEMBER"
],
v15 = [
  {
    "kind": "Literal",
    "name": "affiliations",
    "value": (v14/*: any*/)
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v4/*: any*/),
  {
    "kind": "Literal",
    "name": "ownerAffiliations",
    "value": (v14/*: any*/)
  }
],
v16 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v17 = {
  "kind": "Literal",
  "name": "type",
  "value": "ISSUE"
},
v18 = [
  (v16/*: any*/),
  {
    "kind": "Literal",
    "name": "query",
    "value": "is:open is:pr review-requested:@me"
  },
  (v17/*: any*/)
],
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "issueCount",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "Repository",
  "kind": "LinkedField",
  "name": "repository",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    (v8/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v23 = [
  (v6/*: any*/),
  (v20/*: any*/),
  (v21/*: any*/),
  (v12/*: any*/),
  (v22/*: any*/)
],
v24 = [
  (v16/*: any*/),
  {
    "kind": "Literal",
    "name": "query",
    "value": "is:open is:issue assignee:@me"
  },
  (v17/*: any*/)
],
v25 = [
  (v16/*: any*/),
  {
    "kind": "Literal",
    "name": "query",
    "value": "is:open is:pr author:@me"
  },
  (v17/*: any*/)
],
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDraft",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "owner",
  "plural": false,
  "selections": [
    (v27/*: any*/),
    (v1/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
},
v29 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Repository",
    "kind": "LinkedField",
    "name": "nodes",
    "plural": true,
    "selections": [
      (v6/*: any*/),
      (v7/*: any*/),
      (v2/*: any*/),
      (v28/*: any*/),
      (v9/*: any*/),
      (v10/*: any*/),
      (v11/*: any*/),
      (v12/*: any*/)
    ],
    "storageKey": null
  }
],
v30 = {
  "alias": null,
  "args": null,
  "concreteType": "Repository",
  "kind": "LinkedField",
  "name": "repository",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    (v28/*: any*/),
    (v2/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
},
v31 = [
  (v6/*: any*/),
  (v20/*: any*/),
  (v21/*: any*/),
  (v12/*: any*/),
  (v30/*: any*/)
],
v32 = {
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/)
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositoriesContributedTo",
            "plural": false,
            "selections": (v13/*: any*/),
            "storageKey": "repositoriesContributedTo(contributionTypes:[\"COMMIT\",\"PULL_REQUEST\",\"ISSUE\"],first:12,includeUserRepositories:true,orderBy:{\"direction\":\"DESC\",\"field\":\"PUSHED_AT\"})"
          },
          {
            "alias": null,
            "args": (v15/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": (v13/*: any*/),
            "storageKey": "repositories(affiliations:[\"OWNER\",\"COLLABORATOR\",\"ORGANIZATION_MEMBER\"],first:15,orderBy:{\"direction\":\"DESC\",\"field\":\"PUSHED_AT\"},ownerAffiliations:[\"OWNER\",\"COLLABORATOR\",\"ORGANIZATION_MEMBER\"])"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "reviewRequests",
        "args": (v18/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v19/*: any*/),
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
                "selections": (v23/*: any*/),
                "type": "PullRequest",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:10,query:\"is:open is:pr review-requested:@me\",type:\"ISSUE\")"
      },
      {
        "alias": "assignedIssues",
        "args": (v24/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v19/*: any*/),
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
                "selections": (v23/*: any*/),
                "type": "Issue",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:10,query:\"is:open is:issue assignee:@me\",type:\"ISSUE\")"
      },
      {
        "alias": "myOpenPrs",
        "args": (v25/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v19/*: any*/),
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
                  (v6/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v12/*: any*/),
                  (v26/*: any*/),
                  (v22/*: any*/)
                ],
                "type": "PullRequest",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:10,query:\"is:open is:pr author:@me\",type:\"ISSUE\")"
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
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositoriesContributedTo",
            "plural": false,
            "selections": (v29/*: any*/),
            "storageKey": "repositoriesContributedTo(contributionTypes:[\"COMMIT\",\"PULL_REQUEST\",\"ISSUE\"],first:12,includeUserRepositories:true,orderBy:{\"direction\":\"DESC\",\"field\":\"PUSHED_AT\"})"
          },
          {
            "alias": null,
            "args": (v15/*: any*/),
            "concreteType": "RepositoryConnection",
            "kind": "LinkedField",
            "name": "repositories",
            "plural": false,
            "selections": (v29/*: any*/),
            "storageKey": "repositories(affiliations:[\"OWNER\",\"COLLABORATOR\",\"ORGANIZATION_MEMBER\"],first:15,orderBy:{\"direction\":\"DESC\",\"field\":\"PUSHED_AT\"},ownerAffiliations:[\"OWNER\",\"COLLABORATOR\",\"ORGANIZATION_MEMBER\"])"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "reviewRequests",
        "args": (v18/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v19/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v27/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v31/*: any*/),
                "type": "PullRequest",
                "abstractKey": null
              },
              (v32/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:10,query:\"is:open is:pr review-requested:@me\",type:\"ISSUE\")"
      },
      {
        "alias": "assignedIssues",
        "args": (v24/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v19/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v27/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v31/*: any*/),
                "type": "Issue",
                "abstractKey": null
              },
              (v32/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:10,query:\"is:open is:issue assignee:@me\",type:\"ISSUE\")"
      },
      {
        "alias": "myOpenPrs",
        "args": (v25/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v19/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v27/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v12/*: any*/),
                  (v26/*: any*/),
                  (v30/*: any*/)
                ],
                "type": "PullRequest",
                "abstractKey": null
              },
              (v32/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "search(first:10,query:\"is:open is:pr author:@me\",type:\"ISSUE\")"
      }
    ]
  },
  "params": {
    "cacheID": "d322a733f64d2cbf44356e037d81bdf5",
    "id": null,
    "metadata": {},
    "name": "HomePageQuery",
    "operationKind": "query",
    "text": "query HomePageQuery {\n  rateLimit {\n    cost\n    remaining\n    limit\n    resetAt\n  }\n  viewer {\n    login\n    name\n    avatarUrl\n    repositoriesContributedTo(first: 12, contributionTypes: [COMMIT, PULL_REQUEST, ISSUE], orderBy: {field: PUSHED_AT, direction: DESC}, includeUserRepositories: true) {\n      nodes {\n        id\n        nameWithOwner\n        name\n        owner {\n          __typename\n          login\n          id\n        }\n        description\n        isPrivate\n        pushedAt\n        updatedAt\n      }\n    }\n    repositories(first: 15, orderBy: {field: PUSHED_AT, direction: DESC}, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {\n      nodes {\n        id\n        nameWithOwner\n        name\n        owner {\n          __typename\n          login\n          id\n        }\n        description\n        isPrivate\n        pushedAt\n        updatedAt\n      }\n    }\n    id\n  }\n  reviewRequests: search(query: \"is:open is:pr review-requested:@me\", type: ISSUE, first: 10) {\n    issueCount\n    nodes {\n      __typename\n      ... on PullRequest {\n        id\n        number\n        title\n        updatedAt\n        repository {\n          nameWithOwner\n          owner {\n            __typename\n            login\n            id\n          }\n          name\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  assignedIssues: search(query: \"is:open is:issue assignee:@me\", type: ISSUE, first: 10) {\n    issueCount\n    nodes {\n      __typename\n      ... on Issue {\n        id\n        number\n        title\n        updatedAt\n        repository {\n          nameWithOwner\n          owner {\n            __typename\n            login\n            id\n          }\n          name\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  myOpenPrs: search(query: \"is:open is:pr author:@me\", type: ISSUE, first: 10) {\n    issueCount\n    nodes {\n      __typename\n      ... on PullRequest {\n        id\n        number\n        title\n        updatedAt\n        isDraft\n        repository {\n          nameWithOwner\n          owner {\n            __typename\n            login\n            id\n          }\n          name\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b3f22d659a0f0e5b939afe985169ddce";

export default node;
