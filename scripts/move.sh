APP_NAME=rva-cli
BIN_PATH=build/${APP_NAME}

if [ -n "$TRAVIS_TAG" ]; then
    mkdir -p ${BIN_PATH}
    mv build/${APP_NAME}-linux ${BIN_PATH}/${APP_NAME}-${TRAVIS_TAG}-linux-amd64
    mv build/${APP_NAME}-macos ${BIN_PATH}/${APP_NAME}-${TRAVIS_TAG}-darwin-amd64
    mv build/${APP_NAME}-win.exe ${BIN_PATH}/${APP_NAME}-${TRAVIS_TAG}-windows-amd64.exe

    cd ${BIN_PATH}/
    sha256sum ${APP_NAME}-${TRAVIS_TAG}-linux-amd64 > ${APP_NAME}-${TRAVIS_TAG}-linux-amd64.sha256
    sha256sum ${APP_NAME}-${TRAVIS_TAG}-darwin-amd64 > ${APP_NAME}-${TRAVIS_TAG}-darwin-amd64.sha256
    sha256sum ${APP_NAME}-${TRAVIS_TAG}-windows-amd64.exe > ${APP_NAME}-${TRAVIS_TAG}-windows-amd64.exe.sha256
    cd ../..

else
    mkdir -p ${BIN_PATH}/${TRAVIS_BRANCH}/${TRAVIS_BUILD_NUMBER}
    mv build/${APP_NAME}-linux ${BIN_PATH}/${TRAVIS_BRANCH}/${TRAVIS_BUILD_NUMBER}/${APP_NAME}-${TRAVIS_BUILD_NUMBER}-linux-amd64
    mv build/${APP_NAME}-macos ${BIN_PATH}/${TRAVIS_BRANCH}/${TRAVIS_BUILD_NUMBER}/${APP_NAME}-${TRAVIS_BUILD_NUMBER}-darwin-amd64
    mv build/${APP_NAME}-win.exe ${BIN_PATH}/${TRAVIS_BRANCH}/${TRAVIS_BUILD_NUMBER}/${APP_NAME}-${TRAVIS_BUILD_NUMBER}-windows-amd64.exe
fi