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
* https://developer.mozilla.org/en-US/docs/Web/Manifest/scope
* https://www.youtube.com/watch?v=AlEdGOLhuM8

#### 21:10
Later on in the day, I got some help with fixing Squoosh. It seems Squoosh was incompatible with the version of NodeJS I was using, so I downgraded NodeJS and tried again. It almost worked, but not quite. Now I'm getting a new error message, stating the following:

node:internal/process/promises:279
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[Error: ENOENT: no such file or directory, lstat 'C:\Users\04edfl12\OneDrive - Stenungsunds Kommun\Webbutveckling\pwa\resize'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'lstat',
  path: 'C:\\Users\\04edfl12\\OneDrive - Stenungsunds Kommun\\Webbutveckling\\pwa\\resize'
}

So it's a new error message, and it's basically unique to the version 16.20.2 of NodeJS, but it still doesn't work. I spent an hour and a half debugging and trying to fix it, to no avail. I deleted package-lock.json, installed and uninstalled both Squoosh and @Squoosh/cli, I tried multiple versions of NodeJS (I'm using nvm for Windows (https://github.com/coreybutler/nvm-windows)), cleared the npm cache, closed and reopened VSCodium (I also tried running the Squoosh command with VSCodium closed), I made sure no other processes of NodeJS were running, and I restarted my computer. Alas, it was not to be, for Squoosh remains unflinchingly uncooperative.
* https://github.com/coreybutler/nvm-windows
* https://github.com/coreybutler/nvm-windows/releases
* https://www.npmjs.com/package/n
* https://nodejs.org/en/about/previous-releases
* https://stackoverflow.com/questions/49620780/cant-install-any-npm-package-error-4058
* https://stackoverflow.com/questions/45557788/npm-err-code-eperm

2023-11-04
--------------
#### 15:06
Ignoring Squoosh, I instead opted to fix up the base of the PWA. In its previous state, it was an empty web page with an unoriginal header, a boring button and a plain image. Since I had an old Blackjack project (I wrote simple HTML, CSS, and JavaScript documents for it like a month ago) lying around, i decided to put it to use in this project. It wasn't as simple as copy pasting it, for two reasons: 1. The buttons in the Blackjack game were boring and I wanted to use Bootstrap to make them more lively, and 2. Some of the JavaScript code was poorly written so I had to modify it slightly. I didn't run into any major issues with these two steps, but I had a little trouble making the buttons look good. After mostly copy pasting the Blackjack game into this project, the buttons were very bland. When playing the game, the buttons change colour between yellow and red depending on whether you could interact with them or not. I thought to make it a little more interesting, since I'd already imported Bootstrap, so I added Bootstrap classes to the buttons and changed these classes rather than the buttons' background colors throughout the game. As a result, the buttons have a nice transition between their original color and green if you can click them, or red if you cannot. So now this project is a Blackjack game, and not a plain and boring white website with nothing in it. An unnecessary but welcome upgrade, I think.
* https://stackoverflow.com/questions/507138/how-to-add-a-class-to-a-given-element
* https://www.oddcontrast.com/

#### 15:47
Apparently I accidentally imported the wrong JavaScript document. It seems I didn't push the 'bugfixed' Blackjack project after 'fixing' it last time, so my old project on GitHub was a little older than I intended. No big deal, I compared the two projects and noticed that the bugfixed version was basically identical with the one on GitHub. The only real difference I noticed was the removal of a single comment. So all that aside, this new version of Blackjack is probably done. As usual, I still have to fix Squoosh at some point, but this I will postpone until further notion. For now, I will leave this project as is.

2023-11-06
-------------
#### 09:15
With the help of a classmate, Squosoh appears to be working now, I think. Changing the JSON script to `"squoosh": "squoosh-cli images/bluebg.jpg"` makes the command valid, and it doesn't cause any error messages. I'm unsure if the Squoosh script actually does anything, since I'm not specifying any resize size or anything similar, but at least I'm not getting any error message. If I try to add "resize", an error is thrown, so for now I'll leave it as is.

#### 14:17
When trying to fix pre-commit, after installing Cypress, I found a few articles mentioning a pre-commit hook and some similar things. So I found a "pre-commit.sample" file in .git/hooks, and it provides the following instructions: "To enable this hook, rename this file to "pre-commit"". I did that, and when trying to commit, it didn't work. This commit should have worked if I'd done it correctly, and a message should have been displayed, but neither was the case. Problem is, the pre-commit checks much more than just what the script in package.json specifies. I got aproximately a billion errors stopping the commit, so I assume this is because this way of implementing pre-commit is used for verifying entire projects rather than running predetermined scripts. So I suppose it's a way of implementing pre-commit, but not what I need.
* https://stackoverflow.com/collectives/articles/71270196/how-to-use-pre-commit-to-automatically-correct-commits-and-merge-requests-with-g
* https://stackoverflow.com/questions/56867216/why-wont-my-pre-commit-hook-run-when-i-commit
* https://stackoverflow.com/questions/57084622/why-isnt-my-git-pre-commit-hook-running
* https://stackoverflow.com/questions/67137482/git-pre-commit-hook-doesnt-work-in-windows
* https://stackoverflow.com/collectives/articles/71270196/how-to-use-pre-commit-to-automatically-correct-commits-and-merge-requests-with-g
* https://github.com/pre-commit/pre-commit/issues/1845

#### 17:27
After reading the following block of text in the README.md file at https://www.npmjs.com/package/pre-commit?activeTab=code: 
> To install it as `devDependency`. When this module is installed it will override the existing `pre-commit` file in your `.git/hooks` folder. Existing `pre-commit` hooks will be backed up as `pre-commit.old` in the same repository.

...I realized that the reason pre-commit isn't working for me is because I installed the pre-commit module BEFORE setting up Git in my project. This means that the module did not override the existing pre-commit file (there wasn't any to override), but rather, Git's pre-commit file in fact replaced pre-commit's pre-commit file. Simply put: because I installed the pre-commit module before setting up Git, the pre-commit hook file was incorrect. So pre-commit does stop my commits now, which is all well and good, but this caused me another issue. Since I've included csslint in my pre-commit script, I cannot make a commit without csslint being run (I know I can force a commit, though), and my style.css document has a grand total of 327 errors. I noticed one error I had made that I could easily fix, bringing the total down from 328. Thing is, about 325 (if not more) of these errors are from the scss code generated from Bootstrap. I can't easily change the css code that Bootstrap generates, at least not on a very detailed level. Most of the generated errors from running csslint are in the forms of "Rule doesn't have all its properties in alphabetiacal order" or "Expected RBRACE at line x, col y". I don't think there is much I can do about these issues, so I'm currently trying to get the CSS linter to ignore them instead.

2023-11-07
--------------
#### 12:32
From Squoosh to CSS lint, it seems. I appear to have found my new debugging opponent. As mentioned previously, I'm getting 300+ errors each time I run the csslint script, and this is obviously a problem. According to https://www.npmjs.com/package/csslint?activeTab=code, which leads to https://github.com/CSSLint/csslint/wiki/Command-line-interface, I can make the linter ignore certain rules by creating a .csslintrc file. It did not work, but no big deal this time. There was another strategy for ignoring rules, that being to embed the rules in the css document. So I added the rules to ignore in the sass.scss document and then translated it into css. It actually worked this time, but there were a lot of issues in the css document, and as such, a lot of issues to ignore. So I did not ignore one rule. I did not ignore five rules. No, I went full caveman and ignored ALL of them. But in the end, the caveman approach yielded caveman results. 277 issues yet remain. About 99% of the issues I'm getting are still in the form of "Expected RBRACE at line x, col y", and I blame Bootstrap for those. Not that it helps me, so I'll have to find another approach. I found a few articles discussing this issue, and no one appeared to have found a solution for ignoring the issues with csslint rules.
* https://stackoverflow.com/questions/61378832/unable-to-fix-csslint-error-expected-rbrace-on-css-grid-rule
* https://github.com/CSSLint/csslint/issues/603
* https://github.com/CSSLint/csslint/issues/720

I also tried going even more caveman and ignoring the style.css file with the script `"csslint": "csslint --exclude-list=style.css style.css"`, but at that point there's really no point in using a linter, if all I'm using it for is to avoid its functions.

#### 13:01
In the end, I have decided to remove the csslint script from pre-commit, and let csslint lint with no restrictions. I could find no other solutions, and although not what I wanted, this approach will have to suffice. One can still lint the CSS before committing to GitHub, but pre-commit will not force it. All things considered, it's better to have it this way than to lint the CSS document with literally no rules. So I'll move on to Cypress instead, now.

#### 16:00
The cypress test now works. Initially I wanted to avoid JQuery, despite it being included in Cypress, but I ended up using some JQuery functions regardless. But it works flawlessly, so I'm not going to complain. The test does three things: 1. It navigates to a local server of the PWA (this local server has to be set up beforehand), 2. It checks that the button "Begin" has the class "btn-outline-danger" and then clicks the "plus100" button, and lastly it 3. checks that the "Begin" button now has the "btn-outline-success" class instead, and that the "bet" HTML tag has the HTML value "Bet: $100". This was the test I wanted to do when I started out with Cypress, so I'm glad that it actually worked as I'd hoped in the end.
* https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
* https://docs.cypress.io/guides/references/configuration
* https://github.com/cypress-io/cypress/issues/4450
* https://stackoverflow.com/questions/58700051/select-element-with-class-name-that-starts-with-using-cypress
* https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
* https://stackoverflow.com/questions/71382547/how-can-i-verify-which-class-name-in-the-element
* https://stackoverflow.com/questions/71385871/is-there-a-way-to-check-if-an-element-has-a-class-in-cypress-io
* https://blog.learnjavascript.online/posts/javascript-has-class/
* https://stackoverflow.com/questions/71973798/how-to-click-on-a-button-within-a-specific-div-based-on-button-text
* https://docs.cypress.io/guides/core-concepts/conditional-testing
* https://docs.cypress.io/guides/references/assertions

#### 16:16
I've added a Cypress message and an extra Cypress script to package.json. I also added these two to pre-commit, so that Cypress runs the tests before each commit. It actually worked on my first attempt, this time. Since the test only passes if a local server of the project is open, the message writes out "Remember to keep local server online for duration of commit". Perhaps not flawless, but it works for this project, I think.
* https://testersdock.com/cypress-test-runner-cli/#:~:text=How%20to%20execute%20Cypress%20Tests%20using%20Test%20Runner,your%20desired%20browser.%20...%202%202.%20Using%20CLI%3A

2023-11-08
--------------
#### 10:36
For a while now, I've had a suspicion that my service worker isn't working properly. I'm still not completely certain, but I am getting an error message the first time I load the PWA through GitHub (only the first time I open it, subsequent reloads remove the error message), and it states the following: "failed to load resource: the server responded with a status of 404". A quick search on this error message tells me that GitHub probably couldn't find a certain file that I've linked to, somewhere. The page looks and functions well, so the service worker is probably my best bet here. I'll be trying some things before attempting to download the PWA to my phone, to make sure everything looks alright.

#### 10:48
Some good news, some potentially bad news. So in my browser, I'm getting an "App installable" prompt, which seems good, but I can't get the service worker to send a message to the console upon being installed. I'll keep trying some things and hope it works eventually, I suppose.

#### 11:11
So the service worker does register successfully, on my local server. Not on GitHub pages. I'm getting the aforementioned error message only on GitHub Pages, so I'm not sure what exactly is wrong here.