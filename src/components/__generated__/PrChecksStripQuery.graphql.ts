/**
 * @generated SignedSource<<fa0e5affe27cd1bf683274b6a2e7c996>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CheckConclusionState = "ACTION_REQUIRED" | "CANCELLED" | "FAILURE" | "NEUTRAL" | "SKIPPED" | "STALE" | "STARTUP_FAILURE" | "SUCCESS" | "TIMED_OUT" | "%future added value";
export type CheckStatusState = "COMPLETED" | "IN_PROGRESS" | "PENDING" | "QUEUED" | "REQUESTED" | "WAITING" | "%future added value";
export type StatusState = "ERROR" | "EXPECTED" | "FAILURE" | "PENDING" | "SUCCESS" | "%future added value";
export type PrChecksStripQuery$variables = {
  name: string;
  number: number;
  owner: string;
};
export type PrChecksStripQuery$data = {
  readonly repository: {
    readonly pullRequest: {
      readonly statusCheckRollup: {
        readonly contexts: {
          readonly nodes: ReadonlyArray<{
            readonly __typename: "CheckRun";
            readonly checkSuite: {
              readonly workflowRun: {
                readonly databaseId: number | null | undefined;
                readonly displayTitle: string | null | undefined;
                readonly id: string;
                readonly runNumber: number;
                readonly workflow: {
                  readonly name: string;
                };
              } | null | undefined;
            };
            readonly conclusion: CheckConclusionState | null | undefined;
            readonly id: string;
            readonly name: string;
            readonly status: CheckStatusState;
          } | {
            readonly __typename: "StatusContext";
            readonly context: string;
            readonly description: string | null | undefined;
            readonly id: string;
            readonly state: StatusState;
            readonly targetUrl: any | null | undefined;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          } | null | undefined> | null | undefined;
        };
        readonly state: StatusState;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type PrChecksStripQuery = {
  response: PrChecksStripQuery$data;
  variables: PrChecksStripQuery$variables;
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
  "name": "state",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 40
  }
],
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
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "conclusion",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "databaseId",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "runNumber",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayTitle",
  "storageKey": null
},
v15 = {
  "kind": "InlineFragment",
  "selections": [
    (v8/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "context",
      "storageKey": null
    },
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "targetUrl",
      "storageKey": null
    }
  ],
  "type": "StatusContext",
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
    "name": "PrChecksStripQuery",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "StatusCheckRollup",
                "kind": "LinkedField",
                "name": "statusCheckRollup",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": (v6/*: any*/),
                    "concreteType": "StatusCheckRollupContextConnection",
                    "kind": "LinkedField",
                    "name": "contexts",
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
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/),
                              (v11/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CheckSuite",
                                "kind": "LinkedField",
                                "name": "checkSuite",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "WorkflowRun",
                                    "kind": "LinkedField",
                                    "name": "workflowRun",
                                    "plural": false,
                                    "selections": [
                                      (v8/*: any*/),
                                      (v12/*: any*/),
                                      (v13/*: any*/),
                                      (v14/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Workflow",
                                        "kind": "LinkedField",
                                        "name": "workflow",
                                        "plural": false,
                                        "selections": [
                                          (v9/*: any*/)
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
                            "type": "CheckRun",
                            "abstractKey": null
                          },
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "contexts(first:40)"
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
    "name": "PrChecksStripQuery",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "StatusCheckRollup",
                "kind": "LinkedField",
                "name": "statusCheckRollup",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": (v6/*: any*/),
                    "concreteType": "StatusCheckRollupContextConnection",
                    "kind": "LinkedField",
                    "name": "contexts",
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
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/),
                              (v11/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CheckSuite",
                                "kind": "LinkedField",
                                "name": "checkSuite",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "WorkflowRun",
                                    "kind": "LinkedField",
                                    "name": "workflowRun",
                                    "plural": false,
                                    "selections": [
                                      (v8/*: any*/),
                                      (v12/*: any*/),
                                      (v13/*: any*/),
                                      (v14/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Workflow",
                                        "kind": "LinkedField",
                                        "name": "workflow",
                                        "plural": false,
                                        "selections": [
                                          (v9/*: any*/),
                                          (v8/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v8/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "CheckRun",
                            "abstractKey": null
                          },
                          (v15/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "contexts(first:40)"
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8b22337c1132613bbc6abb85367727a0",
    "id": null,
    "metadata": {},
    "name": "PrChecksStripQuery",
    "operationKind": "query",
    "text": "query PrChecksStripQuery(\n  $owner: String!\n  $name: String!\n  $number: Int!\n) {\n  repository(owner: $owner, name: $name) {\n    pullRequest(number: $number) {\n      statusCheckRollup {\n        state\n        contexts(first: 40) {\n          nodes {\n            __typename\n            ... on CheckRun {\n              id\n              name\n              status\n              conclusion\n              checkSuite {\n                workflowRun {\n                  id\n                  databaseId\n                  runNumber\n                  displayTitle\n                  workflow {\n                    name\n                    id\n                  }\n                }\n                id\n              }\n            }\n            ... on StatusContext {\n              id\n              context\n              state\n              description\n              targetUrl\n            }\n            ... on Node {\n              __isNode: __typename\n              id\n            }\n          }\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "71a620120dace95b447aca5b9b109449";

export default node;
