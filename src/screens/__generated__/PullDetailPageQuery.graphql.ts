/**
 * @generated SignedSource<<f072791c9643dd1b8ca4cd9d9c9276a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiffSide = "LEFT" | "RIGHT" | "%future added value";
export type MergeableState = "CONFLICTING" | "MERGEABLE" | "UNKNOWN" | "%future added value";
export type PullRequestMergeMethod = "MERGE" | "REBASE" | "SQUASH" | "%future added value";
export type PullRequestReviewCommentState = "PENDING" | "SUBMITTED" | "%future added value";
export type PullRequestReviewState = "APPROVED" | "CHANGES_REQUESTED" | "COMMENTED" | "DISMISSED" | "PENDING" | "%future added value";
export type PullRequestState = "CLOSED" | "MERGED" | "OPEN" | "%future added value";
export type PullDetailPageQuery$variables = {
  name: string;
  number: number;
  owner: string;
};
export type PullDetailPageQuery$data = {
  readonly repository: {
    readonly mergeCommitAllowed: boolean;
    readonly pullRequest: {
      readonly author: {
        readonly avatarUrl: any;
        readonly login: string;
        readonly name?: string | null | undefined;
      } | null | undefined;
      readonly baseRefName: string;
      readonly body: string;
      readonly bodyHTML: any;
      readonly createdAt: any;
      readonly headRefName: string;
      readonly headRefOid: any;
      readonly id: string;
      readonly isDraft: boolean;
      readonly mergeable: MergeableState;
      readonly merged: boolean;
      readonly number: number;
      readonly pendingReviews: {
        readonly nodes: ReadonlyArray<{
          readonly author: {
            readonly login: string;
          } | null | undefined;
          readonly body: string;
          readonly bodyHTML: any;
          readonly id: string;
          readonly state: PullRequestReviewState;
          readonly viewerDidAuthor: boolean;
        } | null | undefined> | null | undefined;
      } | null | undefined;
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
      readonly reviewThreads: {
        readonly nodes: ReadonlyArray<{
          readonly comments: {
            readonly nodes: ReadonlyArray<{
              readonly author: {
                readonly login: string;
              } | null | undefined;
              readonly body: string;
              readonly bodyHTML: any;
              readonly id: string;
              readonly state: PullRequestReviewCommentState;
            } | null | undefined> | null | undefined;
          };
          readonly diffSide: DiffSide;
          readonly id: string;
          readonly isResolved: boolean;
          readonly line: number | null | undefined;
          readonly path: string;
          readonly startLine: number | null | undefined;
        } | null | undefined> | null | undefined;
      };
      readonly state: PullRequestState;
      readonly suggestedReviewers: ReadonlyArray<{
        readonly isAuthor: boolean;
        readonly isCommenter: boolean;
        readonly reviewer: {
          readonly avatarUrl: any;
          readonly id: string;
          readonly login: string;
          readonly name: string | null | undefined;
        };
      } | null | undefined>;
      readonly timelineItems: {
        readonly nodes: ReadonlyArray<{
          readonly __typename: "HeadRefForcePushedEvent";
          readonly actor: {
            readonly avatarUrl: any;
            readonly login: string;
            readonly name?: string | null | undefined;
          } | null | undefined;
          readonly afterCommit: {
            readonly abbreviatedOid: string;
            readonly oid: any;
            readonly url: any;
          } | null | undefined;
          readonly beforeCommit: {
            readonly abbreviatedOid: string;
            readonly oid: any;
          } | null | undefined;
          readonly createdAt: any;
          readonly id: string;
        } | {
          readonly __typename: "IssueComment";
          readonly author: {
            readonly avatarUrl: any;
            readonly login: string;
            readonly name?: string | null | undefined;
          } | null | undefined;
          readonly body: string;
          readonly bodyHTML: any;
          readonly createdAt: any;
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"ReactionBar_reactable">;
        } | {
          readonly __typename: "PullRequestCommit";
          readonly commit: {
            readonly abbreviatedOid: string;
            readonly author: {
              readonly avatarUrl: any;
              readonly name: string | null | undefined;
              readonly user: {
                readonly avatarUrl: any;
                readonly login: string;
                readonly name: string | null | undefined;
              } | null | undefined;
            } | null | undefined;
            readonly committedDate: any;
            readonly messageHeadline: string;
            readonly oid: any;
            readonly url: any;
          };
          readonly id: string;
          readonly url: any;
        } | {
          readonly __typename: "PullRequestReview";
          readonly author: {
            readonly avatarUrl: any;
            readonly login: string;
            readonly name?: string | null | undefined;
          } | null | undefined;
          readonly body: string;
          readonly bodyHTML: any;
          readonly createdAt: any;
          readonly id: string;
          readonly state: PullRequestReviewState;
          readonly viewerDidAuthor: boolean;
          readonly " $fragmentSpreads": FragmentRefs<"ReactionBar_reactable">;
        } | {
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          readonly __typename: "%other";
        } | null | undefined> | null | undefined;
      };
      readonly title: string;
      readonly url: any;
      readonly viewerLatestReview: {
        readonly body: string;
        readonly bodyHTML: any;
        readonly id: string;
        readonly state: PullRequestReviewState;
        readonly viewerDidAuthor: boolean;
      } | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"ReactionBar_reactable">;
    } | null | undefined;
    readonly rebaseMergeAllowed: boolean;
    readonly squashMergeAllowed: boolean;
    readonly viewerDefaultMergeMethod: PullRequestMergeMethod;
  } | null | undefined;
  readonly viewer: {
    readonly login: string;
  };
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = [
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mergeCommitAllowed",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "squashMergeAllowed",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rebaseMergeAllowed",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerDefaultMergeMethod",
  "storageKey": null
},
v10 = [
  {
    "kind": "Variable",
    "name": "number",
    "variableName": "number"
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "body",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bodyHTML",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
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
  "name": "merged",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mergeable",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v22 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ReactionBar_reactable"
},
v23 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "size",
      "value": 64
    }
  ],
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": "avatarUrl(size:64)"
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v25 = {
  "kind": "InlineFragment",
  "selections": [
    (v24/*: any*/)
  ],
  "type": "User",
  "abstractKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "baseRefName",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headRefName",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headRefOid",
  "storageKey": null
},
v29 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 40
  }
],
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "asCodeOwner",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v32 = {
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
v33 = {
  "kind": "InlineFragment",
  "selections": [
    (v11/*: any*/),
    (v3/*: any*/),
    {
      "alias": "userName",
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v32/*: any*/)
  ],
  "type": "User",
  "abstractKey": null
},
v34 = {
  "kind": "InlineFragment",
  "selections": [
    (v11/*: any*/),
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
v35 = {
  "kind": "InlineFragment",
  "selections": [
    (v11/*: any*/),
    (v3/*: any*/),
    (v32/*: any*/)
  ],
  "type": "Bot",
  "abstractKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "concreteType": "SuggestedReviewer",
  "kind": "LinkedField",
  "name": "suggestedReviewers",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAuthor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isCommenter",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "reviewer",
      "plural": false,
      "selections": [
        (v11/*: any*/),
        (v3/*: any*/),
        (v24/*: any*/),
        (v32/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerDidAuthor",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "concreteType": "PullRequestReview",
  "kind": "LinkedField",
  "name": "viewerLatestReview",
  "plural": false,
  "selections": [
    (v11/*: any*/),
    (v16/*: any*/),
    (v14/*: any*/),
    (v15/*: any*/),
    (v37/*: any*/)
  ],
  "storageKey": null
},
v39 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "states",
    "value": [
      "PENDING"
    ]
  }
],
v40 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v41 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  },
  {
    "kind": "Literal",
    "name": "itemTypes",
    "value": [
      "ISSUE_COMMENT",
      "PULL_REQUEST_REVIEW",
      "PULL_REQUEST_COMMIT",
      "HEAD_REF_FORCE_PUSHED_EVENT"
    ]
  }
],
v42 = [
  (v3/*: any*/),
  (v32/*: any*/),
  (v25/*: any*/)
],
v43 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": (v42/*: any*/),
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "oid",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "abbreviatedOid",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "messageHeadline",
  "storageKey": null
},
v47 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "committedDate",
  "storageKey": null
},
v48 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 80
  }
],
v49 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "path",
  "storageKey": null
},
v50 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "line",
  "storageKey": null
},
v51 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startLine",
  "storageKey": null
},
v52 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "diffSide",
  "storageKey": null
},
v53 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isResolved",
  "storageKey": null
},
v54 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v55 = {
  "kind": "InlineFragment",
  "selections": [
    (v11/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v56 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": [
    (v31/*: any*/),
    (v3/*: any*/),
    (v55/*: any*/)
  ],
  "storageKey": null
},
v57 = [
  (v31/*: any*/),
  (v3/*: any*/),
  (v32/*: any*/),
  (v25/*: any*/),
  (v55/*: any*/)
],
v58 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": (v57/*: any*/),
  "storageKey": null
},
v59 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerCanReact",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ReactionGroup",
      "kind": "LinkedField",
      "name": "reactionGroups",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "content",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "viewerHasReacted",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 1
            }
          ],
          "concreteType": "ReactorConnection",
          "kind": "LinkedField",
          "name": "reactors",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            }
          ],
          "storageKey": "reactors(first:1)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Reactable",
  "abstractKey": "__isReactable"
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
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": (v10/*: any*/),
            "concreteType": "PullRequest",
            "kind": "LinkedField",
            "name": "pullRequest",
            "plural": false,
            "selections": [
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "author",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v23/*: any*/),
                  (v25/*: any*/)
                ],
                "storageKey": null
              },
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              {
                "alias": null,
                "args": (v29/*: any*/),
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
                      (v11/*: any*/),
                      (v30/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "requestedReviewer",
                        "plural": false,
                        "selections": [
                          (v31/*: any*/),
                          (v33/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviewRequests(first:40)"
              },
              (v36/*: any*/),
              (v38/*: any*/),
              {
                "alias": "pendingReviews",
                "args": (v39/*: any*/),
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
                      (v11/*: any*/),
                      (v16/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v37/*: any*/),
                      (v40/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviews(first:10,states:[\"PENDING\"])"
              },
              {
                "alias": null,
                "args": (v41/*: any*/),
                "concreteType": "PullRequestTimelineItemsConnection",
                "kind": "LinkedField",
                "name": "timelineItems",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v31/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v11/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          (v21/*: any*/),
                          (v43/*: any*/),
                          (v22/*: any*/)
                        ],
                        "type": "IssueComment",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v11/*: any*/),
                          (v16/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          (v21/*: any*/),
                          (v37/*: any*/),
                          (v43/*: any*/),
                          (v22/*: any*/)
                        ],
                        "type": "PullRequestReview",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v11/*: any*/),
                          (v20/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Commit",
                            "kind": "LinkedField",
                            "name": "commit",
                            "plural": false,
                            "selections": [
                              (v44/*: any*/),
                              (v45/*: any*/),
                              (v46/*: any*/),
                              (v47/*: any*/),
                              (v20/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "GitActor",
                                "kind": "LinkedField",
                                "name": "author",
                                "plural": false,
                                "selections": [
                                  (v24/*: any*/),
                                  (v32/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "User",
                                    "kind": "LinkedField",
                                    "name": "user",
                                    "plural": false,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v24/*: any*/),
                                      (v32/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "PullRequestCommit",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v11/*: any*/),
                          (v21/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "actor",
                            "plural": false,
                            "selections": (v42/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Commit",
                            "kind": "LinkedField",
                            "name": "beforeCommit",
                            "plural": false,
                            "selections": [
                              (v45/*: any*/),
                              (v44/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Commit",
                            "kind": "LinkedField",
                            "name": "afterCommit",
                            "plural": false,
                            "selections": [
                              (v45/*: any*/),
                              (v44/*: any*/),
                              (v20/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "HeadRefForcePushedEvent",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "timelineItems(first:100,itemTypes:[\"ISSUE_COMMENT\",\"PULL_REQUEST_REVIEW\",\"PULL_REQUEST_COMMIT\",\"HEAD_REF_FORCE_PUSHED_EVENT\"])"
              },
              {
                "alias": null,
                "args": (v48/*: any*/),
                "concreteType": "PullRequestReviewThreadConnection",
                "kind": "LinkedField",
                "name": "reviewThreads",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PullRequestReviewThread",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v11/*: any*/),
                      (v49/*: any*/),
                      (v50/*: any*/),
                      (v51/*: any*/),
                      (v52/*: any*/),
                      (v53/*: any*/),
                      {
                        "alias": null,
                        "args": (v54/*: any*/),
                        "concreteType": "PullRequestReviewCommentConnection",
                        "kind": "LinkedField",
                        "name": "comments",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PullRequestReviewComment",
                            "kind": "LinkedField",
                            "name": "nodes",
                            "plural": true,
                            "selections": [
                              (v11/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v40/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "comments(first:20)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviewThreads(first:80)"
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
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": (v10/*: any*/),
            "concreteType": "PullRequest",
            "kind": "LinkedField",
            "name": "pullRequest",
            "plural": false,
            "selections": [
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "author",
                "plural": false,
                "selections": [
                  (v31/*: any*/),
                  (v3/*: any*/),
                  (v23/*: any*/),
                  (v25/*: any*/),
                  (v55/*: any*/)
                ],
                "storageKey": null
              },
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              {
                "alias": null,
                "args": (v29/*: any*/),
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
                      (v11/*: any*/),
                      (v30/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "requestedReviewer",
                        "plural": false,
                        "selections": [
                          (v31/*: any*/),
                          (v33/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/),
                          (v55/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviewRequests(first:40)"
              },
              (v36/*: any*/),
              (v38/*: any*/),
              {
                "alias": "pendingReviews",
                "args": (v39/*: any*/),
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
                      (v11/*: any*/),
                      (v16/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v37/*: any*/),
                      (v56/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviews(first:10,states:[\"PENDING\"])"
              },
              {
                "alias": null,
                "args": (v41/*: any*/),
                "concreteType": "PullRequestTimelineItemsConnection",
                "kind": "LinkedField",
                "name": "timelineItems",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v31/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v11/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          (v21/*: any*/),
                          (v58/*: any*/),
                          (v59/*: any*/)
                        ],
                        "type": "IssueComment",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v11/*: any*/),
                          (v16/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          (v21/*: any*/),
                          (v37/*: any*/),
                          (v58/*: any*/),
                          (v59/*: any*/)
                        ],
                        "type": "PullRequestReview",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v11/*: any*/),
                          (v20/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Commit",
                            "kind": "LinkedField",
                            "name": "commit",
                            "plural": false,
                            "selections": [
                              (v44/*: any*/),
                              (v45/*: any*/),
                              (v46/*: any*/),
                              (v47/*: any*/),
                              (v20/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "GitActor",
                                "kind": "LinkedField",
                                "name": "author",
                                "plural": false,
                                "selections": [
                                  (v24/*: any*/),
                                  (v32/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "User",
                                    "kind": "LinkedField",
                                    "name": "user",
                                    "plural": false,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v24/*: any*/),
                                      (v32/*: any*/),
                                      (v11/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v11/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "PullRequestCommit",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v11/*: any*/),
                          (v21/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "actor",
                            "plural": false,
                            "selections": (v57/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Commit",
                            "kind": "LinkedField",
                            "name": "beforeCommit",
                            "plural": false,
                            "selections": [
                              (v45/*: any*/),
                              (v44/*: any*/),
                              (v11/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Commit",
                            "kind": "LinkedField",
                            "name": "afterCommit",
                            "plural": false,
                            "selections": [
                              (v45/*: any*/),
                              (v44/*: any*/),
                              (v20/*: any*/),
                              (v11/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "HeadRefForcePushedEvent",
                        "abstractKey": null
                      },
                      (v55/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "timelineItems(first:100,itemTypes:[\"ISSUE_COMMENT\",\"PULL_REQUEST_REVIEW\",\"PULL_REQUEST_COMMIT\",\"HEAD_REF_FORCE_PUSHED_EVENT\"])"
              },
              {
                "alias": null,
                "args": (v48/*: any*/),
                "concreteType": "PullRequestReviewThreadConnection",
                "kind": "LinkedField",
                "name": "reviewThreads",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PullRequestReviewThread",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v11/*: any*/),
                      (v49/*: any*/),
                      (v50/*: any*/),
                      (v51/*: any*/),
                      (v52/*: any*/),
                      (v53/*: any*/),
                      {
                        "alias": null,
                        "args": (v54/*: any*/),
                        "concreteType": "PullRequestReviewCommentConnection",
                        "kind": "LinkedField",
                        "name": "comments",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PullRequestReviewComment",
                            "kind": "LinkedField",
                            "name": "nodes",
                            "plural": true,
                            "selections": [
                              (v11/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v56/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "comments(first:20)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "reviewThreads(first:80)"
              },
              (v59/*: any*/)
            ],
            "storageKey": null
          },
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1bb2df3e66f4e1b05837f930e9f2e916",
    "id": null,
    "metadata": {},
    "name": "PullDetailPageQuery",
    "operationKind": "query",
    "text": "query PullDetailPageQuery(\n  $owner: String!\n  $name: String!\n  $number: Int!\n) {\n  viewer {\n    login\n    id\n  }\n  repository(owner: $owner, name: $name) {\n    mergeCommitAllowed\n    squashMergeAllowed\n    rebaseMergeAllowed\n    viewerDefaultMergeMethod\n    pullRequest(number: $number) {\n      id\n      number\n      title\n      body\n      bodyHTML\n      state\n      isDraft\n      merged\n      mergeable\n      url\n      createdAt\n      ...ReactionBar_reactable\n      author {\n        __typename\n        login\n        avatarUrl(size: 64)\n        ... on User {\n          name\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      baseRefName\n      headRefName\n      headRefOid\n      reviewRequests(first: 40) {\n        nodes {\n          id\n          asCodeOwner\n          requestedReviewer {\n            __typename\n            ... on User {\n              id\n              login\n              userName: name\n              avatarUrl(size: 40)\n            }\n            ... on Team {\n              id\n              teamName: name\n              combinedSlug\n            }\n            ... on Bot {\n              id\n              login\n              avatarUrl(size: 40)\n            }\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n        }\n      }\n      suggestedReviewers {\n        isAuthor\n        isCommenter\n        reviewer {\n          id\n          login\n          name\n          avatarUrl(size: 40)\n        }\n      }\n      viewerLatestReview {\n        id\n        state\n        body\n        bodyHTML\n        viewerDidAuthor\n      }\n      pendingReviews: reviews(first: 10, states: [PENDING]) {\n        nodes {\n          id\n          state\n          body\n          bodyHTML\n          viewerDidAuthor\n          author {\n            __typename\n            login\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n        }\n      }\n      timelineItems(first: 100, itemTypes: [ISSUE_COMMENT, PULL_REQUEST_REVIEW, PULL_REQUEST_COMMIT, HEAD_REF_FORCE_PUSHED_EVENT]) {\n        nodes {\n          __typename\n          ... on IssueComment {\n            id\n            body\n            bodyHTML\n            createdAt\n            author {\n              __typename\n              login\n              avatarUrl(size: 40)\n              ... on User {\n                name\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n            ...ReactionBar_reactable\n          }\n          ... on PullRequestReview {\n            id\n            state\n            body\n            bodyHTML\n            createdAt\n            viewerDidAuthor\n            author {\n              __typename\n              login\n              avatarUrl(size: 40)\n              ... on User {\n                name\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n            ...ReactionBar_reactable\n          }\n          ... on PullRequestCommit {\n            id\n            url\n            commit {\n              oid\n              abbreviatedOid\n              messageHeadline\n              committedDate\n              url\n              author {\n                name\n                avatarUrl(size: 40)\n                user {\n                  login\n                  name\n                  avatarUrl(size: 40)\n                  id\n                }\n              }\n              id\n            }\n          }\n          ... on HeadRefForcePushedEvent {\n            id\n            createdAt\n            actor {\n              __typename\n              login\n              avatarUrl(size: 40)\n              ... on User {\n                name\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n            beforeCommit {\n              abbreviatedOid\n              oid\n              id\n            }\n            afterCommit {\n              abbreviatedOid\n              oid\n              url\n              id\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n      reviewThreads(first: 80) {\n        nodes {\n          id\n          path\n          line\n          startLine\n          diffSide\n          isResolved\n          comments(first: 20) {\n            nodes {\n              id\n              body\n              bodyHTML\n              state\n              author {\n                __typename\n                login\n                ... on Node {\n                  __isNode: __typename\n                  id\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ReactionBar_reactable on Reactable {\n  __isReactable: __typename\n  id\n  viewerCanReact\n  reactionGroups {\n    content\n    viewerHasReacted\n    reactors(first: 1) {\n      totalCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "29cb7f2e117604a0a6090549f774686e";

export default node;
