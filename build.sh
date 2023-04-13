#!/bin/bash
./node_modules/.bin/react-scripts build

files=$(find build/ -type f -not -name ".DS_Store" | sed 's/build\///g' | sed "s/^/'/g" | sed "s/$/',/g" | tr -d '')
files=${files%?}
files=$(echo $files | sed 's/\//\\\//g')

sed -i '' "s/let precacheResources = \[\'\/\'\];/let precacheResources = \[\'\/\', $files\];/g" build/serviceWorker.js
