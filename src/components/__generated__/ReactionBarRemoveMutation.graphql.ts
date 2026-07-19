/**
 * @generated SignedSource<<aef2cfdbaadf6f6959bd7e0573b9476e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReactionContent = "CONFUSED" | "EYES" | "HEART" | "HOORAY" | "LAUGH" | "ROCKET" | "THUMBS_DOWN" | "THUMBS_UP" | "%future added value";
export type ReactionBarRemoveMutation$variables = {
  content: ReactionContent;
  subjectId: string;
};
export type ReactionBarRemoveMutation$data = {
  readonly removeReaction: {
    readonly subject: {
      readonly __typename: string;
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ReactionBar_reactable">;
    } | null | undefined;
  } | null | undefined;
};
export type ReactionBarRemoveMutation = {
  response: ReactionBarRemoveMutation$data;
  variables: ReactionBarRemoveMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "content"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "subjectId"
},
v2 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "content",
        "variableName": "content"
      },
      {
        "kind": "Variable",
        "name": "subjectId",
        "variableName": "subjectId"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ReactionBarRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveReactionPayload",
        "kind": "LinkedField",
        "name": "removeReaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "subject",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ReactionBar_reactable"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
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
    "name": "ReactionBarRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveReactionPayload",
        "kind": "LinkedField",
        "name": "removeReaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "subject",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isReactable"
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "viewerCanReact",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ReactionGroup",
                "kind": "LinkedField",
                "name": "reactionGroups",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "content",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "viewerHasReacted",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 1
                      }
                    ],
                    "concreteType": "ReactorConnection",
                    "kind": "LinkedField",
                    "name": "reactors",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "totalCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "reactors(first:1)"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "96982e5c349b863aa2332dd4d4b1fcd9",
    "id": null,
    "metadata": {},
    "name": "ReactionBarRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation ReactionBarRemoveMutation(\n  $subjectId: ID!\n  $content: ReactionContent!\n) {\n  removeReaction(input: {subjectId: $subjectId, content: $content}) {\n    subject {\n      __typename\n      __isReactable: __typename\n      id\n      ...ReactionBar_reactable\n    }\n  }\n}\n\nfragment ReactionBar_reactable on Reactable {\n  __isReactable: __typename\n  id\n  viewerCanReact\n  reactionGroups {\n    content\n    viewerHasReacted\n    reactors(first: 1) {\n      totalCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab4c90bd5efca8aaebddf89b3264e939";

export default node;
