import { graphql, useLazyLoadQuery } from 'react-relay';
import { Link } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { CodeBrowserPageQuery } from './__generated__/CodeBrowserPageQuery.graphql';
import { ExternalLink } from '@/components/ExternalLink';

const query = graphql`
  query CodeBrowserPageQuery(
    $owner: String!
    $name: String!
    $expression: String!
  ) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        __typename
        ... on Tree {
          entries {
            name
            type
            path
          }
        }
        ... on Blob {
          text
          isBinary
          byteSize
        }
      }
    }
  }
`;

const MAX_TEXT = 512_000;

type Props = {
  owner: string;
  name: string;
  refName: string;
  path: string;
  mode: 'tree' | 'blob';
};

export function CodeBrowserPage({ owner, name, refName, path, mode }: Props) {
  const expression = path ? `${refName}:${path}` : refName;
  const data = useLazyLoadQuery<CodeBrowserPageQuery>(query, {
    owner,
    name,
    expression,
  });
  const obj = data.repository?.object;

  if (!obj) {
    return (
      <div className="p-4 alert alert-warning">
        Not found: {expression}.{' '}
        <ExternalLink
          className="link"
          href={`https://github.com/${owner}/${name}/${mode}/${refName}/${path}`}
        >
          Open on GitHub
        </ExternalLink>
      </div>
    );
  }

  if (obj.__typename === 'Tree' && 'entries' in obj) {
    return (
      <div className="p-3 md:p-4 max-w-4xl">
        <div className="text-sm opacity-60 mb-2 font-mono break-all">
          {refName}:{path || '/'}
        </div>
        <ul className="card bg-base-100 border border-base-300 divide-y divide-base-300 dense-list">
          {path ? (
            <li className="dense-row">
              <Link
                to="/$owner/$name/tree/$ref/$"
                params={{
                  owner,
                  name,
                  ref: refName,
                  _splat: path.split('/').slice(0, -1).join('/'),
                }}
                className="link link-hover"
              >
                ..
              </Link>
            </li>
          ) : null}
          {obj.entries?.map((e) => {
            if (!e) return null;
            const isTree = e.type === 'tree';
            return (
              <li key={e.path ?? e.name} className="dense-row">
                <Link
                  to={
                    isTree
                      ? '/$owner/$name/tree/$ref/$'
                      : '/$owner/$name/blob/$ref/$'
                  }
                  params={{
                    owner,
                    name,
                    ref: refName,
                    _splat: e.path ?? e.name,
                  }}
                  className="link link-hover"
                >
                  {e.name}
                  {isTree ? '/' : ''}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (obj.__typename === 'Blob' && 'isBinary' in obj) {
    if (obj.isBinary) {
      return (
        <div className="p-4 alert alert-info">
          Binary file ({obj.byteSize ?? '?'} bytes).{' '}
          <ExternalLink
            className="link"
            href={`https://github.com/${owner}/${name}/blob/${refName}/${path}`}
          >
            Open on GitHub
          </ExternalLink>
        </div>
      );
    }
    const text = obj.text ?? '';
    if (text.length > MAX_TEXT) {
      return (
        <div className="p-4 alert alert-warning">
          File too large to render in gitweb ({text.length} chars).{' '}
          <ExternalLink
            className="link"
            href={`https://github.com/${owner}/${name}/blob/${refName}/${path}`}
          >
            Open on GitHub
          </ExternalLink>
        </div>
      );
    }
    const isMd = path.endsWith('.md') || path.endsWith('.markdown');
    return (
      <div className="p-3 md:p-4 max-w-4xl space-y-2">
        <div className="text-sm opacity-60 font-mono break-all">
          {refName}:{path}
        </div>
        {isMd ? (
          <article className="prose prose-sm max-w-none bg-base-100 border border-base-300 rounded-box p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </article>
        ) : (
          <pre className="bg-base-200 border border-base-300 rounded-box p-3 text-xs overflow-auto max-h-[70vh]">
            <code>{text}</code>
          </pre>
        )}
      </div>
    );
  }

  return <div className="p-4">Unsupported object type.</div>;
}
