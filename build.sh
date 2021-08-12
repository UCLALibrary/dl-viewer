rm -rf dist
npm install
cp -r ./node_modules/universalviewer/dist ./
cp ./src/* dist/
cp dist/uv.html dist/index.html
