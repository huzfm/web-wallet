

const fs = require("fs");
const path = require("path");

const TARGET_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];
const ROOT_DIR = process.cwd();

function removeComments(code) {
      return code
            
            .replace(/\/\*[\s\S]*?\*\//g, "")
            
            .replace(/(^|\s)\/\/.*$/gm, "$1");
}

function walk(dir) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            
            if (stat.isDirectory()) {
                  if (["node_modules", ".next", ".git"].includes(file)) continue;
                  walk(fullPath);
            } else {
                  const ext = path.extname(file);
                  if (!TARGET_EXTENSIONS.includes(ext)) continue;

                  const original = fs.readFileSync(fullPath, "utf8");
                  const cleaned = removeComments(original);

                  if (original !== cleaned) {
                        fs.writeFileSync(fullPath, cleaned, "utf8");
                        console.log("✔ cleaned:", fullPath);
                  }
            }
      }
}

console.log("🧹 Removing comments...");
walk(ROOT_DIR);
console.log("✅ Done.");
