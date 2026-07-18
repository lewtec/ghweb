/**
 * @generated SignedSource<<a3c408fd44c6de4faacc07d6afba9b4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PullRequestState = "CLOSED" | "MERGED" | "OPEN" | "%future added value";
export type PullDetailPageConvertToDraftMutation$variables = {
  id: string;
};
export type PullDetailPageConvertToDraftMutation$data = {
  readonly convertPullRequestToDraft: {
    readonly pullRequest: {
      readonly id: string;
      readonly isDraft: boolean;
      readonly state: PullRequestState;
    } | null | undefined;
  } | null | undefined;
};
export type PullDetailPageConvertToDraftMutation = {
  response: PullDetailPageConvertToDraftMutation$data;
  variables: PullDetailPageConvertToDraftMutation$variables;
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
    "concreteType": "ConvertPullRequestToDraftPayload",
    "kind": "LinkedField",
    "name": "convertPullRequestToDraft",
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
            "name": "isDraft",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
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
    "name": "PullDetailPageConvertToDraftMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PullDetailPageConvertToDraftMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "24e979b4f516e68906ec338a37dd817f",
    "id": null,
    "metadata": {},
    "name": "PullDetailPageConvertToDraftMutation",
    "operationKind": "mutation",
    "text": "mutation PullDetailPageConvertToDraftMutation(\n  $id: ID!\n) {\n  convertPullRequestToDraft(input: {pullRequestId: $id}) {\n    pullRequest {\n      id\n      isDraft\n      state\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "272565304c6aef1aea733ac07b494347";

export default node;
