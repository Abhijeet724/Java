const chokidar = require('chokidar');
const { exec } = require('child_process');

console.log("Watching for file changes...");

chokidar.watch('.', {
    ignored: /node_modules|\.git/,
    persistent: true
}).on('change', (path) => {

    console.log(`File changed: ${path}`);

    exec('git add . && git commit -m "Auto update" && git push origin main',
        (error, stdout, stderr) => {
            if (error) {
                console.log("Nothing to commit.");
                return;
            }
            console.log("Auto pushed to GitHub.");
        });
});
