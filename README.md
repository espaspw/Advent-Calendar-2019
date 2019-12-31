# Advent Calendar 2019

Celebrating the annual tradition of the EJLX discord server is the archive for 2019's participants in the Advent Calendar event. 

The invite link for the server is https://discord.gg/japanese. 

## How to Build

The webpage is first generated dynamically using simple components using crel (a wrapper for document.createElement) and scoped-CSS (found in the .mcss files). The dynamic page is prerendered, and the static output html is put in the dist folder. 

The files not needed after the initial render are then extracted to the docs folder, which is served on github pages.

To build your own version (for some reason), run:

```bash
npm install
```

to install all the necessary build tools. Then run 

```bash
npm run build
```

which should put the final files in the docs folder.