/**
 * @generated SignedSource<<c11fd9f4b9d182ce3329c48b15e1b9fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PullRequestState = "CLOSED" | "MERGED" | "OPEN" | "%future added value";
export type PullDetailPageReadyForReviewMutation$variables = {
  id: string;
};
export type PullDetailPageReadyForReviewMutation$data = {
  readonly markPullRequestReadyForReview: {
    readonly pullRequest: {
      readonly id: string;
      readonly isDraft: boolean;
      readonly state: PullRequestState;
    } | null | undefined;
  } | null | undefined;
};
export type PullDetailPageReadyForReviewMutation = {
  response: PullDetailPageReadyForReviewMutation$data;
  variables: PullDetailPageReadyForReviewMutation$variables;
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
    "concreteType": "MarkPullRequestReadyForReviewPayload",
    "kind": "LinkedField",
    "name": "markPullRequestReadyForReview",
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
    "name": "PullDetailPageReadyForReviewMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PullDetailPageReadyForReviewMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4474a8e62ae83979c3bbd2d18e33add3",
    "id": null,
    "metadata": {},
    "name": "PullDetailPageReadyForReviewMutation",
    "operationKind": "mutation",
    "text": "mutation PullDetailPageReadyForReviewMutation(\n  $id: ID!\n) {\n  markPullRequestReadyForReview(input: {pullRequestId: $id}) {\n    pullRequest {\n      id\n      isDraft\n      state\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d1e9200739b889f1bb9dc48345b13684";

export default node;
