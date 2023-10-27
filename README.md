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

`node:internal/deps/undici/undici:11372
    Error.captureStackTrace(err, this);
          ^

TypeError: fetch failed
    at Object.fetch (node:internal/deps/undici/undici:11372:11) {
  cause: Error: unknown scheme
  ...
    }`

I am very much unsure of what to make of this error message.

#### 13:49
In trying to be a little more productive than merely waiting, I've been trying to set up a service worker. As of right now, it seems to be working. Naturally, the service worker cannot yet be registered as I've yet to set up a HTTPS connection, but the scripts appear to link properly, and temporary `console.log("")` messages are working. I used the following links:
* https://www.keycdn.com/blog/service-workers
* https://rajat-m.medium.com/what-are-service-workers-and-how-to-use-them-e993c1f497e6
* https://medium.com/@gkverma1094/service-workers-a-detailed-look-83336036c1af
* https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/
* https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
* https://github.com/mdn/dom-examples/tree/main/service-worker/simple-service-worker