/**
 * @generated SignedSource<<28d5a7d33a405d27ebf8e05ec236bea5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MergeableState = "CONFLICTING" | "MERGEABLE" | "UNKNOWN" | "%future added value";
export type PullRequestMergeMethod = "MERGE" | "REBASE" | "SQUASH" | "%future added value";
export type PullRequestState = "CLOSED" | "MERGED" | "OPEN" | "%future added value";
export type PullDetailPageMergeMutation$variables = {
  id: string;
  mergeMethod: PullRequestMergeMethod;
};
export type PullDetailPageMergeMutation$data = {
  readonly mergePullRequest: {
    readonly pullRequest: {
      readonly id: string;
      readonly mergeable: MergeableState;
      readonly merged: boolean;
      readonly state: PullRequestState;
    } | null | undefined;
  } | null | undefined;
};
export type PullDetailPageMergeMutation = {
  response: PullDetailPageMergeMutation$data;
  variables: PullDetailPageMergeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mergeMethod"
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
            "name": "mergeMethod",
            "variableName": "mergeMethod"
          },
          {
            "kind": "Variable",
            "name": "pullRequestId",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "MergePullRequestPayload",
    "kind": "LinkedField",
    "name": "mergePullRequest",
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
            "name": "merged",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mergeable",
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
    "name": "PullDetailPageMergeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PullDetailPageMergeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "09dc433cc1ff049eb65d7de5e132464e",
    "id": null,
    "metadata": {},
    "name": "PullDetailPageMergeMutation",
    "operationKind": "mutation",
    "text": "mutation PullDetailPageMergeMutation(\n  $id: ID!\n  $mergeMethod: PullRequestMergeMethod!\n) {\n  mergePullRequest(input: {pullRequestId: $id, mergeMethod: $mergeMethod}) {\n    pullRequest {\n      id\n      state\n      merged\n      mergeable\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1eb4d04cd6d4e4a64b8288fa0d4cbd94";

export default node;
