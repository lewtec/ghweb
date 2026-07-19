/**
 * @generated SignedSource<<4e00b889ff2abfd67539a148af1c8c0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ReactionContent = "CONFUSED" | "EYES" | "HEART" | "HOORAY" | "LAUGH" | "ROCKET" | "THUMBS_DOWN" | "THUMBS_UP" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ReactionBar_reactable$data = {
  readonly id: string;
  readonly reactionGroups: ReadonlyArray<{
    readonly content: ReactionContent;
    readonly reactors: {
      readonly totalCount: number;
    };
    readonly viewerHasReacted: boolean;
  }> | null | undefined;
  readonly viewerCanReact: boolean;
  readonly " $fragmentType": "ReactionBar_reactable";
};
export type ReactionBar_reactable$key = {
  readonly " $data"?: ReactionBar_reactable$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReactionBar_reactable">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReactionBar_reactable",
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
  "type": "Reactable",
  "abstractKey": "__isReactable"
};

(node as any).hash = "9eb8ae6f280e5352d9bad97898c20864";

export default node;
