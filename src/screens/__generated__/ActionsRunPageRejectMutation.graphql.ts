/**
 * @generated SignedSource<<2f621428f06554ef2033c70fafdaec68>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ActionsRunPageRejectMutation$variables = {
  comment?: string | null | undefined;
  environmentIds: ReadonlyArray<string>;
  workflowRunId: string;
};
export type ActionsRunPageRejectMutation$data = {
  readonly rejectDeployments: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type ActionsRunPageRejectMutation = {
  response: ActionsRunPageRejectMutation$data;
  variables: ActionsRunPageRejectMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "comment"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "environmentIds"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "workflowRunId"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "comment",
            "variableName": "comment"
          },
          {
            "kind": "Variable",
            "name": "environmentIds",
            "variableName": "environmentIds"
          },
          {
            "kind": "Variable",
            "name": "workflowRunId",
            "variableName": "workflowRunId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "RejectDeploymentsPayload",
    "kind": "LinkedField",
    "name": "rejectDeployments",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActionsRunPageRejectMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ActionsRunPageRejectMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "7f1ec0c8c812daf1a8c1c7f7b3c5d97c",
    "id": null,
    "metadata": {},
    "name": "ActionsRunPageRejectMutation",
    "operationKind": "mutation",
    "text": "mutation ActionsRunPageRejectMutation(\n  $workflowRunId: ID!\n  $environmentIds: [ID!]!\n  $comment: String\n) {\n  rejectDeployments(input: {workflowRunId: $workflowRunId, environmentIds: $environmentIds, comment: $comment}) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "49d64179d0bd5b99436558abe74065a8";

export default node;
