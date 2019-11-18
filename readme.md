
![Open Randomizer Tracker](http://openrandomizertracker.com/images/logo-github.png)

# Open Randomizer Tracker
Simple cross-platform tracker for game randomizers such as Link to the Past. For use with OBS or whatever broadcast suite you use. 

## Package Downloads
Visit http://openrandomizertracker.com for the latest binary builds for Linux, Windows, or macOS.

## Current Features
- Link to the Past Modules (Keysanity and Normal Including Triforce Trackers)
- Timer and Title Support
- Customization Support Such as (Font Selection, Colors, and Padding)
- Multi-Language Support (English, Spanish, French, German, Japanese, Korean, and Russian)

Note: Languages other than English were translated using google, if you have better translations submit a ticket or a pull request with your suggestions. Please format them like the JSON file in the `src/language` folder.

## Development
### Knowledge Prerequisites 
To effectively work on this project you need to know the following:

 - General javascript knowledge (and no, not jQuery)
 - Knowledge of React and how React context works.
 - If you plan to make any build modifications, a very good understanding of webpack.
 - SASS for stylesheeting.

### Software Dependencies
For general development you must have:
 - Node LTS Version 12 or above
 - Yarn
 - A coder such as Vim, Sublime Text, or Visual Studio Code
 - Python 2 (For Electron Builder)

For building binaries
 - The above dependencies installed and ...
 - Python 2.x
 - Compiler
     - Windows:
         - Visual Studio (Express)
    - macOS:
        - XCode with Command Line Tools
    - Linux:
        - GCC or CLANG/LLVM

### Getting Started With Development (Electron)

 - Clone this repo
 - Run: `yarn install`
 - Run: `yarn start`

All application files are in the `src/` folder and is organized accordingly. The root of the application starts at `index.js`.

### Getting Started with Development (Web Application)
 - Clone this repo
 - Run: `yarn start-web`
 - In your browser go to `http://localhost:9000`

Note there are some missing features in the web version, such as window scaling and always on top. I highly suggest you look at the `./src/controllers` and look at both the electron and web controllers. These are injected based upon the webpack configuration used and need to be somewhat interoperable to function in both environments.

### Building an Electron Binary
- Run `yarn bundle`

All artifacts will be built into the `./dist` folder. You will need each environment to build binaries for Windows, Linux, and macOS.

### Building a Web Application 
- Run `yarn build-web`

You can find the contents in the `./build` folder after it has compiled.

### Auto-Translation Service (Google Translate API)
Because I don't have language maintainers, I use a google translation API toolkit for any language other than English. If you add new keys to the `src/lanaguage/en.json` file you will need to get those translated. To do that for other languages simply run `yarn translate` command at prompt. 

You will need a google API key for this to function, you can learn how to get one by going to this link: [https://cloud.google.com/translate/docs/basic/setup-basic](https://cloud.google.com/translate/docs/basic/setup-basic)

Once you have your JSON key file, simply create a file in the root of the project called `google.json` and copy the contents of it in there. Don't worry, this file is in `.gitignore` so it won't commit to the repo exposing your keyfile.

Once you have done your translations attempt to spot check them and make sure they conform as best as you can understand.

## License
Copyright (c) 2019 Open Randomizer Tracker Project, Anthony Mattera

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in
   the documentation and/or other materials provided with the
   distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived
   from this software without specific prior written permission.

4. Redistributions of any form whatsoever must retain the following
   acknowledgment: 'This product includes software developed by
   "Open Randomizer Tracker Project and 'Anthony Mattera' 
   (http://www.openrandomizertracker.com/)."

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


