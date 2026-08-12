/**
 * Build a @git-diff-view DiffFile from GitHub unified-diff hunks.
 * Shared by commit/compare (FilesDiffList) and PR review (PullFilesDiff).
 */
import { DiffFile } from '@git-diff-view/react';
import { langFromPath } from '@/lib/diffLang';
import type { ResolvedTheme } from '@/lib/theme';

export type BuiltDiffFile = {
  diffFile: DiffFile | null;
  parseError: string | null;
};

export function buildDiffFile(input: {
  hunks: string[];
  oldName: string;
  newName: string;
  /** File path for language detection fallback */
  path: string;
  theme: ResolvedTheme;
}): BuiltDiffFile {
  try {
    // Prefer new path for renames; map extension → hljs id (rs→rust, etc.)
    const lang = langFromPath(input.newName || input.oldName || input.path);
    const file = new DiffFile(
      input.oldName,
      '',
      input.newName,
      '',
      input.hunks,
      lang,
      lang,
    );
    file.initTheme(input.theme);
    // init() = initRaw (compose content from hunks) + initSyntax (lowlight, all langs)
    file.init();
    file.buildSplitDiffLines();
    file.buildUnifiedDiffLines();
    if (file.unifiedLineLength === 0 && file.splitLineLength === 0) {
      return { diffFile: null, parseError: 'Parsed diff is empty' };
    }
    return { diffFile: file, parseError: null };
  } catch (e) {
    return {
      diffFile: null,
      parseError: e instanceof Error ? e.message : String(e),
    };
  }
}
