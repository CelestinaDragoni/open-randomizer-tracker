![Open Randomizer Tracker](http://openrandomizertracker.com/images/logo-github.png)

# Open Randomizer Tracker
Simple cross-platform tracker for game randomizers such as Link to the Past. For use with OBS or whatever broadcast suite you use. 
**Note: This software is currently in beta and still in progress...**

## Package Downloads
Visit http://openrandomizertracker.com for the latest binary builds for Linux, Windows, or macOS.

## Current Features
- Link to the Past Modules (Keysanity and Normal Including Triforce Trackers)
- Timer and Title Support
- Multi-Language Support (English and Japanese)*

* Note: Japanese was translated using google, if you have better translations submit a ticket or a pull request.

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

For building binaries
 - The above dependencies installed and ...
 - Windows
     - Visual Studio (Express)
- macOS
    - XCode with Command Line Tools
- Linux
    - GCC or CLANG/LLVM

If you don't know what any of these are, then you shouldn't be here. Don't ask me for help on setting up your environment.

### Getting Started With Development

 - Clone this repo
 - Run: `yarn install`
 - Run: `yarn start`

All application files are in the `src/` folder and is organized accordingly. The root of the application starts at `index.js`.

### Building a Binary
- Run `yarn build`

All artifacts will be built into the `./dist` folder. You will need each environment to build binaries for Windows, Linux, and macOS.

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


