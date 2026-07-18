/**
 * @generated SignedSource<<95b9ba57d27c468979ccaa37f6e42673>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type IssueState = "CLOSED" | "OPEN" | "%future added value";
export type IssueStateReason = "COMPLETED" | "DUPLICATE" | "NOT_PLANNED" | "REOPENED" | "%future added value";
export type IssueDetailPageCloseMutation$variables = {
  id: string;
};
export type IssueDetailPageCloseMutation$data = {
  readonly closeIssue: {
    readonly issue: {
      readonly closedAt: any | null | undefined;
      readonly id: string;
      readonly state: IssueState;
      readonly stateReason: IssueStateReason | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type IssueDetailPageCloseMutation = {
  response: IssueDetailPageCloseMutation$data;
  variables: IssueDetailPageCloseMutation$variables;
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
    "concreteType": "CloseIssuePayload",
    "kind": "LinkedField",
    "name": "closeIssue",
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
    "name": "IssueDetailPageCloseMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IssueDetailPageCloseMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "680381d5077fc4394267f2cedab824a6",
    "id": null,
    "metadata": {},
    "name": "IssueDetailPageCloseMutation",
    "operationKind": "mutation",
    "text": "mutation IssueDetailPageCloseMutation(\n  $id: ID!\n) {\n  closeIssue(input: {issueId: $id}) {\n    issue {\n      id\n      state\n      stateReason\n      closedAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "876b9747d83329a9acf119a2baa3d0d6";

export default node;
