#!/usr/bin/env -S deno run -A --ext=ts
import $ from "https://deno.land/x/dax@0.36.0/mod.ts";
import { fetchAndWriteToFile } from "./utils/settings.ts";

$.setPrintCommand(true);

async function mkProject(projectName: string) {
  await $`pnpm create svelte@latest ${projectName}`;
  Deno.chdir(`./${projectName}`);
  await $`pnpm i`;
  await $`git init`;
  Deno.mkdir("./.vscode");
  const encoder = new TextEncoder();
  const data = encoder.encode(`{
    "editor.tabSize": 2,
    "files.insertFinalNewline": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.organizeImports": true,
      "source.fixAll.stylelint": true,
      "source.fixAll": true
    },
    "[svelte]": {
      "editor.defaultFormatter": "svelte.svelte-vscode"
    }
  }
  `);
  Deno.writeFileSync("./.vscode/settings.json", data);
  await $`pnpm run dev -- --open`;
}

// run
const args = Deno.args;
if (args.length === 1) {
  Deno.mkdir(`./${args[0]}/`, { recursive: true });
  Deno.mkdir(`./${args[0]}/.vscode/`, { recursive: true });
  // GitHubのRAW URLとWorking Directoryに作成するファイルのパスを指定
  const githubRawUrl =
    "https://github.com/maimeeeee/peanuts-rc/blob/main/.vscode/settings.json";
  const filePath = `./${args[0]}/.vscode/settings.json`; // Working Directoryに作成するファイルのパス
  // 関数を実行
  await fetchAndWriteToFile(githubRawUrl, filePath);
}
