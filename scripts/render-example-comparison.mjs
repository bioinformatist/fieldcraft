import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exampleRoot = path.join(repoRoot, "examples", "form-feedback-comparison");
const outputPath = path.join(exampleRoot, "comparison.png");
const tmp = await mkdtemp(path.join(tmpdir(), "fieldcraft-example-"));

try {
  const pagePath = path.join(tmp, "comparison.html");
  await writeFile(pagePath, comparisonHtml());

  await run(chromiumCommand(), [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--no-default-browser-check",
    "--no-sandbox",
    "--window-size=1440,560",
    `--screenshot=${outputPath}`,
    pathToFileURL(pagePath).href,
  ]);
} finally {
  await rm(tmp, { recursive: true, force: true });
}

function comparisonHtml() {
  const withoutPath = path.join(exampleRoot, "without-fieldcraft", "index.html");
  const withPath = path.join(exampleRoot, "with-fieldcraft", "index.html");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0;
        background: #dbe7e2;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      .canvas {
        width: 1440px;
        height: 560px;
        padding: 34px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 28px;
      }

      .panel {
        min-width: 0;
      }

      .frame {
        width: 650px;
        height: 418px;
        margin-top: 16px;
        overflow: hidden;
        border-radius: 20px;
        box-shadow: 0 22px 55px rgba(16, 32, 28, 0.18);
        background: white;
      }

      .label {
        display: inline-flex;
        align-items: center;
        height: 36px;
        padding: 0 14px;
        border-radius: 18px;
        background: #10201c;
        color: #f7fbf8;
        font-size: 15px;
        font-weight: 740;
      }

      iframe {
        width: 1120px;
        height: 720px;
        border: 0;
        background: white;
        transform: scale(0.58);
        transform-origin: top left;
      }
    </style>
  </head>
  <body>
    <div class="canvas">
      <div class="panel">
        <div class="label">Without Fieldcraft</div>
        <div class="frame">
          <iframe src="${pathToFileURL(withoutPath).href}"></iframe>
        </div>
      </div>
      <div class="panel">
        <div class="label">With Fieldcraft</div>
        <div class="frame">
          <iframe src="${pathToFileURL(withPath).href}"></iframe>
        </div>
      </div>
    </div>
  </body>
</html>
`;
}

function chromiumCommand() {
  return process.env.CHROMIUM_BIN || "chromium";
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      env: process.env,
      stdio: "inherit",
    });

    child.on("error", (error) => {
      if (error.code === "ENOENT") {
        reject(
          new Error(
            `Could not find ${command}. Run \`nix develop .#examples -c node scripts/render-example-comparison.mjs\` or set CHROMIUM_BIN.`,
          ),
        );
      } else {
        reject(error);
      }
    });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with ${code}`));
      }
    });
  });
}
