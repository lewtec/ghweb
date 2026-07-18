/**
 * @generated SignedSource<<3bc234315d2ca403c3b59291a7636acc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueState = "CLOSED" | "OPEN" | "%future added value";
export type IssueStateReason = "COMPLETED" | "DUPLICATE" | "NOT_PLANNED" | "REOPENED" | "%future added value";
export type IssueDetailPageReopenMutation$variables = {
  id: string;
};
export type IssueDetailPageReopenMutation$data = {
  readonly reopenIssue: {
    readonly issue: {
      readonly closedAt: any | null | undefined;
      readonly id: string;
      readonly state: IssueState;
      readonly stateReason: IssueStateReason | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type IssueDetailPageReopenMutation = {
  response: IssueDetailPageReopenMutation$data;
  variables: IssueDetailPageReopenMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "issueId",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ReopenIssuePayload",
    "kind": "LinkedField",
    "name": "reopenIssue",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Issue",
        "kind": "LinkedField",
        "name": "issue",
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
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stateReason",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "closedAt",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IssueDetailPageReopenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueDetailPageReopenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c03a3d8e9d0907fc3b0cd0d59f12da9c",
    "id": null,
    "metadata": {},
    "name": "IssueDetailPageReopenMutation",
    "operationKind": "mutation",
    "text": "mutation IssueDetailPageReopenMutation(\n  $id: ID!\n) {\n  reopenIssue(input: {issueId: $id}) {\n    issue {\n      id\n      state\n      stateReason\n      closedAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "31c69690230bf5ba6e723d8c9b1cb0ff";

export default node;
