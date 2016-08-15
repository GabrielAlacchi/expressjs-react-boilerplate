# expressjs-react-boilerplate
Boilerplate for developing with an express backend and react frontend. Using gulp as a task runner.
The structure of the Gulpfile is built from this article: http://jpsierens.com/tutorial-gulp-javascript-2015-react/
respek goes out to the guy who wrote it.

# Setup

<p>From the repository: </p>
`Simply fork or clone this repository. Or alternatively download the zip.` <br>
`npm install` in the root directory.
<p>There are many dependencies required to transpile es2015 + jsx -> es5, as well as gulp packages so don't freak out if it takes a while</p>

# Live Reload
To use the live reload with gulp you need the browser extension. For chrome it's available here for free https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en.

# NPM Scripts
`npm start` will start the express app. <br>
`npm run dev` will start the express app and the gulp task watcher, triggering live-reloads as well. This command essentially covers all the front-end development workflow to a tee.

# Gulp Tasks

If you want to micromanage the use of gulp you can install it globally by running: <br>
`npm install -g gulp` <br>
Tasks in the gulpfile.js: <br>
`gulp bundle` will make gulp transpile all the es2015+jsx code in react-app/src/ into build/src/bundle.js. Essentially compiling the react app. <br>
`gulp postcss` will make gulp compile all the postcss code in css/ and output it into the build/stylesheets/ directory. <br>
`gulp html` will copy any html files in the root of react-app/ into the build/ directory to be visible to the web server. <br>
`gulp images` will minify and compress images in images/ and output them into the build/img/ directory. <br>
`gulp watch` watches all files in react-app, css, images and will run their associated task if any changes are made. It then triggers a browser live-reload. <br>
Running `gulp` alone will perform all these tasks then start `gulp watch`.
