/**
 * @generated SignedSource<<2fceac25ce90838d6237798f71774b70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PullRequestState = "CLOSED" | "MERGED" | "OPEN" | "%future added value";
export type PullDetailPageCloseMutation$variables = {
  id: string;
};
export type PullDetailPageCloseMutation$data = {
  readonly closePullRequest: {
    readonly pullRequest: {
      readonly id: string;
      readonly merged: boolean;
      readonly state: PullRequestState;
    } | null | undefined;
  } | null | undefined;
};
export type PullDetailPageCloseMutation = {
  response: PullDetailPageCloseMutation$data;
  variables: PullDetailPageCloseMutation$variables;
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
            "name": "pullRequestId",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ClosePullRequestPayload",
    "kind": "LinkedField",
    "name": "closePullRequest",
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
    "name": "PullDetailPageCloseMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PullDetailPageCloseMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "71b6498280cc7dc4b214711b49823e4b",
    "id": null,
    "metadata": {},
    "name": "PullDetailPageCloseMutation",
    "operationKind": "mutation",
    "text": "mutation PullDetailPageCloseMutation(\n  $id: ID!\n) {\n  closePullRequest(input: {pullRequestId: $id}) {\n    pullRequest {\n      id\n      state\n      merged\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e49b7d61f14c334f146082964580e549";

export default node;
