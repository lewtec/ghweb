/**
 * @generated SignedSource<<8fdc141aa94f1b0a6d107672f9060e05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SearchPageQuery$variables = {
  q: string;
};
export type SearchPageQuery$data = {
  readonly repoSearch: {
    readonly nodes: ReadonlyArray<{
      readonly description?: string | null | undefined;
      readonly id?: string;
      readonly name?: string;
      readonly nameWithOwner?: string;
      readonly owner?: {
        readonly login: string;
      };
    } | null | undefined> | null | undefined;
    readonly repositoryCount: number;
  };
  readonly search: {
    readonly issueCount: number;
    readonly nodes: ReadonlyArray<{
      readonly __typename: "Issue";
      readonly id: string;
      readonly number: number;
      readonly repository: {
        readonly name: string;
        readonly nameWithOwner: string;
        readonly owner: {
          readonly login: string;
        };
      };
      readonly title: string;
    } | {
      readonly __typename: "PullRequest";
      readonly id: string;
      readonly number: number;
      readonly repository: {
        readonly name: string;
        readonly nameWithOwner: string;
        readonly owner: {
          readonly login: string;
        };
      };
      readonly title: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined> | null | undefined;
  };
};
export type SearchPageQuery = {
  response: SearchPageQuery$data;
  variables: SearchPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "q"
  }
],
v1 = {
  "kind": "Variable",
  "name": "query",
  "variableName": "q"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 25
  },
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "type",
    "value": "ISSUE"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "issueCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameWithOwner",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "login",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "owner",
  "plural": false,
  "selections": [
    (v10/*: any*/)
  ],
  "storageKey": null
},
v12 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Repository",
    "kind": "LinkedField",
    "name": "repository",
    "plural": false,
    "selections": [
      (v8/*: any*/),
      (v9/*: any*/),
      (v11/*: any*/)
    ],
    "storageKey": null
  }
],
v13 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 15
  },
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "type",
    "value": "REPOSITORY"
  }
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "repositoryCount",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "owner",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v10/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v17 = [
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Repository",
    "kind": "LinkedField",
    "name": "repository",
    "plural": false,
    "selections": [
      (v8/*: any*/),
      (v9/*: any*/),
      (v16/*: any*/),
      (v5/*: any*/)
    ],
    "storageKey": null
  }
],
v18 = {
  "kind": "InlineFragment",
  "selections": [
    (v5/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v12/*: any*/),
                "type": "Issue",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v12/*: any*/),
                "type": "PullRequest",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "repoSearch",
        "args": (v13/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v14/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v11/*: any*/),
                  (v15/*: any*/)
                ],
                "type": "Repository",
                "abstractKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v17/*: any*/),
                "type": "Issue",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v17/*: any*/),
                "type": "PullRequest",
                "abstractKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "repoSearch",
        "args": (v13/*: any*/),
        "concreteType": "SearchResultItemConnection",
        "kind": "LinkedField",
        "name": "search",
        "plural": false,
        "selections": [
          (v14/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v16/*: any*/),
                  (v15/*: any*/)
                ],
                "type": "Repository",
                "abstractKey": null
              },
              (v18/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d1623859054d1011d515c40ef6276956",
    "id": null,
    "metadata": {},
    "name": "SearchPageQuery",
    "operationKind": "query",
    "text": "query SearchPageQuery(\n  $q: String!\n) {\n  search(query: $q, type: ISSUE, first: 25) {\n    issueCount\n    nodes {\n      __typename\n      ... on Issue {\n        id\n        number\n        title\n        repository {\n          nameWithOwner\n          name\n          owner {\n            __typename\n            login\n            id\n          }\n          id\n        }\n      }\n      ... on PullRequest {\n        id\n        number\n        title\n        repository {\n          nameWithOwner\n          name\n          owner {\n            __typename\n            login\n            id\n          }\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  repoSearch: search(query: $q, type: REPOSITORY, first: 15) {\n    repositoryCount\n    nodes {\n      __typename\n      ... on Repository {\n        id\n        nameWithOwner\n        name\n        owner {\n          __typename\n          login\n          id\n        }\n        description\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "03a8090f9bff710c7351062b74f625e5";

export default node;
