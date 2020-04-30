# UCLA Library DLViewer

UCLA Digital Library media viewer.

Currently, this project is simply a deployment of Universal Viewer (http://universalviewer.io/) with local configuration. Future versions might change the underlying viewer, however, or include a shim app that loads different viewers for different media types.

# Build

First, [npm]() must be installed. Then:

```
sh ./build.sh
```

This gathers the code into the `./dist/` directory, which can then be copied to the web server.
