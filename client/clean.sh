#!/bin/bash
set -e

echo "Clean Project"

echo ""
echo "* node_modules delete"
rm -rf node_modules

echo "* package-lock.json delete"
rm -rf package-lock.json

echo "* npm install"
npm install --force

echo "* gradlew clean"
cd ./android 
./gradlew clean
cd ../

echo "* pod cache clean"
cd ./ios 
pod cache clean --all 
rm -rf Pods 
rm -rf Podfile.lock
rm -rf build

echo "* pod install"
pod install
cd ../ 
npm start -- --reset-cache