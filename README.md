# tdl-warmup-nodejs


## 1. Requirements

- `Node 22.14.0`
- `NPM 11.2.0`

## 2. How to start

- Install dependencies `npm install`
- Open `lib/send_command_to_server.js` in your favorite IDE
- Read the comments as documentation, they will guide through the rest of the setup


## NOTES

* I choose to implement this using TDD. I attempted to codify the requirements into a test list and implement from there
* I used Claude Code to suggest new tests to speed up the writting of the test suite
* I choose to spend time on implementing an offers engine as it was becoming clear that offers were complex. There was a missing requirement around how offers interact with each other. A rules engine for offers is much more flexible. After doing this, task 3 became a simple update to the config. 
* I did not know if git was being stnched too. I used it locally. 
* I fitted this in during work and parenting, so paused at various times. I did not work on the code during that time, but it did give me extra time to think about the solutions.
* I am not sure about the offers engine consuming skus, but hey ho. I tried to make it pure in that this removal of skus was local and didn't affect the original string. 
* naming conventions and use of _ may not be consitent across all files, I was going as fast as I could :P
