/**
 * @generated SignedSource<<a349b830f8f8eb620cca615b28c11fe4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MergeableState = "CONFLICTING" | "MERGEABLE" | "UNKNOWN" | "%future added value";
export type PullRequestState = "CLOSED" | "MERGED" | "OPEN" | "%future added value";
export type PullDetailPageMergeMutation$variables = {
  id: string;
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
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Literal",
            "name": "mergeMethod",
            "value": "SQUASH"
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
    "cacheID": "c0b936a4e9e57dd90672f6376e69a9cf",
    "id": null,
    "metadata": {},
    "name": "PullDetailPageMergeMutation",
    "operationKind": "mutation",
    "text": "mutation PullDetailPageMergeMutation(\n  $id: ID!\n) {\n  mergePullRequest(input: {pullRequestId: $id, mergeMethod: SQUASH}) {\n    pullRequest {\n      id\n      state\n      merged\n      mergeable\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "498c83499539355cb8a26be4667f7321";

export default node;
