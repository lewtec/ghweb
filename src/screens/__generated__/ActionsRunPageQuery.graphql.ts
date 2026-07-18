/**
 * @generated SignedSource<<a2e44dc12f7bb0901a3cb75a98f4e63d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CheckAnnotationLevel = "FAILURE" | "NOTICE" | "WARNING" | "%future added value";
export type CheckConclusionState = "ACTION_REQUIRED" | "CANCELLED" | "FAILURE" | "NEUTRAL" | "SKIPPED" | "STALE" | "STARTUP_FAILURE" | "SUCCESS" | "TIMED_OUT" | "%future added value";
export type CheckStatusState = "COMPLETED" | "IN_PROGRESS" | "PENDING" | "QUEUED" | "REQUESTED" | "WAITING" | "%future added value";
export type DeploymentReviewState = "APPROVED" | "REJECTED" | "%future added value";
export type WorkflowState = "ACTIVE" | "DELETED" | "DISABLED_FORK" | "DISABLED_INACTIVITY" | "DISABLED_MANUALLY" | "%future added value";
export type ActionsRunPageQuery$variables = {
  id: string;
  name: string;
  owner: string;
};
export type ActionsRunPageQuery$data = {
  readonly node: {
    readonly __typename: "WorkflowRun";
    readonly checkSuite: {
      readonly branch: {
        readonly name: string;
      } | null | undefined;
      readonly checkRuns: {
        readonly nodes: ReadonlyArray<{
          readonly annotations: {
            readonly nodes: ReadonlyArray<{
              readonly annotationLevel: CheckAnnotationLevel | null | undefined;
              readonly location: {
                readonly start: {
                  readonly line: number;
                };
              };
              readonly message: string;
              readonly path: string;
              readonly title: string | null | undefined;
            } | null | undefined> | null | undefined;
          } | null | undefined;
          readonly completedAt: any | null | undefined;
          readonly conclusion: CheckConclusionState | null | undefined;
          readonly databaseId: number | null | undefined;
          readonly detailsUrl: any | null | undefined;
          readonly id: string;
          readonly name: string;
          readonly startedAt: any | null | undefined;
          readonly status: CheckStatusState;
          readonly steps: {
            readonly nodes: ReadonlyArray<{
              readonly completedAt: any | null | undefined;
              readonly conclusion: CheckConclusionState | null | undefined;
              readonly name: string;
              readonly number: number;
              readonly startedAt: any | null | undefined;
              readonly status: CheckStatusState;
            } | null | undefined> | null | undefined;
          } | null | undefined;
          readonly summary: string | null | undefined;
          readonly text: string | null | undefined;
          readonly title: string | null | undefined;
        } | null | undefined> | null | undefined;
      } | null | undefined;
      readonly commit: {
        readonly abbreviatedOid: string;
        readonly messageHeadline: string;
        readonly oid: any;
      };
      readonly conclusion: CheckConclusionState | null | undefined;
      readonly id: string;
      readonly status: CheckStatusState;
    };
    readonly createdAt: any;
    readonly databaseId: number | null | undefined;
    readonly deploymentReviews: {
      readonly nodes: ReadonlyArray<{
        readonly comment: string;
        readonly id: string;
        readonly state: DeploymentReviewState;
        readonly user: {
          readonly login: string;
        };
      } | null | undefined> | null | undefined;
    };
    readonly displayTitle: string | null | undefined;
    readonly event: string;
    readonly id: string;
    readonly pendingDeploymentRequests: {
      readonly nodes: ReadonlyArray<{
        readonly currentUserCanApprove: boolean;
        readonly environment: {
          readonly id: string;
          readonly name: string;
        };
        readonly waitTimer: number;
        readonly waitTimerStartedAt: any | null | undefined;
      } | null | undefined> | null | undefined;
    };
    readonly runAttempt: number;
    readonly runNumber: number;
    readonly updatedAt: any;
    readonly url: any;
    readonly workflow: {
      readonly id: string;
      readonly name: string;
      readonly state: WorkflowState;
      readonly url: any;
    };
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly repository: {
    readonly id: string;
  } | null | undefined;
};
export type ActionsRunPageQuery = {
  response: ActionsRunPageQuery$data;
  variables: ActionsRunPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": [
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
  "concreteType": "Repository",
  "kind": "LinkedField",
  "name": "repository",
  "plural": false,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "databaseId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "runNumber",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "runAttempt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "event",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayTitle",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "concreteType": "Workflow",
  "kind": "LinkedField",
  "name": "workflow",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v15/*: any*/),
    (v16/*: any*/),
    (v14/*: any*/)
  ],
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "conclusion",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "abbreviatedOid",
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
  "args": null,
  "kind": "ScalarField",
  "name": "messageHeadline",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startedAt",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completedAt",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 50
    }
  ],
  "concreteType": "CheckRunConnection",
  "kind": "LinkedField",
  "name": "checkRuns",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CheckRun",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        (v7/*: any*/),
        (v15/*: any*/),
        (v18/*: any*/),
        (v19/*: any*/),
        (v23/*: any*/),
        (v24/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "detailsUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "summary",
          "storageKey": null
        },
        (v25/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "text",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 80
            }
          ],
          "concreteType": "CheckStepConnection",
          "kind": "LinkedField",
          "name": "steps",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CheckStep",
              "kind": "LinkedField",
              "name": "nodes",
              "plural": true,
              "selections": [
                (v15/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "number",
                  "storageKey": null
                },
                (v18/*: any*/),
                (v19/*: any*/),
                (v23/*: any*/),
                (v24/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": "steps(first:80)"
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 30
            }
          ],
          "concreteType": "CheckAnnotationConnection",
          "kind": "LinkedField",
          "name": "annotations",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CheckAnnotation",
              "kind": "LinkedField",
              "name": "nodes",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "message",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "path",
                  "storageKey": null
                },
                (v25/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "annotationLevel",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CheckAnnotationSpan",
                  "kind": "LinkedField",
                  "name": "location",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "CheckAnnotationPosition",
                      "kind": "LinkedField",
                      "name": "start",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "line",
                          "storageKey": null
                        }
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
          "storageKey": "annotations(first:30)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "checkRuns(first:50)"
},
v27 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 20
    }
  ],
  "concreteType": "DeploymentRequestConnection",
  "kind": "LinkedField",
  "name": "pendingDeploymentRequests",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "DeploymentRequest",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currentUserCanApprove",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "waitTimer",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "waitTimerStartedAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Environment",
          "kind": "LinkedField",
          "name": "environment",
          "plural": false,
          "selections": [
            (v3/*: any*/),
            (v15/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "pendingDeploymentRequests(first:20)"
},
v28 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "comment",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
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
    "name": "ActionsRunPageQuery",
    "selections": [
      (v4/*: any*/),
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v17/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CheckSuite",
                "kind": "LinkedField",
                "name": "checkSuite",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Ref",
                    "kind": "LinkedField",
                    "name": "branch",
                    "plural": false,
                    "selections": [
                      (v15/*: any*/)
                    ],
                    "storageKey": null
                  },
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
                      (v22/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v26/*: any*/)
                ],
                "storageKey": null
              },
              (v27/*: any*/),
              {
                "alias": null,
                "args": (v28/*: any*/),
                "concreteType": "DeploymentReviewConnection",
                "kind": "LinkedField",
                "name": "deploymentReviews",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeploymentReview",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v16/*: any*/),
                      (v29/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v30/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "deploymentReviews(first:10)"
              }
            ],
            "type": "WorkflowRun",
            "abstractKey": null
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
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ActionsRunPageQuery",
    "selections": [
      (v4/*: any*/),
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v17/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CheckSuite",
                "kind": "LinkedField",
                "name": "checkSuite",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Ref",
                    "kind": "LinkedField",
                    "name": "branch",
                    "plural": false,
                    "selections": [
                      (v15/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
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
                      (v22/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v26/*: any*/)
                ],
                "storageKey": null
              },
              (v27/*: any*/),
              {
                "alias": null,
                "args": (v28/*: any*/),
                "concreteType": "DeploymentReviewConnection",
                "kind": "LinkedField",
                "name": "deploymentReviews",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeploymentReview",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v16/*: any*/),
                      (v29/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v30/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "deploymentReviews(first:10)"
              }
            ],
            "type": "WorkflowRun",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1fa1f111222ac9d323095b2931463c6c",
    "id": null,
    "metadata": {},
    "name": "ActionsRunPageQuery",
    "operationKind": "query",
    "text": "query ActionsRunPageQuery(\n  $id: ID!\n  $owner: String!\n  $name: String!\n) {\n  repository(owner: $owner, name: $name) {\n    id\n  }\n  node(id: $id) {\n    __typename\n    ... on WorkflowRun {\n      id\n      databaseId\n      runNumber\n      runAttempt\n      event\n      displayTitle\n      createdAt\n      updatedAt\n      url\n      workflow {\n        id\n        name\n        state\n        url\n      }\n      checkSuite {\n        id\n        status\n        conclusion\n        branch {\n          name\n          id\n        }\n        commit {\n          abbreviatedOid\n          oid\n          messageHeadline\n          id\n        }\n        checkRuns(first: 50) {\n          nodes {\n            id\n            databaseId\n            name\n            status\n            conclusion\n            startedAt\n            completedAt\n            detailsUrl\n            summary\n            title\n            text\n            steps(first: 80) {\n              nodes {\n                name\n                number\n                status\n                conclusion\n                startedAt\n                completedAt\n              }\n            }\n            annotations(first: 30) {\n              nodes {\n                message\n                path\n                title\n                annotationLevel\n                location {\n                  start {\n                    line\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      pendingDeploymentRequests(first: 20) {\n        nodes {\n          currentUserCanApprove\n          waitTimer\n          waitTimerStartedAt\n          environment {\n            id\n            name\n          }\n        }\n      }\n      deploymentReviews(first: 10) {\n        nodes {\n          id\n          state\n          comment\n          user {\n            login\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d5296c21d65b77129dbcf6b6c6bf4d3b";

export default node;
