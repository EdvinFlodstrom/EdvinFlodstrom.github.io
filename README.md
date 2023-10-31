Journal
==========

2023-10-23
-------------
With a bit of help, I got started with setting up the workspace. I created a project folder and installed all the modules I needed with npm. I had a bit of trouble converting the sass file to CSS, but with help, I came across the following command:
`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`. This allowed me to run the command `sass sass.scss style.css` which translated the contents of the sass file into CSS for the CSS file. I also got it running automatically with the onchange module, by running `npm run watch:scss`, but this requires me to keep PowerShell running the aforementioned command constantly. At the time of writing, I am unsure of whether this is the right approach or not. 

2023-10-26
-------------

#### 11:50
Starting out, I have two primary objectives ahead, the first being to clone a GitHub repository and push my project to GitHub while also setting up GitHub Pages, and the second being to set up npm precommit scripts. After the latter is complete, I'll have to make sure the CSS Lint and Squoosh scripts run before each commit.

#### 12:17
I think CSS lint is working. If I run the "lint" script I added to "package.json", it correctly checks and identifies any errors in the "style.css" document. I also have it set up in a "pre-commit" array, so it should run every time I try to commit anything, I think. I found information for this using the following link: "https://github.com/CSSLint/csslint/wiki/Command-line-interface".

#### 13:17
While running into problems around every corner, I've been searching for searching for answers to various problems I've encountered in the past hour. At first, when I was going to try to set up a GitHub Pages site, I ran into the issue of Git not working in PowerShell. I'm not certain if it's because I've missed something or if I'm supposed to install Git for Windows or something similar. I've also been trying to get Squoosh to work, but I'm struggling with it. After some time of trying to find which commands to use in PowerShell or in "package.json", I found the following link: "https://www.npmjs.com/package/@squoosh/cli?activeTab=code". It explains how to use Squoosh in "package.json", but when trying it out, I'm getting an error message stating the following:

node:internal/deps/undici/undici:11372
    Error.captureStackTrace(err, this);
          ^

TypeError: fetch failed
    at Object.fetch (node:internal/deps/undici/undici:11372:11) {
  cause: Error: unknown scheme
  ...
    }

I am very much unsure of what to make of this error message.

#### 13:49
In trying to be a little more productive than merely waiting, I've been trying to set up a service worker. As of right now, it seems to be working. Naturally, the service worker cannot yet be registered as I've yet to set up a HTTPS connection, but the scripts appear to link properly, and temporary `console.log("")` messages are working. I used the following links:
* https://www.keycdn.com/blog/service-workers
* https://rajat-m.medium.com/what-are-service-workers-and-how-to-use-them-e993c1f497e6
* https://medium.com/@gkverma1094/service-workers-a-detailed-look-83336036c1af
* https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/
* https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
* https://github.com/mdn/dom-examples/tree/main/service-worker/simple-service-worker

2023-10-28
------------
#### 09:04
After an hour of debugging the service worker and Squoosh, I have gotten basically nowhere. I've decided to try fixing the service worker first, and then tackle Squoosh.

More problems. Not that I expected any less. Now since Git didn't install when I installed GitHub desktop (twice), I can't seem to access Git through PowerShell. And because of this, precommit scripts don't seem to work. So for the precommit scripts to have any effect, I have to use Git through PowerShell, but I can't since Git "is not recognized as the name of a cmdlet, function, script file, or operable program". And still, the service worker does not work. My JS document contains the following code:

if (navigator && navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
}

And the following error message is written: "Uncaught (in promise) TypeError: Failed to register a ServiceWorker for scope ('https://edvinflodstrom.github.io/') with script ('https://edvinflodstrom.github.io/sw.js'): A bad HTTP response code (404) was received when fetching the script."

#### 09:51
Service worker works. At least it looks like it, since I'm no longer getting the error message. All I did was move the code from js.js to index.html. I didn't change the code at all, as far as I know. So I don't really know why (if) it works, but I won't question it. I used the following links: 
* https://stackoverflow.com/questions/60675954/failed-to-register-a-serviceworker-flutter
* https://github.com/hanford/next-offline/issues/141
* https://stackoverflow.com/questions/30336685/404-error-when-trying-to-register-serviceworker
* https://stackoverflow.com/questions/60960328/which-type-of-event-listeners-are-available-for-service-workers#:~:text=Event%20listener%20function%20in%20service%20workers%20seems%20to,%27%20fetch%20type%20%27%20in%20a%20service%20worker
* https://www.w3.org/TR/service-workers/#execution-context-events

And a few others. So now I'll have to try tackling Squoosh. Problem is, I've already searched everywhere I can think of, so I'll just have to get started.

#### 10:41
Still, no progress. I've tried installing Squoosh using "npm install squoosh", but it seems to do literally nothing since the npm module appears empty (https://www.npmjs.com/package/squoosh?activeTab=code). I've tried installing squoosh/lib, but it works in JavaScript and seemingly not in PowerShell or JSON. I've tried installing squoosh/cli in three separate folders, including this one, another one on OneDrive, and the final one on my local drive. All have resulted in the same error message, as documented previously. No documentation I've found online has been of any help, and commands that some people use in the CLI to Squoosh images produce the aforementioned error message instead for me. The root issue is that I cannot access anything with Squoosh. I can run the commands, but the fetch always fails regardless of location or file type.
* https://www.npmjs.com/package/@squoosh/cli?activeTab=code
* https://dev.to/0xkoji/optimize-images-with-cli-tool-from-google-squoosh-nfg
* https://targetinternet.com/resources/a-complete-guide-to-squoosh-what-is-it-and-how-to-use-it/
* https://web.dev/blog/introducing-libsquoosh

I have been searching for a fix for hours, but in the end I always get the same error message. The full message is as follows:

node:internal/deps/undici/undici:11372
    Error.captureStackTrace(err, this);
          ^

TypeError: fetch failed
    at Object.fetch (node:internal/deps/undici/undici:11372:11) {
  cause: Error: unknown scheme
      at makeNetworkError (node:internal/deps/undici/undici:4801:35)
      at schemeFetch (node:internal/deps/undici/undici:9538:18)
      at node:internal/deps/undici/undici:9409:26
      at mainFetch (node:internal/deps/undici/undici:9428:11)
      at fetching (node:internal/deps/undici/undici:9377:7)
      at fetch2 (node:internal/deps/undici/undici:9245:20)
      at Object.fetch (node:internal/deps/undici/undici:11370:18)
      at fetch (node:internal/process/pre_execution:242:25)
      at instantiateAsync (C:\Users\04edfl12\OneDrive - Stenungsunds Kommun\Webbutveckling\pwa\node_modules\@squoosh\lib\build\index.js:28:11469)
      at createWasm (C:\Users\04edfl12\OneDrive - Stenungsunds Kommun\Webbutveckling\pwa\node_modules\@squoosh\lib\build\index.js:28:12079)
}

Apart from any minor file path changes, it always looks the same regardless of where I execute any Squoosh-related commands. I tried installing squoosh/cli globally, using `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` to allow scripts to be run, same result. Same error message. No matter what approach I seem to take, the wall in the way (the error) remains somewhere else, and so no matter what approach I take, I always run into said wall eventually. This command: "squoosh-cli -d --output ." also provides the same error message. And so does this one: "squoosh-cli --max-optimizer-rounds 5 images/grass.jpg". And this one: "squoosh-cli -s . *". Basically the only Squoosh command that actually works is: "squoosh-cli --help". I assume this means that the problem has to have to do with squoosh/cli. I don't know what else to do, or where else to search. I've tried everything I can think of multiple times, to no avail. This command also works "npx @squoosh/cli --help", but it's the same as a previously mentioned one apart from this one being without @squoosh/cli being installed globally. So it doesn't help. Running the following JSON script: '"squoosh": "@squoosh-cli mozjpeg 50px *"' with "npm run squoosh" also results in the same error message.

2023-10-31
------------
#### 09:59
After trying for a while to figure out how exactly to use Bootstrap, I've managed to implement a simple button that I think looks fine. It took me longer than I would've preferred, but I haven't worked a lot with Bootstrap before so at least I've made some progress now. I also got Git working in PowerShell by installing Git for Windows, so next time I commit, I'll try doing it through PowerShell. With a bit of luck, the first commit won't work due to the current pre-commit script expecting Squoosh to work (it doesn't).

#### 11:02
Alas, pre-commit did not stop the commit. I'm not sure if it's because I'm using PowerShell or something else, but the commit went through just fine, unlike what I had expected. Anyhow, I was also trying to generate a manifest.json file, but the generator appears unwilling to cooperate (https://app-manifest.firebaseapp.com/), since if I ever press "Generate .ZIP", with or without adding text or an image, I get a server error. I suppose I could create my own manifest.json file, and if the generator keeps giving me errors, I'll try it eventually.

#### 11:52
The manifest.json file seems to be functional now. Since the generator still wasn't working, I made the file myself with help I found online. I had some trouble getting the images to load properly, since I initially didn't realize the JPG format was invalid, and after that one of the images wasn't loading. To fix this, I converted them all to PNGs and removed the one image that wasn't loading. This fixed the issue, and the manifest.json file seems to be working properly now. With this, I think the project has the three core components of a PWA, but I still have to get Squoosh working.