/**
 * @generated SignedSource<<bfbcb8b13f98c6e0184db296f0a3a3d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ActionsRunPageApproveMutation$variables = {
  comment?: string | null | undefined;
  environmentIds: ReadonlyArray<string>;
  workflowRunId: string;
};
export type ActionsRunPageApproveMutation$data = {
  readonly approveDeployments: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type ActionsRunPageApproveMutation = {
  response: ActionsRunPageApproveMutation$data;
  variables: ActionsRunPageApproveMutation$variables;
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
    "concreteType": "ApproveDeploymentsPayload",
    "kind": "LinkedField",
    "name": "approveDeployments",
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
    "name": "ActionsRunPageApproveMutation",
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
    "name": "ActionsRunPageApproveMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "175c73f47d45fbaeb72ac72f36c09f5f",
    "id": null,
    "metadata": {},
    "name": "ActionsRunPageApproveMutation",
    "operationKind": "mutation",
    "text": "mutation ActionsRunPageApproveMutation(\n  $workflowRunId: ID!\n  $environmentIds: [ID!]!\n  $comment: String\n) {\n  approveDeployments(input: {workflowRunId: $workflowRunId, environmentIds: $environmentIds, comment: $comment}) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "1a82725eb3e39d0626c6d35c5a6bc78a";

export default node;
