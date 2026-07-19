/**
 * @generated SignedSource<<f09683461c2edca3d26d0cf2741367b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RequestReviewersModalMutation$variables = {
  pullRequestId: string;
  union: boolean;
  userIds: ReadonlyArray<string>;
};
export type RequestReviewersModalMutation$data = {
  readonly requestReviews: {
    readonly pullRequest: {
      readonly id: string;
      readonly reviewRequests: {
        readonly nodes: ReadonlyArray<{
          readonly asCodeOwner: boolean;
          readonly id: string;
          readonly requestedReviewer: {
            readonly __typename: "Bot";
            readonly avatarUrl: any;
            readonly id: string;
            readonly login: string;
          } | {
            readonly __typename: "Team";
            readonly combinedSlug: string;
            readonly id: string;
            readonly teamName: string;
          } | {
            readonly __typename: "User";
            readonly avatarUrl: any;
            readonly id: string;
            readonly login: string;
            readonly userName: string | null | undefined;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          } | null | undefined;
        } | null | undefined> | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type RequestReviewersModalMutation = {
  response: RequestReviewersModalMutation$data;
  variables: RequestReviewersModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pullRequestId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "union"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userIds"
},
v3 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "pullRequestId",
        "variableName": "pullRequestId"
      },
      {
        "kind": "Variable",
        "name": "union",
        "variableName": "union"
      },
      {
        "kind": "Variable",
        "name": "userIds",
        "variableName": "userIds"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 40
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "asCodeOwner",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v9 = {
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
},
v10 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/),
    (v8/*: any*/),
    {
      "alias": "userName",
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v9/*: any*/)
  ],
  "type": "User",
  "abstractKey": null
},
v11 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/),
    {
      "alias": "teamName",
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "combinedSlug",
      "storageKey": null
    }
  ],
  "type": "Team",
  "abstractKey": null
},
v12 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/)
  ],
  "type": "Bot",
  "abstractKey": null
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
    "name": "RequestReviewersModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "RequestReviewsPayload",
        "kind": "LinkedField",
        "name": "requestReviews",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PullRequest",
            "kind": "LinkedField",
            "name": "pullRequest",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "ReviewRequestConnection",
                "kind": "LinkedField",
                "name": "reviewRequests",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ReviewRequest",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "requestedReviewer",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviewRequests(first:40)"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "RequestReviewersModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "RequestReviewsPayload",
        "kind": "LinkedField",
        "name": "requestReviews",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PullRequest",
            "kind": "LinkedField",
            "name": "pullRequest",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": (v5/*: any*/),
                "concreteType": "ReviewRequestConnection",
                "kind": "LinkedField",
                "name": "reviewRequests",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ReviewRequest",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "requestedReviewer",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v4/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviewRequests(first:40)"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "92c9b78f83367f387f6935d31e89b77a",
    "id": null,
    "metadata": {},
    "name": "RequestReviewersModalMutation",
    "operationKind": "mutation",
    "text": "mutation RequestReviewersModalMutation(\n  $pullRequestId: ID!\n  $userIds: [ID!]!\n  $union: Boolean!\n) {\n  requestReviews(input: {pullRequestId: $pullRequestId, userIds: $userIds, union: $union}) {\n    pullRequest {\n      id\n      reviewRequests(first: 40) {\n        nodes {\n          id\n          asCodeOwner\n          requestedReviewer {\n            __typename\n            ... on User {\n              id\n              login\n              userName: name\n              avatarUrl(size: 40)\n            }\n            ... on Team {\n              id\n              teamName: name\n              combinedSlug\n            }\n            ... on Bot {\n              id\n              login\n              avatarUrl(size: 40)\n            }\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5b47f8f3a30a1f605682362c6d3d5a6c";

export default node;
