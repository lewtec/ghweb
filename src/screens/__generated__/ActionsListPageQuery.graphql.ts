/**
 * @generated SignedSource<<812418196f5d06cfac8b993c12798d21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CheckConclusionState = "ACTION_REQUIRED" | "CANCELLED" | "FAILURE" | "NEUTRAL" | "SKIPPED" | "STALE" | "STARTUP_FAILURE" | "SUCCESS" | "TIMED_OUT" | "%future added value";
export type CheckStatusState = "COMPLETED" | "IN_PROGRESS" | "PENDING" | "QUEUED" | "REQUESTED" | "WAITING" | "%future added value";
export type DeploymentState = "ABANDONED" | "ACTIVE" | "DESTROYED" | "ERROR" | "FAILURE" | "INACTIVE" | "IN_PROGRESS" | "PENDING" | "QUEUED" | "SUCCESS" | "WAITING" | "%future added value";
export type DeploymentStatusState = "ERROR" | "FAILURE" | "INACTIVE" | "IN_PROGRESS" | "PENDING" | "QUEUED" | "SUCCESS" | "WAITING" | "%future added value";
export type WorkflowState = "ACTIVE" | "DELETED" | "DISABLED_FORK" | "DISABLED_INACTIVITY" | "DISABLED_MANUALLY" | "%future added value";
export type ActionsListPageQuery$variables = {
  name: string;
  owner: string;
};
export type ActionsListPageQuery$data = {
  readonly repository: {
    readonly defaultBranchRef: {
      readonly name: string;
      readonly target: {
        readonly __typename: "Commit";
        readonly history: {
          readonly nodes: ReadonlyArray<{
            readonly abbreviatedOid: string;
            readonly checkSuites: {
              readonly nodes: ReadonlyArray<{
                readonly branch: {
                  readonly name: string;
                } | null | undefined;
                readonly checkRuns: {
                  readonly nodes: ReadonlyArray<{
                    readonly conclusion: CheckConclusionState | null | undefined;
                    readonly id: string;
                    readonly name: string;
                    readonly status: CheckStatusState;
                  } | null | undefined> | null | undefined;
                } | null | undefined;
                readonly conclusion: CheckConclusionState | null | undefined;
                readonly id: string;
                readonly status: CheckStatusState;
                readonly updatedAt: any;
                readonly workflowRun: {
                  readonly createdAt: any;
                  readonly databaseId: number | null | undefined;
                  readonly displayTitle: string | null | undefined;
                  readonly event: string;
                  readonly id: string;
                  readonly runAttempt: number;
                  readonly runNumber: number;
                  readonly updatedAt: any;
                  readonly url: any;
                  readonly workflow: {
                    readonly id: string;
                    readonly name: string;
                    readonly state: WorkflowState;
                  };
                } | null | undefined;
              } | null | undefined> | null | undefined;
            } | null | undefined;
            readonly committedDate: any;
            readonly messageHeadline: string;
            readonly oid: any;
          } | null | undefined> | null | undefined;
        };
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      } | null | undefined;
    } | null | undefined;
    readonly deployments: {
      readonly nodes: ReadonlyArray<{
        readonly createdAt: any;
        readonly description: string | null | undefined;
        readonly environment: string | null | undefined;
        readonly id: string;
        readonly latestStatus: {
          readonly createdAt: any;
          readonly description: string | null | undefined;
          readonly state: DeploymentStatusState;
        } | null | undefined;
        readonly state: DeploymentState | null | undefined;
      } | null | undefined> | null | undefined;
    };
    readonly environments: {
      readonly nodes: ReadonlyArray<{
        readonly id: string;
        readonly latestCompletedDeployment: {
          readonly createdAt: any;
          readonly state: DeploymentState | null | undefined;
        } | null | undefined;
        readonly name: string;
      } | null | undefined> | null | undefined;
    };
    readonly id: string;
    readonly nameWithOwner: string;
    readonly pullRequests: {
      readonly nodes: ReadonlyArray<{
        readonly commits: {
          readonly nodes: ReadonlyArray<{
            readonly commit: {
              readonly abbreviatedOid: string;
              readonly checkSuites: {
                readonly nodes: ReadonlyArray<{
                  readonly checkRuns: {
                    readonly nodes: ReadonlyArray<{
                      readonly conclusion: CheckConclusionState | null | undefined;
                      readonly id: string;
                      readonly status: CheckStatusState;
                    } | null | undefined> | null | undefined;
                  } | null | undefined;
                  readonly conclusion: CheckConclusionState | null | undefined;
                  readonly id: string;
                  readonly status: CheckStatusState;
                  readonly updatedAt: any;
                  readonly workflowRun: {
                    readonly createdAt: any;
                    readonly databaseId: number | null | undefined;
                    readonly displayTitle: string | null | undefined;
                    readonly event: string;
                    readonly id: string;
                    readonly runAttempt: number;
                    readonly runNumber: number;
                    readonly updatedAt: any;
                    readonly url: any;
                    readonly workflow: {
                      readonly id: string;
                      readonly name: string;
                      readonly state: WorkflowState;
                    };
                  } | null | undefined;
                } | null | undefined> | null | undefined;
              } | null | undefined;
              readonly oid: any;
            };
          } | null | undefined> | null | undefined;
        };
        readonly number: number;
        readonly title: string;
      } | null | undefined> | null | undefined;
    };
    readonly url: any;
  } | null | undefined;
};
export type ActionsListPageQuery = {
  response: ActionsListPageQuery$data;
  variables: ActionsListPageQuery$variables;
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
v2 = [
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameWithOwner",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "oid",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "abbreviatedOid",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "messageHeadline",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "committedDate",
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 25
  }
],
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "conclusion",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "WorkflowRun",
  "kind": "LinkedField",
  "name": "workflowRun",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "databaseId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "runNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "runAttempt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "event",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayTitle",
      "storageKey": null
    },
    (v18/*: any*/),
    (v17/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Workflow",
      "kind": "LinkedField",
      "name": "workflow",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        (v6/*: any*/),
        (v19/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v21 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v22 = {
  "alias": null,
  "args": (v21/*: any*/),
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
        (v6/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": "checkRuns(first:20)"
},
v23 = [
  (v8/*: any*/),
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "UPDATED_AT"
    }
  },
  {
    "kind": "Literal",
    "name": "states",
    "value": "OPEN"
  }
],
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v26 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 1
  }
],
v27 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  }
],
v28 = {
  "alias": null,
  "args": (v21/*: any*/),
  "concreteType": "CheckSuiteConnection",
  "kind": "LinkedField",
  "name": "checkSuites",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CheckSuite",
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/),
        (v17/*: any*/),
        (v20/*: any*/),
        {
          "alias": null,
          "args": (v27/*: any*/),
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
                (v15/*: any*/),
                (v16/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": "checkRuns(first:15)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "checkSuites(first:20)"
},
v29 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 8
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "CREATED_AT"
    }
  }
],
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "environment",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActionsListPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Ref",
            "kind": "LinkedField",
            "name": "defaultBranchRef",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "target",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": (v9/*: any*/),
                        "concreteType": "CommitHistoryConnection",
                        "kind": "LinkedField",
                        "name": "history",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Commit",
                            "kind": "LinkedField",
                            "name": "nodes",
                            "plural": true,
                            "selections": [
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v12/*: any*/),
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": (v14/*: any*/),
                                "concreteType": "CheckSuiteConnection",
                                "kind": "LinkedField",
                                "name": "checkSuites",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "CheckSuite",
                                    "kind": "LinkedField",
                                    "name": "nodes",
                                    "plural": true,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v15/*: any*/),
                                      (v16/*: any*/),
                                      (v17/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Ref",
                                        "kind": "LinkedField",
                                        "name": "branch",
                                        "plural": false,
                                        "selections": [
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v20/*: any*/),
                                      (v22/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "checkSuites(first:25)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "history(first:12)"
                      }
                    ],
                    "type": "Commit",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v23/*: any*/),
            "concreteType": "PullRequestConnection",
            "kind": "LinkedField",
            "name": "pullRequests",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PullRequest",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v24/*: any*/),
                  (v25/*: any*/),
                  {
                    "alias": null,
                    "args": (v26/*: any*/),
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
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v28/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "commits(last:1)"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "pullRequests(first:12,orderBy:{\"direction\":\"DESC\",\"field\":\"UPDATED_AT\"},states:\"OPEN\")"
          },
          {
            "alias": null,
            "args": (v27/*: any*/),
            "concreteType": "EnvironmentConnection",
            "kind": "LinkedField",
            "name": "environments",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Environment",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Deployment",
                    "kind": "LinkedField",
                    "name": "latestCompletedDeployment",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      (v18/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "environments(first:15)"
          },
          {
            "alias": null,
            "args": (v29/*: any*/),
            "concreteType": "DeploymentConnection",
            "kind": "LinkedField",
            "name": "deployments",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Deployment",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v30/*: any*/),
                  (v19/*: any*/),
                  (v18/*: any*/),
                  (v31/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeploymentStatus",
                    "kind": "LinkedField",
                    "name": "latestStatus",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      (v31/*: any*/),
                      (v18/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "deployments(first:8,orderBy:{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"})"
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ActionsListPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Ref",
            "kind": "LinkedField",
            "name": "defaultBranchRef",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "target",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": (v9/*: any*/),
                        "concreteType": "CommitHistoryConnection",
                        "kind": "LinkedField",
                        "name": "history",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Commit",
                            "kind": "LinkedField",
                            "name": "nodes",
                            "plural": true,
                            "selections": [
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v12/*: any*/),
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": (v14/*: any*/),
                                "concreteType": "CheckSuiteConnection",
                                "kind": "LinkedField",
                                "name": "checkSuites",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "CheckSuite",
                                    "kind": "LinkedField",
                                    "name": "nodes",
                                    "plural": true,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v15/*: any*/),
                                      (v16/*: any*/),
                                      (v17/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Ref",
                                        "kind": "LinkedField",
                                        "name": "branch",
                                        "plural": false,
                                        "selections": [
                                          (v6/*: any*/),
                                          (v3/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v20/*: any*/),
                                      (v22/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "checkSuites(first:25)"
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "history(first:12)"
                      }
                    ],
                    "type": "Commit",
                    "abstractKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v23/*: any*/),
            "concreteType": "PullRequestConnection",
            "kind": "LinkedField",
            "name": "pullRequests",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PullRequest",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v24/*: any*/),
                  (v25/*: any*/),
                  {
                    "alias": null,
                    "args": (v26/*: any*/),
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
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v28/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "commits(last:1)"
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "pullRequests(first:12,orderBy:{\"direction\":\"DESC\",\"field\":\"UPDATED_AT\"},states:\"OPEN\")"
          },
          {
            "alias": null,
            "args": (v27/*: any*/),
            "concreteType": "EnvironmentConnection",
            "kind": "LinkedField",
            "name": "environments",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Environment",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Deployment",
                    "kind": "LinkedField",
                    "name": "latestCompletedDeployment",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      (v18/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "environments(first:15)"
          },
          {
            "alias": null,
            "args": (v29/*: any*/),
            "concreteType": "DeploymentConnection",
            "kind": "LinkedField",
            "name": "deployments",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Deployment",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v30/*: any*/),
                  (v19/*: any*/),
                  (v18/*: any*/),
                  (v31/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeploymentStatus",
                    "kind": "LinkedField",
                    "name": "latestStatus",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      (v31/*: any*/),
                      (v18/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "deployments(first:8,orderBy:{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"})"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "861f2934c81251694dd0ad5e25b92b18",
    "id": null,
    "metadata": {},
    "name": "ActionsListPageQuery",
    "operationKind": "query",
    "text": "query ActionsListPageQuery(\n  $owner: String!\n  $name: String!\n) {\n  repository(owner: $owner, name: $name) {\n    id\n    nameWithOwner\n    url\n    defaultBranchRef {\n      name\n      target {\n        __typename\n        ... on Commit {\n          history(first: 12) {\n            nodes {\n              oid\n              abbreviatedOid\n              messageHeadline\n              committedDate\n              checkSuites(first: 25) {\n                nodes {\n                  id\n                  status\n                  conclusion\n                  updatedAt\n                  branch {\n                    name\n                    id\n                  }\n                  workflowRun {\n                    id\n                    databaseId\n                    runNumber\n                    runAttempt\n                    event\n                    displayTitle\n                    createdAt\n                    updatedAt\n                    url\n                    workflow {\n                      id\n                      name\n                      state\n                    }\n                  }\n                  checkRuns(first: 20) {\n                    nodes {\n                      id\n                      name\n                      status\n                      conclusion\n                    }\n                  }\n                }\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n      id\n    }\n    pullRequests(first: 12, states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {\n      nodes {\n        number\n        title\n        commits(last: 1) {\n          nodes {\n            commit {\n              oid\n              abbreviatedOid\n              checkSuites(first: 20) {\n                nodes {\n                  id\n                  status\n                  conclusion\n                  updatedAt\n                  workflowRun {\n                    id\n                    databaseId\n                    runNumber\n                    runAttempt\n                    event\n                    displayTitle\n                    createdAt\n                    updatedAt\n                    url\n                    workflow {\n                      id\n                      name\n                      state\n                    }\n                  }\n                  checkRuns(first: 15) {\n                    nodes {\n                      id\n                      status\n                      conclusion\n                    }\n                  }\n                }\n              }\n              id\n            }\n            id\n          }\n        }\n        id\n      }\n    }\n    environments(first: 15) {\n      nodes {\n        id\n        name\n        latestCompletedDeployment {\n          state\n          createdAt\n          id\n        }\n      }\n    }\n    deployments(first: 8, orderBy: {field: CREATED_AT, direction: DESC}) {\n      nodes {\n        id\n        environment\n        state\n        createdAt\n        description\n        latestStatus {\n          state\n          description\n          createdAt\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7f2c87094d8e477a2ca674e1b8c68ad3";

export default node;
