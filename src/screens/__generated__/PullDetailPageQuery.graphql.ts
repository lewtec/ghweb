/**
 * @generated SignedSource<<36b7992a08309e523b8f83f200e241b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MergeableState = "CONFLICTING" | "MERGEABLE" | "UNKNOWN" | "%future added value";
export type PullRequestReviewState = "APPROVED" | "CHANGES_REQUESTED" | "COMMENTED" | "DISMISSED" | "PENDING" | "%future added value";
export type PullRequestState = "CLOSED" | "MERGED" | "OPEN" | "%future added value";
export type PullDetailPageQuery$variables = {
  name: string;
  number: number;
  owner: string;
};
export type PullDetailPageQuery$data = {
  readonly repository: {
    readonly pullRequest: {
      readonly author: {
        readonly login: string;
      } | null | undefined;
      readonly baseRefName: string;
      readonly body: string;
      readonly comments: {
        readonly nodes: ReadonlyArray<{
          readonly author: {
            readonly login: string;
          } | null | undefined;
          readonly body: string;
          readonly createdAt: any;
          readonly id: string;
        } | null | undefined> | null | undefined;
      };
      readonly commits: {
        readonly nodes: ReadonlyArray<{
          readonly commit: {
            readonly messageHeadline: string;
            readonly oid: any;
          };
        } | null | undefined> | null | undefined;
      };
      readonly createdAt: any;
      readonly files: {
        readonly nodes: ReadonlyArray<{
          readonly additions: number;
          readonly deletions: number;
          readonly path: string;
        } | null | undefined> | null | undefined;
      } | null | undefined;
      readonly headRefName: string;
      readonly id: string;
      readonly isDraft: boolean;
      readonly mergeable: MergeableState;
      readonly merged: boolean;
      readonly number: number;
      readonly reviews: {
        readonly nodes: ReadonlyArray<{
          readonly author: {
            readonly login: string;
          } | null | undefined;
          readonly body: string;
          readonly createdAt: any;
          readonly id: string;
          readonly state: PullRequestReviewState;
        } | null | undefined> | null | undefined;
      } | null | undefined;
      readonly state: PullRequestState;
      readonly title: string;
      readonly url: any;
    } | null | undefined;
  } | null | undefined;
};
export type PullDetailPageQuery = {
  response: PullDetailPageQuery$data;
  variables: PullDetailPageQuery$variables;
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
  "name": "number"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
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
v4 = [
  {
    "kind": "Variable",
    "name": "number",
    "variableName": "number"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "body",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDraft",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "merged",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mergeable",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": [
    (v15/*: any*/)
  ],
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "baseRefName",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headRefName",
  "storageKey": null
},
v19 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 1
  }
],
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "messageHeadline",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "oid",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 50
    }
  ],
  "concreteType": "PullRequestChangedFileConnection",
  "kind": "LinkedField",
  "name": "files",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PullRequestChangedFile",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "additions",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "deletions",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "files(first:50)"
},
v23 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v24 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 40
  }
],
v25 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    (v15/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        (v5/*: any*/)
      ],
      "type": "Node",
      "abstractKey": "__isNode"
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
    "name": "PullDetailPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "PullRequest",
            "kind": "LinkedField",
            "name": "pullRequest",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              {
                "alias": null,
                "args": (v19/*: any*/),
                "concreteType": "PullRequestCommitConnection",
                "kind": "LinkedField",
                "name": "commits",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PullRequestCommit",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Commit",
                        "kind": "LinkedField",
                        "name": "commit",
                        "plural": false,
                        "selections": [
                          (v20/*: any*/),
                          (v21/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "commits(last:1)"
              },
              (v22/*: any*/),
              {
                "alias": null,
                "args": (v23/*: any*/),
                "concreteType": "PullRequestReviewConnection",
                "kind": "LinkedField",
                "name": "reviews",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PullRequestReview",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v9/*: any*/),
                      (v16/*: any*/),
                      (v8/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviews(first:20)"
              },
              {
                "alias": null,
                "args": (v24/*: any*/),
                "concreteType": "IssueCommentConnection",
                "kind": "LinkedField",
                "name": "comments",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IssueComment",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v8/*: any*/),
                      (v14/*: any*/),
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "comments(first:40)"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "PullDetailPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "PullRequest",
            "kind": "LinkedField",
            "name": "pullRequest",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v25/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              {
                "alias": null,
                "args": (v19/*: any*/),
                "concreteType": "PullRequestCommitConnection",
                "kind": "LinkedField",
                "name": "commits",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PullRequestCommit",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Commit",
                        "kind": "LinkedField",
                        "name": "commit",
                        "plural": false,
                        "selections": [
                          (v20/*: any*/),
                          (v21/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "commits(last:1)"
              },
              (v22/*: any*/),
              {
                "alias": null,
                "args": (v23/*: any*/),
                "concreteType": "PullRequestReviewConnection",
                "kind": "LinkedField",
                "name": "reviews",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PullRequestReview",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v9/*: any*/),
                      (v25/*: any*/),
                      (v8/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviews(first:20)"
              },
              {
                "alias": null,
                "args": (v24/*: any*/),
                "concreteType": "IssueCommentConnection",
                "kind": "LinkedField",
                "name": "comments",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IssueComment",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v8/*: any*/),
                      (v14/*: any*/),
                      (v25/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "comments(first:40)"
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5b633d5fa1471a0e6be30dc534dff838",
    "id": null,
    "metadata": {},
    "name": "PullDetailPageQuery",
    "operationKind": "query",
    "text": "query PullDetailPageQuery(\n  $owner: String!\n  $name: String!\n  $number: Int!\n) {\n  repository(owner: $owner, name: $name) {\n    pullRequest(number: $number) {\n      id\n      number\n      title\n      body\n      state\n      isDraft\n      merged\n      mergeable\n      url\n      createdAt\n      author {\n        __typename\n        login\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      baseRefName\n      headRefName\n      commits(last: 1) {\n        nodes {\n          commit {\n            messageHeadline\n            oid\n            id\n          }\n          id\n        }\n      }\n      files(first: 50) {\n        nodes {\n          path\n          additions\n          deletions\n        }\n      }\n      reviews(first: 20) {\n        nodes {\n          id\n          state\n          author {\n            __typename\n            login\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n          body\n          createdAt\n        }\n      }\n      comments(first: 40) {\n        nodes {\n          id\n          body\n          createdAt\n          author {\n            __typename\n            login\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5c5d02803090072b4a361e49c1fa4ce3";

export default node;
