APP_NAME=rva-cli
BIN_PATH=build/${APP_NAME}
PROJECT_DIR=$PWD
declare -a OS=(
    "linux"
    "windows"
    "darwin"
)

if [ -n "$TRAVIS_TAG" ]; then
    mv build/rva-cli-macos build/rva-cli-darwin
    mv build/rva-cli-win.exe build/rva-cli-windows.exe
    for i in "${OS[@]}"
    do 
        mkdir -p ${BIN_PATH}/$i-amd64    
        if [ "$i" == "windows" ]; then
            mv build/${APP_NAME}-$i.exe ${BIN_PATH}/$i-amd64/rva.exe
        else
            mv build/${APP_NAME}-$i ${BIN_PATH}/$i-amd64/rva        
        fi
        cd ${BIN_PATH}
        echo -e "\nCreating archive and checksum for $i"
        tar -czvf ${APP_NAME}-${TRAVIS_TAG}-$i-amd64.tgz $i-amd64/
        sha256sum ${APP_NAME}-${TRAVIS_TAG}-$i-amd64.tgz > ${APP_NAME}-${TRAVIS_TAG}-$i-amd64.tgz.sha256
        rm -rf $i-amd64
        cd ${PROJECT_DIR}
    done
else
    mkdir -p ${BIN_PATH}/${TRAVIS_BRANCH}/${TRAVIS_BUILD_NUMBER}
    mv build/${APP_NAME}-linux ${BIN_PATH}/${TRAVIS_BRANCH}/${TRAVIS_BUILD_NUMBER}/${APP_NAME}-${TRAVIS_BUILD_NUMBER}-linux-amd64
    mv build/${APP_NAME}-macos ${BIN_PATH}/${TRAVIS_BRANCH}/${TRAVIS_BUILD_NUMBER}/${APP_NAME}-${TRAVIS_BUILD_NUMBER}-darwin-amd64
    mv build/${APP_NAME}-win.exe ${BIN_PATH}/${TRAVIS_BRANCH}/${TRAVIS_BUILD_NUMBER}/${APP_NAME}-${TRAVIS_BUILD_NUMBER}-windows-amd64.exe
fi