/**
 * @generated SignedSource<<c39f8c63ca6ec9457a22e9d0a0afbb36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RepoPageQuery$variables = {
  name: string;
  owner: string;
};
export type RepoPageQuery$data = {
  readonly repository: {
    readonly defaultBranchRef: {
      readonly name: string;
      readonly target: {
        readonly committedDate?: any;
        readonly messageHeadline?: string;
        readonly oid?: any;
        readonly tree?: {
          readonly entries: ReadonlyArray<{
            readonly name: string;
            readonly object: {
              readonly byteSize?: number;
            } | null | undefined;
            readonly path: string | null | undefined;
            readonly type: string;
          }> | null | undefined;
        };
      } | null | undefined;
    } | null | undefined;
    readonly description: string | null | undefined;
    readonly forkCount: number;
    readonly homepageUrl: any | null | undefined;
    readonly id: string;
    readonly nameWithOwner: string;
    readonly object: {
      readonly isBinary?: boolean | null | undefined;
      readonly text?: string | null | undefined;
    } | null | undefined;
    readonly primaryLanguage: {
      readonly color: string | null | undefined;
      readonly name: string;
    } | null | undefined;
    readonly stargazerCount: number;
    readonly url: any;
  } | null | undefined;
};
export type RepoPageQuery = {
  response: RepoPageQuery$data;
  variables: RepoPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "owner"
},
v2 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "owner"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameWithOwner",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "homepageUrl",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stargazerCount",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "forkCount",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "color",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "oid",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "messageHeadline",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "committedDate",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "path",
  "storageKey": null
},
v17 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "byteSize",
      "storageKey": null
    }
  ],
  "type": "Blob",
  "abstractKey": null
},
v18 = [
  {
    "kind": "Literal",
    "name": "expression",
    "value": "HEAD:README.md"
  }
],
v19 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isBinary",
      "storageKey": null
    }
  ],
  "type": "Blob",
  "abstractKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
    "name": "RepoPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Language",
            "kind": "LinkedField",
            "name": "primaryLanguage",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Ref",
            "kind": "LinkedField",
            "name": "defaultBranchRef",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "target",
                "plural": false,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tree",
                        "kind": "LinkedField",
                        "name": "tree",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "TreeEntry",
                            "kind": "LinkedField",
                            "name": "entries",
                            "plural": true,
                            "selections": [
                              (v10/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "object",
                                "plural": false,
                                "selections": [
                                  (v17/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Commit",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v18/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "object",
            "plural": false,
            "selections": [
              (v19/*: any*/)
            ],
            "storageKey": "object(expression:\"HEAD:README.md\")"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RepoPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Language",
            "kind": "LinkedField",
            "name": "primaryLanguage",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Ref",
            "kind": "LinkedField",
            "name": "defaultBranchRef",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "target",
                "plural": false,
                "selections": [
                  (v20/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tree",
                        "kind": "LinkedField",
                        "name": "tree",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "TreeEntry",
                            "kind": "LinkedField",
                            "name": "entries",
                            "plural": true,
                            "selections": [
                              (v10/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "object",
                                "plural": false,
                                "selections": [
                                  (v20/*: any*/),
                                  (v17/*: any*/),
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Commit",
                    "abstractKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v18/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "object",
            "plural": false,
            "selections": [
              (v20/*: any*/),
              (v19/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": "object(expression:\"HEAD:README.md\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2b1f6b0b450fe7823f57920ed42709b0",
    "id": null,
    "metadata": {},
    "name": "RepoPageQuery",
    "operationKind": "query",
    "text": "query RepoPageQuery(\n  $owner: String!\n  $name: String!\n) {\n  repository(owner: $owner, name: $name) {\n    id\n    nameWithOwner\n    description\n    url\n    homepageUrl\n    stargazerCount\n    forkCount\n    primaryLanguage {\n      name\n      color\n      id\n    }\n    defaultBranchRef {\n      name\n      target {\n        __typename\n        ... on Commit {\n          oid\n          messageHeadline\n          committedDate\n          tree {\n            entries {\n              name\n              type\n              path\n              object {\n                __typename\n                ... on Blob {\n                  byteSize\n                }\n                id\n              }\n            }\n            id\n          }\n        }\n        id\n      }\n      id\n    }\n    object(expression: \"HEAD:README.md\") {\n      __typename\n      ... on Blob {\n        text\n        isBinary\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c08ddf031b940fb7ada322c1d40131c2";

export default node;
