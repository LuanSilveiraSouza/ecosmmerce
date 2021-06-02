#!/bin/bash
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
set -Eeuo pipefail
 
# Based on mongo/docker-entrypoint.sh
# https://github.com/docker-library/mongo/blob/master/docker-entrypoint.sh#L303
if [ "$MONGO_USER" ] && [ "$MONGO_PASS" ]; then
    "${mongo[@]}" -u "$MONGO_USER" -p "$MONGO_PASS" --authenticationDatabase "$rootAuthDatabase" "$MONGO_DB" <<-EOJS
        db.createUser({
            user: $(_js_escape "$MONGO_USER"),
            pwd: $(_js_escape "$MONGO_PASS"),
            roles: [ { role: 'readWrite', db: $(_js_escape "$MONGO_DB") } ]
        })
    EOJS
fi