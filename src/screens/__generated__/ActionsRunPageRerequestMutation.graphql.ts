/**
 * @generated SignedSource<<fa1dac77975dcc0337ce1dd726b253c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CheckConclusionState = "ACTION_REQUIRED" | "CANCELLED" | "FAILURE" | "NEUTRAL" | "SKIPPED" | "STALE" | "STARTUP_FAILURE" | "SUCCESS" | "TIMED_OUT" | "%future added value";
export type CheckStatusState = "COMPLETED" | "IN_PROGRESS" | "PENDING" | "QUEUED" | "REQUESTED" | "WAITING" | "%future added value";
export type ActionsRunPageRerequestMutation$variables = {
  checkSuiteId: string;
  repositoryId: string;
};
export type ActionsRunPageRerequestMutation$data = {
  readonly rerequestCheckSuite: {
    readonly checkSuite: {
      readonly conclusion: CheckConclusionState | null | undefined;
      readonly id: string;
      readonly status: CheckStatusState;
    } | null | undefined;
  } | null | undefined;
};
export type ActionsRunPageRerequestMutation = {
  response: ActionsRunPageRerequestMutation$data;
  variables: ActionsRunPageRerequestMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "checkSuiteId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "repositoryId"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "checkSuiteId",
            "variableName": "checkSuiteId"
          },
          {
            "kind": "Variable",
            "name": "repositoryId",
            "variableName": "repositoryId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "RerequestCheckSuitePayload",
    "kind": "LinkedField",
    "name": "rerequestCheckSuite",
    "plural": false,
    "selections": [
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
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "conclusion",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActionsRunPageRerequestMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ActionsRunPageRerequestMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "2dca376fa6501e77cf016222cf6e6fdf",
    "id": null,
    "metadata": {},
    "name": "ActionsRunPageRerequestMutation",
    "operationKind": "mutation",
    "text": "mutation ActionsRunPageRerequestMutation(\n  $repositoryId: ID!\n  $checkSuiteId: ID!\n) {\n  rerequestCheckSuite(input: {repositoryId: $repositoryId, checkSuiteId: $checkSuiteId}) {\n    checkSuite {\n      id\n      status\n      conclusion\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e4717593b76f11b12d2ef32f7e205a1e";

export default node;
