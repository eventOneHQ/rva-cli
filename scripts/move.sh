APP_NAME=rva-cli

if [ -n "$TRAVIS_TAG" ]; then
    mkdir -p build/${TRAVIS_TAG}
    mv build/${APP_NAME}-linux build/${TRAVIS_TAG}/${APP_NAME}-${TRAVIS_TAG}-linux-amd64
    mv build/${APP_NAME}-macos build/${TRAVIS_TAG}/${APP_NAME}-${TRAVIS_TAG}-darwin-amd64
    mv build/${APP_NAME}-win.exe build/${TRAVIS_TAG}/${APP_NAME}-${TRAVIS_TAG}-windows-amd64.exe
else
    mkdir -p build/${TRAVIS_BUILD_NUMBER}
    mv build/${APP_NAME}-linux build/${TRAVIS_BUILD_NUMBER}/${APP_NAME}-${TRAVIS_BUILD_NUMBER}-linux-amd64
    mv build/${APP_NAME}-macos build/${TRAVIS_BUILD_NUMBER}/${APP_NAME}-${TRAVIS_BUILD_NUMBER}-darwin-amd64
    mv build/${APP_NAME}-win.exe build/${TRAVIS_BUILD_NUMBER}/${APP_NAME}-${TRAVIS_BUILD_NUMBER}-windows-amd64.exe
fi